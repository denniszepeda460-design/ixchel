"use client";

import React, { useState } from "react";
import Image from "next/image";
import { products, Product } from "@/data/products";
import { availablePlants, Plant, evaluateCombo, createComboCartProduct } from "@/data/combos";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/config/site";
import {
  Check,
  CheckCircle,
  WarningCircle,
  ShoppingBag,
  Sparkle,
  PottedPlant,
  ArrowsClockwise,
} from "@phosphor-icons/react";

export default function ManualComboBuilder() {
  const [selectedPlant, setSelectedPlant] = useState<Plant>(availablePlants[0]);
  const [selectedPlanter, setSelectedPlanter] = useState<Product>(products[0]);
  const [selectedColor, setSelectedColor] = useState<string>("Blanco Base");
  const [justAdded, setJustAdded] = useState(false);

  const { addItem } = useCartStore();

  const evaluation = evaluateCombo(selectedPlant, selectedPlanter);
  const totalPrice = Number((selectedPlant.price + selectedPlanter.price).toFixed(2));

  const handleAddToCart = () => {
    const comboProduct = createComboCartProduct(
      selectedPlant,
      selectedPlanter,
      `Combo: ${selectedPlant.name} + ${selectedPlanter.name}`
    );
    addItem(comboProduct, 1, selectedColor);

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Intro explicativa */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-salvia/15 text-salvia-dark text-xs font-bold uppercase tracking-wider">
          <Sparkle size={14} weight="fill" className="text-luna" />
          <span>Selección de Personajes Botánicos</span>
        </span>
        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-tierra">
          Arma tu Pareja Ideal (Planta + Maceta)
        </h2>
        <p className="text-xs sm:text-sm text-tierra-muted leading-relaxed">
          Elige una planta a la izquierda y una maceta a la derecha. Nuestro sistema evaluará en tiempo real la armonía de raíces y dimensiones para asegurar un hogar feliz y duradero.
        </p>
      </div>

      {/* Grid de 3 Columnas: Plantas (Izq) | Escenario (Centro) | Macetas (Der) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMNA IZQUIERDA: Catálogo de Plantas */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-crema-dark/60">
            <h3 className="font-sans font-bold text-sm text-tierra flex items-center gap-1.5">
              <PottedPlant size={18} className="text-salvia-dark" />
              <span>1. Elige tu Planta</span>
            </h3>
            <span className="text-[11px] text-tierra-muted">
              {availablePlants.length} especies
            </span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {availablePlants.map((plant) => {
              const isSelected = selectedPlant.id === plant.id;
              return (
                <button
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? "bg-salvia/10 border-salvia-dark shadow-sm ring-2 ring-salvia/30"
                      : "bg-blanco-artesanal border-crema-dark/70 hover:border-salvia/50 hover:bg-crema-tint/40"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-xl bg-crema-tint/80 border border-crema-dark/50 flex items-center justify-center overflow-hidden shrink-0">
                    <Image
                      src={plant.image}
                      alt={plant.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-sans font-bold text-xs text-tierra truncate">
                        {plant.name}
                      </h4>
                      <span className="text-xs font-bold text-salvia-dark shrink-0">
                        {formatPrice(plant.price)}
                      </span>
                    </div>
                    <span className="text-[10px] text-tierra-muted block truncate">
                      {plant.sizeLabel}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-salvia-dark text-white flex items-center justify-center shrink-0">
                      <Check size={12} weight="bold" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMNA CENTRAL: Vista Previa y Ensamblaje 2D */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-blanco-artesanal border-2 border-crema-dark shadow-sm relative overflow-hidden flex flex-col items-center text-center">
            {/* Fondo orgánico suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-crema-tint/50 via-transparent to-crema-tint/80 pointer-events-none" />

            <span className="relative z-10 text-[11px] uppercase tracking-wider font-bold text-tierra-muted mb-2">
              Área de Ensamblaje en Vivo
            </span>

            {/* Escenario de Ensamble Visual 2D con capas */}
            <div className="relative w-full max-w-sm h-72 sm:h-80 flex flex-col items-center justify-end pb-4 my-2 z-10">
              {/* Capa de la Planta (animada cayendo / creciendo desde la maceta) */}
              <div
                key={`plant-${selectedPlant.id}`}
                className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 -mb-12 animate-in slide-in-from-top-6 fade-in duration-500 flex items-center justify-center"
              >
                <Image
                  src={selectedPlant.image}
                  alt={selectedPlant.name}
                  width={160}
                  height={160}
                  className="object-contain drop-shadow-md"
                />
              </div>

              {/* Capa de la Maceta (deslizándose y sirviendo de base) */}
              <div
                key={`planter-${selectedPlanter.id}`}
                className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-500 shadow-md border border-crema-dark bg-crema-tint/20"
              >
                <Image
                  src={selectedPlanter.images[0]}
                  alt={selectedPlanter.name}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>

              {/* Sombra de apoyo en suelo */}
              <div className="w-40 h-4 rounded-full bg-tierra/10 blur-xs mt-1" />
            </div>

            {/* Ficha rápida del ensamble */}
            <div className="relative z-10 w-full mt-2 pt-4 border-t border-crema-dark/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-terracotta tracking-wider block">
                  Combo Seleccionado
                </span>
                <h4 className="font-sans font-bold text-base text-tierra">
                  {selectedPlant.name} + {selectedPlanter.name}
                </h4>
                <p className="text-xs text-tierra-muted">
                  Color maceta: <span className="font-semibold text-tierra">{selectedColor}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-tierra-light block">
                  Precio Total
                </span>
                <span className="font-sans font-extrabold text-2xl text-terracotta">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Selector de color para la maceta */}
            {selectedPlanter.colors && selectedPlanter.colors.length > 0 && (
              <div className="relative z-10 w-full pt-3 flex items-center justify-center gap-2">
                <span className="text-xs font-semibold text-tierra-muted mr-1">
                  Color:
                </span>
                {selectedPlanter.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                      selectedColor === color
                        ? "bg-terracotta text-white border-terracotta shadow-xs scale-105"
                        : "bg-crema-tint/80 text-tierra border-crema-dark hover:bg-crema-dark"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Panel de Evaluación en Tiempo Real (Verde o Amarillo de advertencia) */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              evaluation.isIdeal
                ? "bg-[#edf5ee] border-[#9ec8a3] text-[#205128]"
                : "bg-amber-50 border-amber-300 text-amber-900"
            }`}
          >
            <div className="flex items-start gap-3">
              {evaluation.isIdeal ? (
                <div className="w-8 h-8 rounded-full bg-[#3b8747] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <CheckCircle size={20} weight="fill" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <WarningCircle size={20} weight="fill" />
                </div>
              )}

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-sans font-bold text-sm">
                    {evaluation.title}
                  </h5>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      evaluation.isIdeal
                        ? "bg-[#3b8747]/20 text-[#205128]"
                        : "bg-amber-200 text-amber-900"
                    }`}
                  >
                    {evaluation.badgeText}
                  </span>
                </div>

                <p className="text-xs leading-relaxed">
                  {evaluation.message}
                </p>

                {!evaluation.isIdeal && evaluation.suggestedPlant && (
                  <div className="pt-2 border-t border-amber-200/80 text-[11px] space-y-1">
                    <p>
                      <strong>💡 Si te encantó esta maceta:</strong> Prueba con{" "}
                      <span className="italic">{evaluation.suggestedPlant}</span>.
                    </p>
                    {evaluation.suggestedPlanter && (
                      <p>
                        <strong>🌱 Si te encantó esta planta:</strong> Prueba con{" "}
                        <span className="italic">{evaluation.suggestedPlanter}</span>.
                      </p>
                    )}
                    <p className="text-[10px] text-amber-700 italic pt-1">
                      (Puedes ignorar esta sugerencia y ordenar el combo de todos modos si así lo prefieres).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botón de Agregar al Carrito */}
          <button
            id="add-combo-to-cart-btn"
            onClick={handleAddToCart}
            className="w-full py-4 px-6 rounded-2xl bg-terracotta hover:bg-terracotta-dark text-white font-sans font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {justAdded ? (
              <>
                <Check size={20} weight="bold" />
                <span>¡Combo Agregado al Carrito!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={20} weight="bold" />
                <span>✓ Agregar Combo al Carrito • {formatPrice(totalPrice)}</span>
              </>
            )}
          </button>
        </div>

        {/* COLUMNA DERECHA: Catálogo de Macetas (10 moldes oficiales) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-crema-dark/60">
            <h3 className="font-sans font-bold text-sm text-tierra flex items-center gap-1.5">
              <span>2. Elige tu Maceta</span>
            </h3>
            <span className="text-[11px] text-tierra-muted">
              {products.length} moldes
            </span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {products.map((planter) => {
              const isSelected = selectedPlanter.id === planter.id;
              return (
                <button
                  key={planter.id}
                  onClick={() => {
                    setSelectedPlanter(planter);
                    if (planter.colors && planter.colors.length > 0) {
                      setSelectedColor(planter.colors[0]);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? "bg-terracotta/10 border-terracotta shadow-sm ring-2 ring-terracotta/30"
                      : "bg-blanco-artesanal border-crema-dark/70 hover:border-terracotta/50 hover:bg-crema-tint/40"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-xl bg-crema-tint/80 border border-crema-dark/50 overflow-hidden shrink-0">
                    <Image
                      src={planter.images[0]}
                      alt={planter.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-sans font-bold text-xs text-tierra truncate">
                        {planter.name}
                      </h4>
                      <span className="text-xs font-bold text-terracotta shrink-0">
                        {formatPrice(planter.price)}
                      </span>
                    </div>
                    <span className="text-[10px] text-tierra-muted block truncate">
                      {planter.dimensions.formattedSummary || planter.dimensions.formatted}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center shrink-0">
                      <Check size={12} weight="bold" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
