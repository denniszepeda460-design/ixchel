"use client";

import React, { useState } from "react";
import Image from "next/image";
import { surpriseCombos, SurpriseCombo, availablePlants, createComboCartProduct } from "@/data/combos";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/config/site";
import confetti from "canvas-confetti";
import {
  Sparkle,
  Check,
  ShoppingBag,
  ArrowCounterClockwise,
  Gift,
  HandPointing,
} from "@phosphor-icons/react";

export default function SurpriseBoxModal() {
  const [animationState, setAnimationState] = useState<"idle" | "animating" | "revealed">("idle");
  const [selectedCombo, setSelectedCombo] = useState<SurpriseCombo | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  // Clases CSS de animación
  const [boxShake, setBoxShake] = useState(false);
  const [boxZoom, setBoxZoom] = useState(false);
  const [coverMove, setCoverMove] = useState(false);
  const [coverRemove, setCoverRemove] = useState(false);

  const { addItem } = useCartStore();

  const handleOpenBox = () => {
    if (animationState === "animating") return;

    // Resetear clases
    setBoxShake(false);
    setBoxZoom(false);
    setCoverMove(false);
    setCoverRemove(false);
    setAnimationState("animating");

    // Seleccionar combo aleatorio entre los 15 predefinidos
    const randomIndex = Math.floor(Math.random() * surpriseCombos.length);
    const chosen = surpriseCombos[randomIndex];

    // Secuencia de tiempos especificada:
    // 0ms: shake
    setTimeout(() => {
      setBoxShake(true);
    }, 0);

    // 850ms: zoom
    setTimeout(() => {
      setBoxZoom(true);
    }, 850);

    // 900ms: moveCover
    setTimeout(() => {
      setCoverMove(true);
    }, 900);

    // 1500ms: removeCover & revelar combo
    setTimeout(() => {
      setCoverRemove(true);
      setSelectedCombo(chosen);
      setAnimationState("revealed");

      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#b85c38", "#77806b", "#d8a643", "#ede4d3"],
        });
      } catch {
        // Ignorar si canvas no está disponible
      }
    }, 1500);
  };

  const handleReset = () => {
    setBoxShake(false);
    setBoxZoom(false);
    setCoverMove(false);
    setCoverRemove(false);
    setAnimationState("idle");
    setSelectedCombo(null);
  };

  // Helper para buscar datos del producto del combo
  const getComboDetails = (combo: SurpriseCombo) => {
    const planter = products.find((p) => p.slug === combo.planterSlug) || products[0];
    const plant = availablePlants.find((p) => p.id === combo.plantId) || availablePlants[0];
    return { planter, plant };
  };

  const handleAddToCart = () => {
    if (!selectedCombo) return;
    const { planter, plant } = getComboDetails(selectedCombo);

    const comboProduct = createComboCartProduct(
      plant,
      planter,
      selectedCombo.name,
      selectedCombo.comboPrice
    );

    addItem(comboProduct, 1, "Blanco Base");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Estilos CSS exactos de la caja de regalo adaptados con la paleta de Ixchel */}
      <style jsx>{`
        .box-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 260px;
          cursor: pointer;
        }

        .box {
          width: 110px;
          height: 110px;
          background-color: #b85c38; /* Terracota Ixchel */
          border: 1px solid #9c4929;
          border-radius: 8px;
          position: relative;
          box-shadow: 0 10px 25px -5px rgba(184, 92, 56, 0.4);
        }

        .cover {
          width: 130px;
          height: 24px;
          background-color: #a04928; /* Tapa terracota oscura */
          border-bottom: 2px solid #82381b;
          border-radius: 6px;
          position: absolute;
          z-index: 10;
          top: -2px;
          left: -10px;
          transition: transform 0.55s ease-in-out;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .strap1 {
          width: 16px;
          height: 110px;
          background-color: #d8a643; /* Listón Luna Dorada */
          border-left: 1px solid #b88628;
          border-right: 1px solid #b88628;
          position: absolute;
          left: 47px;
          top: 0;
          z-index: 2;
        }

        .strap2 {
          width: 110px;
          height: 16px;
          background-color: #d8a643; /* Listón Luna Dorada */
          position: absolute;
          top: 47px;
          left: 0;
          border-top: 1px solid #b88628;
          border-bottom: 1px solid #b88628;
          z-index: 2;
        }

        .cover-ribbon {
          width: 16px;
          height: 24px;
          background-color: #d8a643;
          border-left: 1px solid #b88628;
          border-right: 1px solid #b88628;
          position: absolute;
          left: 57px;
          top: 0;
          z-index: 12;
        }

        .cover-bow {
          position: absolute;
          top: -12px;
          left: 48px;
          font-size: 20px;
          color: #d8a643;
          z-index: 15;
          filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
        }

        .shake {
          animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .zoomIn {
          animation: zoom 0.5s forwards;
        }

        .moveCover {
          transform: translate(75px, -95px) rotate(125deg);
          opacity: 0.8;
        }

        .removeCover {
          display: none !important;
        }

        @keyframes shake {
          10%, 90% {
            transform: translate3d(-2px, 0, 0);
          }
          20%, 80% {
            transform: translate3d(3px, 0, 0);
          }
          30%, 50%, 70% {
            transform: translate3d(-5px, 0, 0);
          }
          40%, 60% {
            transform: translate3d(5px, 0, 0);
          }
        }

        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.15);
          }
        }
      `}</style>

      {/* Intro del modo sorpresa */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/15 text-terracotta text-xs font-bold uppercase tracking-wider">
          <Gift size={15} weight="fill" />
          <span>15 Parejas Pre-aprobadas</span>
        </span>
        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-tierra">
          La Caja Sorpresa de Ixchel
        </h2>
        <p className="text-xs sm:text-sm text-tierra-muted leading-relaxed">
          ¿Indeciso? Toca la caja de regalo para revelar una de nuestras 15 combinaciones favoritas ya validadas y listas para lucir en tu hogar.
        </p>
      </div>

      {/* Área Interactiva: Caja o Combo Revelado */}
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-blanco-artesanal border-2 border-crema-dark shadow-md flex flex-col items-center justify-center min-h-[380px] text-center relative overflow-hidden">
        {/* Fondo tenue */}
        <div className="absolute inset-0 bg-gradient-to-b from-crema-tint/40 via-transparent to-crema-tint/60 pointer-events-none" />

        {animationState !== "revealed" ? (
          <div className="space-y-4 relative z-10">
            <div
              id="boxContainer"
              className={`box-container ${boxShake ? "shake" : ""} ${
                boxZoom ? "zoomIn" : ""
              }`}
              onClick={handleOpenBox}
              role="button"
              tabIndex={0}
              aria-label="Abrir caja sorpresa de plantas y macetas"
              onKeyDown={(e) => e.key === "Enter" && handleOpenBox()}
            >
              <div className="box">
                <div
                  id="cover"
                  className={`cover ${coverMove ? "moveCover" : ""} ${
                    coverRemove ? "removeCover" : ""
                  }`}
                >
                  <div className="cover-ribbon" />
                  <div className="cover-bow">🎀</div>
                </div>
                <div className="strap1" />
                <div className="strap2" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="font-sans font-bold text-sm text-tierra flex items-center justify-center gap-1.5">
                <HandPointing size={18} weight="duotone" className="text-terracotta animate-bounce" />
                <span>{animationState === "animating" ? "¡Abriendo sorpresa...!" : "Haz clic sobre la caja para abrirla"}</span>
              </p>
              <p className="text-[11px] text-tierra-muted">
                {animationState === "animating"
                  ? "Eligiendo entre 15 combinaciones botánicas..."
                  : "Descubre una combinación con descuento especial"}
              </p>
            </div>
          </div>
        ) : (
          /* Estado Revelado: Tarjeta del Combo Sorpresa */
          selectedCombo && (
            <div className="space-y-5 relative z-10 w-full animate-in zoom-in-95 duration-400">
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-salvia/20 text-salvia-dark text-xs font-bold uppercase tracking-wider">
                <Sparkle size={13} weight="fill" className="text-terracotta" />
                <span>{selectedCombo.badge}</span>
              </div>

              {/* Visual del combo: maceta + planta */}
              {(() => {
                const { planter, plant } = getComboDetails(selectedCombo);
                return (
                  <div className="relative w-full max-w-[220px] h-52 mx-auto flex flex-col items-center justify-end pb-2">
                    {/* Planta */}
                    <div className="relative z-20 w-28 h-28 -mb-8 drop-shadow-md">
                      <Image
                        src={plant.image}
                        alt={plant.name}
                        width={112}
                        height={112}
                        className="object-contain"
                      />
                    </div>
                    {/* Maceta */}
                    <div className="relative z-10 w-36 h-36 rounded-2xl overflow-hidden shadow-sm border border-crema-dark bg-crema-tint/20">
                      <Image
                        src={planter.images[0]}
                        alt={planter.name}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-1">
                <h3 className="font-sans font-extrabold text-xl text-tierra">
                  {selectedCombo.name}
                </h3>
                <p className="text-xs font-medium text-salvia-dark">
                  {selectedCombo.tagline}
                </p>
                <p className="text-xs text-tierra-muted leading-relaxed pt-1">
                  {selectedCombo.description}
                </p>
              </div>

              <div className="pt-2 border-t border-crema-dark/60 flex items-center justify-between px-2">
                <span className="text-xs text-tierra-muted">Precio del Combo:</span>
                <span className="font-sans font-extrabold text-2xl text-terracotta">
                  {formatPrice(selectedCombo.comboPrice)}
                </span>
              </div>

              {/* Botones de acción solicitados */}
              <div className="space-y-2 pt-2">
                <button
                  id="add-surprise-to-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-5 rounded-xl bg-terracotta hover:bg-terracotta-dark text-white font-sans font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {justAdded ? (
                    <>
                      <Check size={18} weight="bold" />
                      <span>¡Combo Agregado al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} weight="bold" />
                      <span>✓ Agregar al Carrito • {formatPrice(selectedCombo.comboPrice)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-xl bg-crema-tint/80 hover:bg-crema-dark text-tierra font-sans font-semibold text-xs border border-crema-dark transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowCounterClockwise size={15} weight="bold" />
                  <span>❌ Probar otra sorpresa</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
