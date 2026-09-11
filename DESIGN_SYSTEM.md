# Sistema de Diseño — Ixchel (Macetas Artesanales)

Este documento condensa la identidad visual, tokens de color, tipografía, iconografía, patrones y principios de diseño anti-slop construidos bajo las directrices de `brandkit`, `impeccable`, `design-taste-frontend`, `animate` / `emil-design-eng` y `apple-design`.

---

## 1. Fundamentos de Marca

- **Nombre:** `ixchel` (siempre en minúsculas, con punto normal en la `i`).
- **Significado:** Diosa maya de la luna, la tierra, la fertilidad y la artesanía.
- **Copy Oficial:**
  > *"Negocio familiar de macetas artesanales. Cada pieza está hecha con amor, inspirada en la conexión entre la tierra y la naturaleza."*
- **Tono:** Cálido, íntimo, artesanal, orgánico y conectado a la naturaleza. Nada corporativo ni estéril.

---

## 2. Paleta Cromática Extraída de los Archivos de Marca

| Color | Hex | Uso en la Interfaz |
|---|---|---|
| **Terracota / Naranja Quemado** | `#bf692e` | Color primario de marca, botones principales, precio y acentos calientes de arcilla. |
| **Terracota Oscuro (Hover)** | `#a25220` | Estado `:hover` de botones y enlaces activos. |
| **Verde Salvia** | `#77806b` | Acento secundario botánico, badges de acabado, garantías y cuidados de plantas. |
| **Crema / Hueso (Base)** | `#f7f3ec` | Fondo principal de la aplicación; textura orgánica cálida que reemplaza el blanco frío. |
| **Crema Cálido (Tint)** | `#f3e7d1` | Fondos de banners, inputs secundarios y controles de cantidad. |
| **Marrón Oscuro / Tinta Tierra** | `#2c231c` | Color principal de tipografía, títulos y fondo de contraste del Footer. |
| **Dorado Lunar** | `#d8a643` | Micro-acento para la luna creciente y destellos de detalle. |
| **Blanco Alfarero** | `#fffdfa` | Superficie de tarjetas de producto y modales con bordes sutiles. |
| **Verde WhatsApp** | `#25D366` | Cierre de pedido y botones directos de atención inmediata. |

---

## 3. Tipografía

- **Logotipo y Acentos Artesanales:** `Caveat` (Google Fonts, variable `--font-caveat`), pesos 600 y 700. Cursiva limpia, legible, sin sobrecarga decorativa.
- **Títulos y Contenido General:** `Nunito` (Google Fonts, variable `--font-nunito`), pesos 300 a 800. Sans-serif humanista con terminaciones redondeadas suaves que transmiten calidez y alta legibilidad en pantallas móviles.

---

## 4. Dials de Diseño (`design-taste-frontend`)

```ts
export const DESIGN_DIALS = {
  DESIGN_VARIANCE: 8,   // Asimetría deliberada, composiciones editoriales, sello rotado
  MOTION_INTENSITY: 5,  // Microinteracciones físicas táctiles, transiciones spring sutiles
  VISUAL_DENSITY: 4,    // Aireado, generoso espacio negativo, enfoque en la cerámica
};
```

---

## 5. Componentes Base y Microinteracciones (`emil-design-eng` + `apple-design`)

- **Botones y Elementos Táctiles:**
  - `:active` simulando presión física con `scale(0.97)` y transición de 160ms con curva `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
  - Sin animaciones desde `scale(0)`.
- **Drawer de Carrito:**
  - Deslizamiento lateral con auto-cierre al cambiar de ruta (`usePathname`).
  - Animación suave con backdrop-blur.
- **Patrón Orgánico (`OrganicPattern.tsx`):**
  - Malla asimétrica de lunas crecientes dispersas, hojitas de corazón (*String of Hearts*) y textura salpicada de barro al 6% de opacidad.
- **Accesibilidad:**
  - Ratio de contraste WCAG AA superado en todos los textos sobre fondos claros y oscuros.
  - Media query `@media (prefers-reduced-motion: reduce)` activa para usuarios con sensibilidad al movimiento.
