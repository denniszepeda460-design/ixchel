import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, getPromotionalProducts } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import OrganicPattern from "@/components/ui/OrganicPattern";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  Drop,
  Sparkle,
  Heart,
  InstagramLogo,
  CheckCircle,
  Gift,
} from "@phosphor-icons/react/dist/ssr";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const promotionalProducts = getPromotionalProducts();

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SECTION (Asymmetric Split Screen - Anti-Slop Discipline) */}
      <section className="relative min-h-[calc(100dvh-68px)] flex items-center border-b border-crema-dark/60 bg-crema">
        <OrganicPattern tone="terracotta" opacity={0.06} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Columna Izquierda: Copy y CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow de Marca */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-crema-tint border border-crema-dark text-xs font-semibold text-salvia-dark tracking-wide uppercase">
                <Sparkle size={14} weight="fill" className="text-luna" />
                <span>Macetas de familia, inspiradas en nuestras raíces</span>
              </div>

              {/* Titular Principal: Max 2 líneas en desktop */}
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-tierra tracking-tight leading-[1.08]">
                Macetas artesanales pensadas para el{" "}
                <span className="font-cursive font-normal text-terracotta text-5xl sm:text-6xl lg:text-7xl block sm:inline">
                  bienestar de tus plantas.
                </span>
              </h1>

              {/* Subtítulo: Verbatim del usuario */}
              <p className="text-base sm:text-lg text-tierra-muted font-sans leading-relaxed max-w-xl">
                Cada pieza está hecha con dedicación en nuestro estudio familiar,
                inspirada en la conexión sagrada entre la tierra y la naturaleza.
              </p>

              {/* Grupo de Acciones: 1 primaria + 1 secundaria */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  href="/catalogo"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight size={18} weight="bold" />}
                >
                  Explorar Catálogo
                </Button>

                <Button href="/historia" variant="outline" size="lg">
                  Conoce Nuestro Estudio
                </Button>
              </div>

              {/* Bullets de confianza con tipografía cuidada */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-tierra-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={15} weight="fill" className="text-salvia" />
                  <span>Diseño con drenaje anti-encharcamiento</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={15} weight="fill" className="text-salvia" />
                  <span>Hechas con dedicación, pieza a pieza</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={15} weight="fill" className="text-salvia" />
                  <span>Envíos con empaque protector</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Composición Visual Asimétrica del Producto Hero */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Marco de fotografía artesanal con sombra orgánica y borde suave */}
                <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-blanco-artesanal bg-crema-tint">
                  <Image
                    src="/images/hero-planter.jpg"
                    alt="Maceta artesanal Ixchel Luna Creciente con planta Callisia Pink"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover hover:scale-103 transition-transform duration-700 ease-out"
                  />
                  {/* Tarjeta flotante con detalles de la pieza */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-blanco-artesanal/95 backdrop-blur-md border border-crema-dark/60 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-tierra font-sans">
                        Maceta Luna Creciente
                      </p>
                      <p className="text-[11px] text-salvia-dark">
                        Acabado natural + Callisia Pink
                      </p>
                    </div>
                    <span className="text-sm font-bold text-terracotta font-sans">
                      $3.00
                    </span>
                  </div>
                </div>

                {/* Sello decorativo del estudio en la esquina */}
                <div className="hidden sm:flex absolute -top-5 -right-5 w-20 h-20 rounded-full bg-luna-light border-2 border-luna/40 items-center justify-center text-tierra shadow-md rotate-12">
                  <div className="text-center">
                    <span className="block font-cursive text-xl leading-none text-terracotta font-bold">
                      ixchel
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-tierra-muted font-bold">
                      estudio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FRASE DE MARCA Y VALOR ARTESANAL */}
      <section className="py-16 bg-crema-tint/50 border-b border-crema-dark/60 relative">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="font-cursive text-3xl sm:text-4xl text-terracotta block">
            El valor de lo hecho con tiempo
          </span>
          <blockquote className="font-sans font-medium text-xl sm:text-2xl text-tierra leading-relaxed max-w-2xl mx-auto">
            “Cada pieza está hecha con amor, inspirada en la conexión entre la tierra y la naturaleza.”
          </blockquote>
          <p className="text-xs text-tierra-muted tracking-widest uppercase pt-2">
            Familia Ixchel • Un hogar para tus plantas
          </p>
        </div>
      </section>

      {/* 3. COLECCIÓN DESTACADA (Grid sin monotonía) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra tracking-tight">
              Creaciones Destacadas
            </h2>
            <p className="text-sm text-tierra-muted max-w-md">
              Macetas hechas con cariño, curadas al sol y pensadas para darle a tus plantas el mejor hogar posible.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors group"
          >
            <span>Ver todo el catálogo</span>
            <ArrowRight
              size={16}
              weight="bold"
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PILARES ARTESANALES (Sin afirmaciones no verificables) */}
      <section className="py-20 bg-blanco-artesanal border-y border-crema-dark/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra">
              ¿Por qué elegir una maceta Ixchel?
            </h2>
            <p className="text-sm text-tierra-muted">
              Cuidamos cada detalle, desde el acabado de cada pieza hasta el orificio de drenaje, para la salud de tus plantas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Pilar 1 */}
            <div className="p-8 rounded-2xl bg-crema/60 border border-crema-dark/50 space-y-4 hover:border-terracotta/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-terracotta/15 flex items-center justify-center text-terracotta">
                <Drop size={26} weight="duotone" />
              </div>
              <h3 className="font-sans font-bold text-xl text-tierra">
                Diseño Pensado para tus Raíces
              </h3>
              <p className="text-sm text-tierra-muted leading-relaxed">
                Cada maceta cuenta con orificio de drenaje para evitar el encharcamiento y ayudar a prevenir hongos y pudrición en las raíces.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-8 rounded-2xl bg-crema/60 border border-crema-dark/50 space-y-4 hover:border-salvia/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-salvia/15 flex items-center justify-center text-salvia-dark">
                <Heart size={26} weight="duotone" />
              </div>
              <h3 className="font-sans font-bold text-xl text-tierra">
                Hechas con Cariño en Familia
              </h3>
              <p className="text-sm text-tierra-muted leading-relaxed">
                Somos un matrimonio trabajando juntos, pieza a pieza. Cuidamos cada detalle del acabado, el color y el empaque antes de que la maceta llegue a tus manos.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-8 rounded-2xl bg-crema/60 border border-crema-dark/50 space-y-4 hover:border-luna/60 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-luna/20 flex items-center justify-center text-[#8d5f13]">
                <Sparkle size={26} weight="duotone" />
              </div>
              <h3 className="font-sans font-bold text-xl text-tierra">
                Inspiración Lunar y Botánica
              </h3>
              <p className="text-sm text-tierra-muted leading-relaxed">
                Ixchel es la diosa maya de la luna, el agua y los ciclos de vida. Diseñamos proporciones pensadas para que las enredaderas como Callisia Pink y suculentas caigan con gracia natural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN PROMOCIONES (Reemplaza Nuestra Historia con formato de Creaciones Destacadas) */}
      <section className="py-20 bg-crema-tint/40 border-b border-crema-dark/70 relative">
        <OrganicPattern tone="salvia" opacity={0.05} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-salvia/15 border border-salvia/30 text-xs font-bold text-salvia-dark uppercase tracking-wider">
                <Gift size={14} weight="bold" />
                <span>Promoción Especial de Temporada</span>
              </div>
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra tracking-tight">
                Promociones con Suculenta de Regalo
              </h2>
              <p className="text-sm text-tierra-muted max-w-xl">
                Piezas seleccionadas que incluyen una suculenta viva de obsequio cultivada con dedicación en nuestro estudio familiar, al mismo precio regular de la maceta.
              </p>
            </div>

            <Link
              href="/catalogo?promocion=true"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-salvia-dark hover:text-tierra transition-colors group"
            >
              <span>Ver todas las promociones</span>
              <ArrowRight
                size={16}
                weight="bold"
                className="group-hover:translate-x-1 transition-transform text-salvia-dark"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotionalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/catalogo?promocion=true"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight size={16} weight="bold" />}
            >
              Explorar Promociones en Catálogo
            </Button>
          </div>
        </div>
      </section>

      {/* 6. COMUNIDAD E INSTAGRAM */}
      <section className="py-20 bg-crema-tint/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 text-salvia-dark text-xs font-bold tracking-widest uppercase">
              <InstagramLogo size={18} weight="fill" className="text-terracotta" />
              <span>@ixchelsv</span>
            </div>
            <h2 className="font-sans font-extrabold text-3xl text-tierra">
              Rincones verdes de nuestra comunidad
            </h2>
            <p className="text-sm text-tierra-muted">
              Comparte tu maceta con la etiqueta #MacetasIxchel y acompáñanos en el día a día de nuestro estudio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-crema-dark shadow-2xs group bg-blanco-artesanal">
              <Image
                src="/images/vacija.png"
                alt="Maceta artesanal con Ceropegia woodii en balcón"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover p-3 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-crema-dark shadow-2xs group bg-blanco-artesanal">
              <Image
                src="/images/concha.png"
                alt="Cuenco verde salvia con suculenta en mesa de noche"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover p-3 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-crema-dark shadow-2xs group bg-blanco-artesanal">
              <Image
                src="/images/casita.png"
                alt="Maceta colgante en ventana con luz de mañana"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover p-3 group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden border border-crema-dark shadow-2xs group bg-blanco-artesanal">
              <Image
                src="/images/corazon.png"
                alt="Detalle del acabado artesanal de nuestras macetas"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover p-3 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              href={siteConfig.social.instagram}
              isExternal
              variant="outline"
              size="md"
              leftIcon={<InstagramLogo size={18} weight="bold" />}
            >
              Seguir en Instagram
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
