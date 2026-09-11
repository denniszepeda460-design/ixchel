import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import OrganicPattern from "@/components/ui/OrganicPattern";
import { siteConfig } from "@/config/site";
import {
  Sparkle,
  Heart,
  Moon,
  Plant,
  ArrowRight,
  Sun,
  HandFist,
  Compass,
  Palette,
} from "@phosphor-icons/react/dist/ssr";

export default function HistoriaPage() {
  const processSteps = [
    {
      number: "01",
      title: "Preparación de la Mezcla",
      desc: "Preparamos la mezcla en las proporciones exactas para lograr piezas resistentes y con buen drenaje.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Dando Forma en Pareja",
      desc: "Entre los dos, damos forma a cada pieza y cuidamos que las paredes queden parejas y resistentes.",
      icon: HandFist,
    },
    {
      number: "03",
      title: "Revisión y Drenaje",
      desc: "Revisamos cada pieza y abrimos el orificio de drenaje antes de que termine de curar.",
      icon: Moon,
    },
    {
      number: "04",
      title: "Curado al Sol",
      desc: "Cada pieza necesita su tiempo: la dejamos curar por completo antes de continuar, para que quede firme y lista para acompañar a tus plantas por años.",
      icon: Sun,
    },
    {
      number: "05",
      title: "Acabado y Color",
      desc: "Pintamos y damos el acabado final a mano en las zonas seleccionadas, antes de revisar cada pieza y dejarla lista para empacar.",
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-crema pb-24">
      {/* Banner de Cabecera */}
      <section className="relative py-20 bg-crema-tint/50 border-b border-crema-dark/60 overflow-hidden">
        <OrganicPattern tone="terracotta" opacity={0.06} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-4">
          <span className="font-cursive text-3xl sm:text-4xl text-terracotta block">
            De nuestras manos a tu hogar
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-tierra tracking-tight">
            Nuestra Historia
          </h1>
          <p className="text-base sm:text-lg text-tierra-muted leading-relaxed font-sans max-w-2xl mx-auto">
            {siteConfig.familyStoryCopy}
          </p>
        </div>
      </section>

      {/* Relato del Matrimonio Artesano */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Fotografía del Matrimonio */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-blanco-artesanal">
              <Image
                src="/images/taller-alfarero.jpg"
                alt="Matrimonio Ixchel detrás de cada maceta"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Pie de foto documental */}
            <div className="mt-3 text-xs text-tierra-muted italic text-center">
              Nuestro espacio familiar: donde las plantas y el tiempo conviven en armonía.
            </div>
          </div>

          {/* Texto de la Historia */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia/15 text-salvia-dark text-xs font-bold uppercase tracking-wider">
              <Heart size={14} weight="fill" className="text-terracotta" />
              <span>Proyecto de vida en pareja</span>
            </div>

            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra leading-tight">
              Comenzamos buscando un hogar digno para nuestras propias plantas.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-tierra-muted font-sans leading-relaxed">
              <p>
                Todo empezó con una decepción recurrente: las macetas comerciales
                de plástico sofocaban las raíces de nuestras plantas favoritas,
                mientras que las cerámicas industriales importadas carecían de alma
                y drenaje adecuado.
              </p>
              <p>
                Decidimos acondicionar un rincón de nuestro patio como nuestro primer
                espacio de trabajo. Aprendimos a base de prueba y error: a preparar la
                mezcla en las proporciones correctas, a cuidar cada pieza mientras curaba
                y a pulir los detalles antes de que estuviera lista.
              </p>
              <p>
                Lo que nació como una pasión íntima se convirtió en <strong>Ixchel</strong>:
                un proyecto familiar que busca devolver a los hogares la calidez de los objetos
                hechos con tiempo y cariño.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* El Significado de Ixchel */}
      <section className="py-20 bg-blanco-artesanal border-y border-crema-dark/70 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-luna-light border border-luna/40 mx-auto flex items-center justify-center text-terracotta shadow-xs">
            <Moon size={32} weight="duotone" />
          </div>

          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra">
            ¿Por qué nos llamamos Ixchel?
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-tierra-muted leading-relaxed font-sans max-w-2xl mx-auto text-left sm:text-center">
            <p>
              En la cosmovisión maya, <strong>Ixchel</strong> es la venerada diosa
              de la luna, la fertilidad de la tierra, el agua que nutre los campos
              y los ciclos de vida vegetal.
            </p>
            <p>
              Al igual que las fases de la luna regulan las mareas y el flujo de
              savia en los tallos vegetales, nuestras macetas están diseñadas para
              honrar esos ritmos naturales. Por eso el arco de la luna creciente y
              las hojas entrelazadas están presentes en cada una de nuestras
              creaciones.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso Artesanal Paso a Paso */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-cursive text-3xl text-terracotta block">
            El oficio paso a paso
          </span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra">
            Cómo nace cada maceta en nuestro espacio
          </h2>
          <p className="text-sm text-tierra-muted">
            Un proceso cuidadoso, desde la mezcla inicial hasta la pieza terminada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-2xs space-y-3 flex flex-col justify-between hover:border-terracotta/50 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cursive text-3xl text-terracotta font-bold">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-crema-tint flex items-center justify-center text-salvia-dark">
                      <Icon size={18} weight="duotone" />
                    </div>
                  </div>
                  <h3 className="font-sans font-bold text-base text-tierra leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-tierra-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA final hacia la tienda */}
        <div className="mt-16 p-10 rounded-3xl bg-crema-tint/70 border border-crema-dark text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-terracotta uppercase tracking-wider">
            <Sparkle size={16} weight="fill" className="text-luna" />
            <span>Lleva una pieza única a tu hogar</span>
          </div>
          <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-tierra">
            ¿Listo para darle la bienvenida a una maceta Ixchel?
          </h3>
          <p className="text-xs sm:text-sm text-tierra-muted max-w-xl mx-auto leading-relaxed">
            Cada pieza se empaca individualmente con materiales biodegradables
            y amortiguación garantizada para llegar segura a tu puerta.
          </p>
          <div className="pt-2">
            <Button
              href="/catalogo"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} weight="bold" />}
            >
              Ver Todas las Macetas Disponibles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
