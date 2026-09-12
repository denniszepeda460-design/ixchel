"use client";

import React, { useState } from "react";
import ManualComboBuilder from "@/components/combos/ManualComboBuilder";
import SurpriseBoxModal from "@/components/combos/SurpriseBoxModal";
import OrganicPattern from "@/components/ui/OrganicPattern";
import {
  Plant,
  Gift,
  PottedPlant,
  ShieldCheck,
  Drop,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";

export default function EncuentraSuHogarPage() {
  const [activeTab, setActiveTab] = useState<"manual" | "surprise">("manual");

  return (
    <div className="min-h-screen bg-crema-light/40 py-10 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-terracotta/10 text-terracotta font-sans text-xs font-bold uppercase tracking-wider">
            <PottedPlant size={16} weight="duotone" />
            <span>Taller Botánico Ixchel</span>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-5xl text-tierra tracking-tight">
            Encuentra su Hogar
          </h1>

          <p className="text-base sm:text-lg text-tierra-muted font-sans max-w-2xl mx-auto leading-relaxed">
            Cada planta merece la vasija perfecta. Combina una planta viva con una de
            nuestras macetas artesanales hechas a mano en El Salvador, o déjate sorprender
            por nuestras parejas botánicas favoritas.
          </p>

          {/* Selector de Modo (Tabs) */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-blanco-artesanal border border-crema-dark shadow-sm gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("manual")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "manual"
                    ? "bg-terracotta text-white shadow-sm"
                    : "text-tierra hover:text-terracotta hover:bg-crema-tint/50"
                }`}
              >
                <Plant size={18} weight={activeTab === "manual" ? "fill" : "bold"} />
                <span>Arma tu combo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("surprise")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "surprise"
                    ? "bg-terracotta text-white shadow-sm"
                    : "text-tierra hover:text-terracotta hover:bg-crema-tint/50"
                }`}
              >
                <Gift size={18} weight={activeTab === "surprise" ? "fill" : "bold"} />
                <span>Sorpréndeme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido según la pestaña activa */}
        <div className="mb-16">
          {activeTab === "manual" ? (
            <ManualComboBuilder />
          ) : (
            <SurpriseBoxModal />
          )}
        </div>

        {/* Banner Informativo y Garantías de los Combos */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-blanco-artesanal border border-crema-dark shadow-sm relative overflow-hidden">
          <OrganicPattern
            tone="terracotta"
            opacity={0.03}
            className="pointer-events-none"
          />

          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-salvia-dark text-xs font-bold uppercase tracking-wider">
                <Sparkle size={14} weight="fill" className="text-terracotta" />
                <span>Compromiso de Cuidado Botánico</span>
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-tierra">
                ¿Por qué comprar tu combo en Ixchel?
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-crema-light/50 border border-crema-dark/50 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-salvia/20 text-salvia-dark flex items-center justify-center">
                  <Drop size={22} weight="duotone" />
                </div>
                <h4 className="font-sans font-bold text-base text-tierra">
                  Drenaje Real Funcional
                </h4>
                <p className="text-xs text-tierra-muted leading-relaxed">
                  Todas las macetas moldeadas en nuestro taller cuentan con perforación de drenaje calibrada para evitar pudrición de raíz.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-crema-light/50 border border-crema-dark/50 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-terracotta/15 text-terracotta flex items-center justify-center">
                  <Plant size={22} weight="duotone" />
                </div>
                <h4 className="font-sans font-bold text-base text-tierra">
                  Plantas Sanas y Aclimatadas
                </h4>
                <p className="text-xs text-tierra-muted leading-relaxed">
                  Seleccionamos suculentas y plantas de interior bien enraizadas, listas para prosperar en la iluminación de tu casa u oficina.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-crema-light/50 border border-crema-dark/50 space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-luna/25 text-tierra flex items-center justify-center">
                  <MapPin size={22} weight="duotone" />
                </div>
                <h4 className="font-sans font-bold text-base text-tierra">
                  Puntos de Entrega Seguros
                </h4>
                <p className="text-xs text-tierra-muted leading-relaxed">
                  Para cuidar al 100% la integridad de la planta viva, coordinamos entregas presenciales en puntos céntricos seguros de El Salvador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
