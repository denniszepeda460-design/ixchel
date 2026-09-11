import React from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import {
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  WhatsappLogo,
  EnvelopeSimple,
  Heart,
  Plant,
} from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="bg-tierra text-crema border-t border-tierra-muted/40 relative overflow-hidden">
      {/* Sutil brillo orgánico de fondo */}
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-crema-tint/10">
          {/* Columna 1: Marca y Propósito */}
          <div className="md:col-span-5 space-y-4">
            <Logo tone="inverted" size="lg" showTagline={true} />
            <p className="text-sm text-crema-tint/80 max-w-md leading-relaxed font-sans mt-3">
              {siteConfig.familyStoryCopy}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-salvia-light">
              <Plant size={16} weight="duotone" className="text-salvia" />
              <span>Diseñadas con dedicación, pensadas para el bienestar de tus raíces.</span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-salvia-light font-semibold">
              Explorar
            </h4>
            <ul className="space-y-2 text-sm text-crema-tint/80">
              <li>
                <Link
                  href="/catalogo"
                  className="hover:text-terracotta-light transition-colors"
                >
                  Todas las Macetas
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?tamano=colgante"
                  className="hover:text-terracotta-light transition-colors"
                >
                  Macetas Colgantes
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?acabado=color"
                  className="hover:text-terracotta-light transition-colors"
                >
                  Ediciones de Color
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo?ofertas=true"
                  className="hover:text-terracotta-light transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Macetas en Liquidación</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-terracotta text-white leading-tight">
                    Oferta
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/historia"
                  className="hover:text-terracotta-light transition-colors"
                >
                  Nuestra Historia Familiar
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-terracotta-light transition-colors"
                >
                  Preguntas y Cuidados
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Conexión y Redes */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-salvia-light font-semibold">
              Conecta con Nosotros
            </h4>
            <p className="text-xs text-crema-tint/70 leading-relaxed">
              ¿Tienes una maceta a medida en mente o buscas asesoría para tu planta?
              Escríbenos directamente y con gusto te atendemos.
            </p>

            {/* Botones de Redes Sociales */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-crema-tint/10 flex items-center justify-center text-crema hover:bg-terracotta hover:text-white transition-all"
                aria-label="Seguir a Ixchel en Instagram"
              >
                <InstagramLogo size={20} weight="regular" />
              </a>

              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-crema-tint/10 flex items-center justify-center text-crema hover:bg-terracotta hover:text-white transition-all"
                aria-label="Seguir a Ixchel en Facebook"
              >
                <FacebookLogo size={20} weight="regular" />
              </a>

              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-crema-tint/10 flex items-center justify-center text-crema hover:bg-terracotta hover:text-white transition-all"
                aria-label="Seguir a Ixchel en TikTok"
              >
                <TiktokLogo size={20} weight="regular" />
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
                  siteConfig.whatsapp.greeting
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-tierra transition-all"
                aria-label="Contactar por WhatsApp"
              >
                <WhatsappLogo size={20} weight="fill" />
              </a>

              <a
                href={`mailto:${siteConfig.social.email}`}
                className="w-10 h-10 rounded-full bg-crema-tint/10 flex items-center justify-center text-crema hover:bg-terracotta hover:text-white transition-all"
                aria-label="Enviar correo electrónico"
              >
                <EnvelopeSimple size={20} weight="regular" />
              </a>
            </div>

            <div className="pt-2 text-xs text-crema-tint/60 space-y-1">
              <p>{siteConfig.location.workshopNote}</p>
              <p className="text-crema-tint/80">
                Tel: {siteConfig.whatsapp.display} · {siteConfig.whatsapp.altDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Barra Inferior de Créditos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-crema-tint/60">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Hecho con cariño</span>
            <Heart size={14} weight="fill" className="text-terracotta" />
            <span>para hogares que aman la naturaleza.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
