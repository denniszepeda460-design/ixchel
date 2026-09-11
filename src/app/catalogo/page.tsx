"use client";

import React, { useState, useMemo, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import OrganicPattern from "@/components/ui/OrganicPattern";
import { Funnel, Sparkle, CaretDown } from "@phosphor-icons/react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("tamano") || searchParams.get("filtro") || "todas";
  const initialFinish = searchParams.get("acabado") || "todos";

  const [selectedSize, setSelectedSize] = useState<string>(initialCategory);
  const [selectedFinish, setSelectedFinish] = useState<string>(initialFinish);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Todos"]);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("destacados");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar desplegable al hacer clic afuera o con Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsColorDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsColorDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const sizes = [
    { key: "todas", label: "Todos los tamaños" },
    { key: "pequena", label: "Pequeñas" },
    { key: "mediana", label: "Medianas" },
    { key: "grande", label: "Grandes" },
    { key: "colgante", label: "Colgantes" },
  ];

  const finishButtons = [
    { key: "todos", label: "Todos los acabados" },
    { key: "natural", label: "Acabado Natural" },
  ];

  const isAllColorsSelected =
    selectedColors.length === 0 || selectedColors.includes("Todos");
  const activeIndividualColors = selectedColors.filter((c) => c !== "Todos");

  // Texto dinámico del botón principal según especificación:
  // - Si no hay nada seleccionado o está "Todos": mostrar Ediciones de Color: Todos
  // - Si hay un color seleccionado: mostrar Ediciones de Color: Rojo
  // - Si hay más de un color seleccionado: mostrar Ediciones de Color: Rojo, Café
  const colorButtonLabel = useMemo(() => {
    if (isAllColorsSelected || activeIndividualColors.length === 0) {
      return "Ediciones de Color: Todos";
    }
    return `Ediciones de Color: ${activeIndividualColors.join(", ")}`;
  }, [isAllColorsSelected, activeIndividualColors]);

  const handleToggleColor = (color: string) => {
    if (color === "Todos") {
      setSelectedColors(["Todos"]);
      return;
    }

    // Si el usuario marca un color individual, "Todos" se desmarca automáticamente
    const currentWithoutAll = selectedColors.filter((c) => c !== "Todos");
    let next: string[];

    if (currentWithoutAll.includes(color)) {
      next = currentWithoutAll.filter((c) => c !== color);
    } else {
      next = [...currentWithoutAll, color];
    }

    // Si deselecciona todo, vuelve automáticamente a "Todos"
    if (next.length === 0) {
      setSelectedColors(["Todos"]);
    } else {
      setSelectedColors(next);
    }
  };

  const handleClearColors = () => {
    setSelectedColors(["Todos"]);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSize =
        selectedSize === "todas" ? true : p.sizeCategory === selectedSize;
      const matchFinish =
        selectedFinish === "todos" ? true : p.finish === selectedFinish;
      const matchColors =
        isAllColorsSelected || activeIndividualColors.length === 0
          ? true
          : p.colors?.some((c) => activeIndividualColors.includes(c));

      return matchSize && matchFinish && matchColors;
    });

    if (sortBy === "precio-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "precio-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "destacados") {
      result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedSize, selectedFinish, isAllColorsSelected, activeIndividualColors, sortBy]);

  const resetFilters = () => {
    setSelectedSize("todas");
    setSelectedFinish("todos");
    setSelectedColors(["Todos"]);
  };

  const hasActiveFilters =
    selectedSize !== "todas" ||
    selectedFinish !== "todos" ||
    (!isAllColorsSelected && activeIndividualColors.length > 0);

  return (
    <div className="min-h-screen bg-crema pb-24">
      {/* Banner de Cabecera */}
      <section className="relative py-16 bg-crema-tint/50 border-b border-crema-dark/60 overflow-hidden">
        <OrganicPattern tone="terracotta" opacity={0.05} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-salvia-dark uppercase tracking-wider">
            <Sparkle size={14} weight="fill" className="text-luna" />
            <span>Colección Artesanal Activa</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-tierra">
            Catálogo de Macetas
          </h1>
          <p className="text-sm sm:text-base text-tierra-muted max-w-2xl leading-relaxed">
            Macetas artesanales con orificio de drenaje funcional, pensadas para cuidar las raíces de tus plantas.
          </p>
        </div>
      </section>

      {/* Barra de Filtros y Orden */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-blanco-artesanal p-4 sm:p-5 rounded-2xl border border-crema-dark/70 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Filtro por Tamaño (Píldoras) */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-tierra-light uppercase tracking-wider block">
                Tamaño de la maceta
              </span>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSelectedSize(s.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                      selectedSize === s.key
                        ? "bg-terracotta text-white shadow-2xs"
                        : "bg-crema-tint text-tierra-muted hover:bg-crema-dark/70"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por Acabado y Ediciones de Color */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-tierra-light uppercase tracking-wider block">
                Tipo de acabado
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {finishButtons.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setSelectedFinish(f.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 ${
                      selectedFinish === f.key
                        ? "bg-salvia text-white shadow-2xs"
                        : "bg-crema-tint text-tierra-muted hover:bg-crema-dark/70"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}

                {/* Componente Desplegable Ediciones de Color */}
                <div className="relative inline-block" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
                    aria-expanded={isColorDropdownOpen}
                    aria-haspopup="true"
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 inline-flex items-center gap-1.5 ${
                      !isAllColorsSelected && activeIndividualColors.length > 0
                        ? "bg-salvia text-white shadow-2xs"
                        : "bg-crema-tint text-tierra-muted hover:bg-crema-dark/70"
                    }`}
                  >
                    <span>{colorButtonLabel}</span>
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={`transition-transform duration-200 ${
                        isColorDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Menú Desplegable con Casillas de Verificación (Checkboxes) */}
                  {isColorDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-64 bg-blanco-artesanal border border-crema-dark/80 rounded-2xl shadow-lg p-2.5 z-30 space-y-1 animate-in fade-in-50 zoom-in-95 duration-150"
                      role="menu"
                    >
                      <div className="px-2 py-1 border-b border-crema-dark/40 mb-1">
                        <span className="text-[11px] font-bold text-tierra uppercase tracking-wider block">
                          Seleccionar Colores
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        {/* 1. Todos */}
                        <label
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer select-none transition-colors ${
                            isAllColorsSelected
                              ? "bg-crema-tint/70 text-tierra font-bold"
                              : "hover:bg-crema-tint/40 text-tierra-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isAllColorsSelected}
                              onChange={() => handleToggleColor("Todos")}
                              className="w-4 h-4 rounded border-crema-dark text-salvia focus:ring-salvia accent-salvia cursor-pointer"
                            />
                            <span className="text-xs font-bold text-tierra">
                              Todos
                            </span>
                          </div>
                          <span className="text-[10px] text-tierra-light uppercase tracking-wider font-semibold">
                            Todos
                          </span>
                        </label>

                        {/* 2. Blanco Base */}
                        <label
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer select-none transition-colors ${
                            selectedColors.includes("Blanco Base")
                              ? "bg-crema-tint/70 text-tierra font-bold"
                              : "hover:bg-crema-tint/40 text-tierra-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={selectedColors.includes("Blanco Base")}
                              onChange={() => handleToggleColor("Blanco Base")}
                              className="w-4 h-4 rounded border-crema-dark text-salvia focus:ring-salvia accent-salvia cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-tierra">
                              Blanco Base
                            </span>
                          </div>
                          <span
                            className="w-3.5 h-3.5 rounded-full bg-[#ede4d3] border border-[#cbbda8] shadow-2xs inline-block shrink-0"
                            title="Blanco Base"
                          />
                        </label>

                        {/* 3. Café */}
                        <label
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer select-none transition-colors ${
                            selectedColors.includes("Café")
                              ? "bg-crema-tint/70 text-tierra font-bold"
                              : "hover:bg-crema-tint/40 text-tierra-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={selectedColors.includes("Café")}
                              onChange={() => handleToggleColor("Café")}
                              className="w-4 h-4 rounded border-crema-dark text-salvia focus:ring-salvia accent-salvia cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-tierra">
                              Café
                            </span>
                          </div>
                          <span
                            className="w-3.5 h-3.5 rounded-full bg-[#784421] shadow-2xs inline-block shrink-0"
                            title="Café"
                          />
                        </label>

                        {/* 4. Rojo */}
                        <label
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer select-none transition-colors ${
                            selectedColors.includes("Rojo")
                              ? "bg-crema-tint/70 text-tierra font-bold"
                              : "hover:bg-crema-tint/40 text-tierra-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={selectedColors.includes("Rojo")}
                              onChange={() => handleToggleColor("Rojo")}
                              className="w-4 h-4 rounded border-crema-dark text-salvia focus:ring-salvia accent-salvia cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-tierra">
                              Rojo
                            </span>
                          </div>
                          <span
                            className="w-3.5 h-3.5 rounded-full bg-[#a63d2f] shadow-2xs inline-block shrink-0"
                            title="Rojo"
                          />
                        </label>

                        {/* 5. Azul */}
                        <label
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer select-none transition-colors ${
                            selectedColors.includes("Azul")
                              ? "bg-crema-tint/70 text-tierra font-bold"
                              : "hover:bg-crema-tint/40 text-tierra-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={selectedColors.includes("Azul")}
                              onChange={() => handleToggleColor("Azul")}
                              className="w-4 h-4 rounded border-crema-dark text-salvia focus:ring-salvia accent-salvia cursor-pointer"
                            />
                            <span className="text-xs font-semibold text-tierra">
                              Azul
                            </span>
                          </div>
                          <span
                            className="w-3.5 h-3.5 rounded-full bg-[#2b547e] shadow-2xs inline-block shrink-0"
                            title="Azul"
                          />
                        </label>
                      </div>

                      {/* Pie del Desplegable: Botón Limpiar */}
                      <div className="pt-2 mt-1 border-t border-crema-dark/50 flex items-center justify-between px-1">
                        <span className="text-[11px] text-tierra-light">
                          {!isAllColorsSelected && activeIndividualColors.length > 0
                            ? `${activeIndividualColors.length} seleccionado(s)`
                            : "Todos los colores"}
                        </span>
                        <button
                          type="button"
                          onClick={handleClearColors}
                          className="text-[11px] font-bold text-terracotta hover:text-terracotta-dark hover:underline cursor-pointer"
                        >
                          Limpiar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Ordenación */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-tierra-light uppercase tracking-wider block">
                Ordenar por
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-crema-tint border border-crema-dark rounded-xl px-3 py-1.5 text-xs font-semibold text-tierra focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
              >
                <option value="destacados">Destacados del Estudio</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Resumen de resultados */}
          <div className="pt-3 border-t border-crema-dark/40 flex items-center justify-between text-xs text-tierra-muted">
            <span>
              Mostrando <strong>{filteredProducts.length}</strong> de{" "}
              {products.length} macetas
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-terracotta hover:underline font-semibold cursor-pointer"
              >
                Restablecer filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-crema-tint mx-auto flex items-center justify-center text-tierra-light">
              <Funnel size={32} />
            </div>
            <h3 className="font-sans font-bold text-xl text-tierra">
              No encontramos macetas con esa combinación
            </h3>
            <p className="text-xs text-tierra-muted leading-relaxed">
              Prueba cambiando el tamaño o el acabado para explorar el resto de
              las piezas de nuestro estudio.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-full bg-terracotta text-white text-xs font-semibold hover:bg-terracotta-dark transition-colors cursor-pointer"
            >
              Ver todas las piezas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-crema p-12 text-center text-tierra">Cargando catálogo...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
