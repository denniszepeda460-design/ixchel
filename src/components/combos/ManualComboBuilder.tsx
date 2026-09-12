"use client";

import React, { useState } from "react";
import Image from "next/image";
import { products, Product } from "@/data/products";
import {
  availablePlants,
  Plant,
  evaluateCombo,
  createComboCartProduct,
  calculateComboComposition,
} from "@/data/combos";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/config/site";
import {
  Check,
  CheckCircle,
  WarningCircle,
  ShoppingBag,
  Sparkle,
  PottedPlant,
} from "@phosphor-icons/react";

export default function ManualComboBuilder() {
  const [selectedPlant, setSelectedPlant] = useState<Plant>(availablePlants[0]);
  const [selectedPlanter, setSelectedPlanter] = useState<Product>(products[0]);
  const [selectedColor, setSelectedColor] = useState<string>("Blanco Base");
  const [justAdded, setJustAdded] = useState(false);

  const { addItem } = useCartStore();

  const evaluation = evaluateCombo(selectedPlant, selectedPlanter);
  const isPlanterPricePending = Boolean(selectedPlanter.priceDisplay);
  const totalPrice = Number((selectedPlant.price + selectedPlanter.price).toFixed(2));

  // --- MOTOR DE COMPOSICIÓN VISUAL INTELIGENTE (BASADO EN RECORTE ALFA DE PRECISIÓN) ---
  const hasTransparentPlanter = Boolean(selectedPlanter.transparentImage);
  const hasTransparentPlant = Boolean(selectedPlant.transparentImage);
  const isTransparentComposition = hasTransparentPlanter && hasTransparentPlant;

  const {
    planterVisualWidth,
    planterVisualHeight,
    plantVisualWidth,
    plantVisualHeight,
    effectiveMarginBottom,
    effectiveXOffset,
  } = calculateComboComposition(selectedPlant, selectedPlanter, 1.0);

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
              const hasTransp = Boolean(plant.transparentImage);
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
                      width={44}
                      height={44}
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
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] text-tierra-muted truncate">
                        {plant.sizeLabel}
                      </span>
                      {hasTransp && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-salvia/20 text-salvia-dark font-medium shrink-0">
                          Sin fondo
                        </span>
                      )}
                    </div>
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

        {/* COLUMNA CENTRAL: Vista Previa y Ensamblaje en Vivo */}
        <div className="lg:col-span-6 space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-blanco-artesanal border-2 border-crema-dark shadow-sm relative overflow-hidden flex flex-col items-center text-center">
            {/* Fondo orgánico suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-crema-tint/50 via-transparent to-crema-tint/80 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-2 mb-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-tierra-muted">
                Área de Ensamblaje en Vivo
              </span>
              {isTransparentComposition ? (
                <span className="px-2 py-0.5 rounded-full bg-salvia/20 text-salvia-dark text-[10px] font-bold">
                  Composición Inteligente
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-crema-dark/50 text-tierra-muted text-[10px] font-medium">
                  Modo Respaldo
                </span>
              )}
            </div>

            {/* ESCENARIO DE ENSAMBLE: Renderizado Proporcional o Fallback */}
            {isTransparentComposition ? (
              /* MODO COMPOSICIÓN INTELIGENTE (Plantas y Macetas Sin Fondo) */
              <div className="relative w-full max-w-sm h-80 flex flex-col items-center justify-end pb-3 my-2 z-10 select-none">
                {/* 1. Capa Superior (z-20): Planta viva anclada dentro de la boca de la maceta */}
                <div
                  key={`plant-trans-${selectedPlant.id}-${selectedPlanter.id}`}
                  style={{
                    width: `${plantVisualWidth}px`,
                    height: `${plantVisualHeight}px`,
                    marginBottom: `-${effectiveMarginBottom}px`,
                    transform: effectiveXOffset ? `translateX(${effectiveXOffset}px)` : undefined,
                  }}
                  className="relative z-20 animate-in slide-in-from-top-3 fade-in duration-500 flex items-center justify-center transition-all duration-500 ease-out pointer-events-none"
                >
                  <Image
                    src={selectedPlant.transparentImage!}
                    alt={selectedPlant.name}
                    fill
                    sizes="(max-width: 768px) 190px, 260px"
                    className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] filter contrast-[1.03] brightness-[0.99]"
                    priority
                  />
                </div>

                {/* 2. Capa Base (z-10): Maceta artesanal sin fondo */}
                <div
                  key={`planter-trans-${selectedPlanter.id}`}
                  style={{
                    width: `${planterVisualWidth}px`,
                    height: `${planterVisualHeight}px`,
                  }}
                  className="relative z-10 animate-in slide-in-from-bottom-3 fade-in duration-500 flex items-center justify-center transition-all duration-500 ease-out pointer-events-none"
                >
                  <Image
                    src={selectedPlanter.transparentImage!}
                    alt={selectedPlanter.name}
                    fill
                    sizes="(max-width: 768px) 210px, 280px"
                    className="object-contain drop-shadow-[0_6px_14px_rgba(44,35,28,0.08)]"
                    priority
                  />
                </div>

                {/* 3. Sombra Unificada en el Piso: Contacto suave en la superficie */}
                <div
                  style={{ width: `${Math.round(planterVisualWidth * 0.78)}px` }}
                  className="h-3.5 rounded-[100%] bg-tierra/22 blur-[5px] -mt-1 mx-auto transition-all duration-500"
                  aria-hidden="true"
                />
              </div>
            ) : (
              /* MODO FALLBACK ESTÁNDAR: Cuando alguna pieza carece de recorte limpio */
              <div className="relative w-full max-w-sm h-72 sm:h-80 flex flex-col items-center justify-end pb-4 my-2 z-10 select-none">
                {/* Planta */}
                <div
                  key={`plant-fallback-${selectedPlant.id}`}
                  className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 -mb-10 animate-in slide-in-from-top-6 fade-in duration-500 flex items-center justify-center"
                >
                  <Image
                    src={selectedPlant.image}
                    alt={selectedPlant.name}
                    width={150}
                    height={150}
                    className="object-contain drop-shadow-md"
                  />
                </div>

                {/* Maceta en tarjeta contenida con marco rústico */}
                <div
                  key={`planter-fallback-${selectedPlanter.id}`}
                  className="relative z-10 w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-500 shadow-md border border-crema-dark bg-crema-tint/20"
                >
                  <Image
                    src={selectedPlanter.images[0]}
                    alt={selectedPlanter.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>

                {/* Sombra de apoyo */}
                <div className="w-36 h-3.5 rounded-full bg-tierra/15 blur-xs mt-1" />
              </div>
            )}

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
                <span className="font-sans font-extrabold text-xl sm:text-2xl text-terracotta">
                  {isPlanterPricePending ? (
                    <span className="text-sm sm:text-base font-bold text-terracotta">
                      ${selectedPlant.price.toFixed(2)} + [PENDIENTE]
                    </span>
                  ) : (
                    formatPrice(totalPrice)
                  )}
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
                <span>
                  {isPlanterPricePending
                    ? `✓ Agregar Combo al Carrito • ${formatPrice(selectedPlant.price)} + [PENDIENTE: maceta]`
                    : `✓ Agregar Combo al Carrito • ${formatPrice(totalPrice)}`}
                </span>
              </>
            )}
          </button>
        </div>

        {/* COLUMNA DERECHA: Catálogo de Macetas (12 piezas incluyendo Corazón y Tetera) */}
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
              const hasTransp = Boolean(planter.transparentImage);
              const planterPriceText = planter.priceDisplay || formatPrice(planter.price);

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
                  <div className="relative w-12 h-12 rounded-xl bg-crema-tint/80 border border-crema-dark/50 overflow-hidden shrink-0 flex items-center justify-center">
                    <Image
                      src={planter.transparentImage || planter.images[0]}
                      alt={planter.name}
                      fill
                      sizes="48px"
                      className={hasTransp ? "object-contain p-1" : "object-cover"}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-sans font-bold text-xs text-tierra truncate">
                        {planter.name}
                      </h4>
                      <span className="text-xs font-bold text-terracotta shrink-0">
                        {planterPriceText}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[10px] text-tierra-muted truncate">
                        {planter.dimensions.formattedSummary || planter.dimensions.formatted}
                      </span>
                      {hasTransp && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-terracotta/15 text-terracotta font-medium shrink-0">
                          Sin fondo
                        </span>
                      )}
                    </div>
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
