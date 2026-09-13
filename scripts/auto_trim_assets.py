#!/usr/bin/env python3
"""
auto_trim_assets.py
-------------------
Pipeline de auto-recorte por canal alfa (bounding box) para Ixchel.
Procesa todas las imágenes PNG transparentes de plantas y macetas,
elimina los márgenes transparentes vacíos y guarda las versiones
optimizadas en subdirectorios 'trimmed/'.

Genera además 'src/data/assetBounds.json' con metadatos de dimensiones,
relaciones de aspecto y cajas delimitadoras para cálculos de composición.
"""

import os
import sys
import json
from pathlib import Path

# En entornos de CI/Vercel o si PIL no está instalado, salir limpiamente (código 0)
# ya que las imágenes recortadas y el JSON ya están generados y versionados en Git.
if os.environ.get("VERCEL") or os.environ.get("CI"):
    print("[INFO] Entorno Vercel / CI detectado. Omitiendo auto-recorte (activos ya compilados en el repositorio).")
    sys.exit(0)

try:
    from PIL import Image
except ImportError:
    print("[AVISO] PIL/Pillow no está instalado en este entorno. Omitiendo auto-recorte.")
    sys.exit(0)

REPO_ROOT = Path(__file__).resolve().parent.parent

TARGETS = [
    {
        "category": "plantas",
        "input_dir": REPO_ROOT / "public" / "images" / "sin-fondo-plantas",
        "output_dir": REPO_ROOT / "public" / "images" / "sin-fondo-plantas" / "trimmed",
        "web_prefix": "/images/sin-fondo-plantas/trimmed",
    },
    {
        "category": "macetas",
        "input_dir": REPO_ROOT / "public" / "images" / "sin-fondo-macetas",
        "output_dir": REPO_ROOT / "public" / "images" / "sin-fondo-macetas" / "trimmed",
        "web_prefix": "/images/sin-fondo-macetas/trimmed",
    },
]

DATA_OUTPUT_PATH = REPO_ROOT / "src" / "data" / "assetBounds.json"


if sys.stdout.encoding.lower() != "utf-8":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


def clean_filename(name: str) -> str:
    """Normaliza espacios duplicados o trailing antes de la extensión."""
    stem, ext = os.path.splitext(name)
    cleaned_stem = " ".join(stem.split()).strip()
    return f"{cleaned_stem}{ext}"


def process_directory(target: dict, metadata_dict: dict):
    input_dir = target["input_dir"]
    output_dir = target["output_dir"]
    category = target["category"]
    web_prefix = target["web_prefix"]

    if not input_dir.exists():
        print(f"[AVISO] Directorio no encontrado: {input_dir}")
        return

    output_dir.mkdir(parents=True, exist_ok=True)
    metadata_dict[category] = {}

    print(f"\n--- Procesando {category} ({input_dir}) ---")

    for entry in sorted(os.listdir(input_dir)):
        input_file = input_dir / entry
        if not input_file.is_file() or not entry.lower().endswith(".png"):
            continue

        normalized_name = clean_filename(entry)
        output_file = output_dir / normalized_name

        try:
            with Image.open(input_file) as im:
                im_rgba = im.convert("RGBA")
                alpha = im_rgba.split()[3]
                # Bounding box con umbral leve para evitar ruido/artefactos de compresión
                alpha_binary = alpha.point(lambda p: 255 if p > 5 else 0)
                bbox = alpha_binary.getbbox()

                orig_w, orig_h = im_rgba.size

                if bbox is None:
                    # Imagen completamente vacía/transparente
                    bbox = (0, 0, orig_w, orig_h)

                cropped = im_rgba.crop(bbox)
                trimmed_w, trimmed_h = cropped.size
                aspect_ratio = round(trimmed_w / max(trimmed_h, 1), 4)

                cropped.save(output_file, "PNG", optimize=True)

                web_path = f"{web_prefix}/{normalized_name}"
                info = {
                    "originalFilename": entry,
                    "normalizedFilename": normalized_name,
                    "originalWidth": orig_w,
                    "originalHeight": orig_h,
                    "bbox": list(bbox),
                    "trimmedWidth": trimmed_w,
                    "trimmedHeight": trimmed_h,
                    "aspectRatio": aspect_ratio,
                    "webPath": web_path,
                }

                metadata_dict[category][normalized_name] = info
                # Si el archivo original tenía un nombre distinto (ej. espacios), mapear también el original
                if entry != normalized_name:
                    metadata_dict[category][entry] = info

                print(
                    f"  [OK] {normalized_name}: {orig_w}x{orig_h} -> {trimmed_w}x{trimmed_h} (aspect {aspect_ratio})"
                )

        except Exception as e:
            print(f"  [ERROR] procesando {entry}: {e}", file=sys.stderr)


def main():
    metadata = {}
    for target in TARGETS:
        process_directory(target, metadata)

    DATA_OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(DATA_OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)

    print(f"\n[EXITO] Recorte completado. Metadatos guardados en: {DATA_OUTPUT_PATH}\n")


if __name__ == "__main__":
    main()
