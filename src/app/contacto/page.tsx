"use client";

import React from "react";
import Button from "@/components/ui/Button";
import OrganicPattern from "@/components/ui/OrganicPattern";
import { siteConfig } from "@/config/site";
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  EnvelopeSimple,
  MapPin,
  Clock,
  Phone,
} from "@phosphor-icons/react";

export default function ContactoPage() {
  const faqs = [
    {
      q: "¿Cómo garantizan que las macetas no se quiebren durante el envío?",
      a: "Empacamos cada pieza con doble cámara de viruta de madera biodegradable y cartón corrugado reforzado. Si por algún incidente en ruta tu maceta llegara dañada, te enviamos un reemplazo inmediato sin ningún costo.",
    },
    {
      q: "¿Todas las macetas incluyen orificio de drenaje?",
      a: "Sí, absolutamente todas nuestras macetas cuentan con drenaje funcional calibrado. La salud de las raíces es nuestra máxima prioridad como familia apasionada por las plantas.",
    },
    {
      q: "¿Hacen pedidos personalizados o macetas a medida para eventos?",
      a: "¡Sí! Con frecuencia elaboramos lotes para bodas, regalos corporativos y maceteros de dimensiones especiales. Escríbenos con anticipación mínima de 3 semanas por WhatsApp para coordinar tu proyecto.",
    },
    {
      q: "¿Cuáles son los métodos de pago aceptados?",
      a: "Aceptamos transferencia bancaria, depósito o pago contra entrega según tu localidad.",
    },
  ];

  return (
    <div className="min-h-screen bg-crema pb-24">
      {/* Banner de Cabecera */}
      <section className="relative py-16 bg-crema-tint/50 border-b border-crema-dark/60 overflow-hidden">
        <OrganicPattern tone="salvia" opacity={0.05} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-3">
          <span className="font-cursive text-3xl text-terracotta block">
            Estamos a un mensaje de distancia
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-tierra">
            Contacto & Preguntas
          </h1>
          <p className="text-sm sm:text-base text-tierra-muted leading-relaxed font-sans max-w-xl mx-auto">
            ¿Tienes dudas sobre los tamaños, cuidados de tus plantas o quieres
            coordinar un pedido especial? Con gusto te atendemos personalmente.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda: Información de Contacto (Grande y Protagonista) & Preguntas Frecuentes */}
          <div className="lg:col-span-7 space-y-8">
            {/* Bloque 1: Información de Contacto (Grande y Protagonista) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-6">
              <div className="border-b border-crema-dark/50 pb-4">
                <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-tierra">
                  Información de Contacto
                </h2>
                <p className="text-xs sm:text-sm text-tierra-muted mt-1">
                  Datos de nuestro taller artesanal y canales de atención directa
                </p>
              </div>

              {/* Grid destacado de canales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ubicación general */}
                <div className="p-4 rounded-2xl bg-crema-tint/30 border border-crema-dark/50 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                    <MapPin size={22} weight="duotone" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-sm font-bold text-tierra block font-sans">
                      Ubicación general:
                    </strong>
                    <span className="text-xs sm:text-sm text-tierra-muted leading-relaxed">
                      {siteConfig.location.region}. {siteConfig.location.workshopNote}
                    </span>
                  </div>
                </div>

                {/* Teléfonos de atención */}
                <div className="p-4 rounded-2xl bg-crema-tint/30 border border-crema-dark/50 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-salvia/15 text-salvia-dark flex items-center justify-center shrink-0">
                    <Phone size={22} weight="duotone" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-sm font-bold text-tierra block font-sans">
                      Teléfonos de atención:
                    </strong>
                    <span className="text-xs sm:text-sm text-tierra-muted block">
                      {siteConfig.whatsapp.display} (principal)
                    </span>
                    <span className="text-xs sm:text-sm text-tierra-muted block">
                      {siteConfig.whatsapp.altDisplay} (alternativo)
                    </span>
                  </div>
                </div>

                {/* Horario de atención */}
                <div className="p-4 rounded-2xl bg-crema-tint/30 border border-crema-dark/50 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-salvia/15 text-salvia-dark flex items-center justify-center shrink-0">
                    <Clock size={22} weight="duotone" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-sm font-bold text-tierra block font-sans">
                      Horario de atención a mensajes:
                    </strong>
                    <span className="text-xs sm:text-sm text-tierra-muted leading-relaxed">
                      Lunes a Sábado: 8:00 AM – 7:00 PM
                    </span>
                  </div>
                </div>

                {/* Correo electrónico */}
                <div className="p-4 rounded-2xl bg-crema-tint/30 border border-crema-dark/50 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                    <EnvelopeSimple size={22} weight="duotone" />
                  </div>
                  <div className="space-y-0.5">
                    <strong className="text-sm font-bold text-tierra block font-sans">
                      Correo electrónico:
                    </strong>
                    <span className="text-xs sm:text-sm text-tierra-muted break-all">
                      {siteConfig.social.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Redes Sociales Síguenos */}
              <div className="pt-4 border-t border-crema-dark/40 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-bold text-tierra">
                  Síguenos:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-crema-tint/60 hover:bg-terracotta/10 border border-crema-dark/60 text-xs font-bold text-terracotta transition-colors"
                  >
                    <InstagramLogo size={16} weight="bold" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-crema-tint/60 hover:bg-terracotta/10 border border-crema-dark/60 text-xs font-bold text-terracotta transition-colors"
                  >
                    <FacebookLogo size={16} weight="bold" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href={siteConfig.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-crema-tint/60 hover:bg-terracotta/10 border border-crema-dark/60 text-xs font-bold text-terracotta transition-colors"
                  >
                    <TiktokLogo size={16} weight="bold" />
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bloque 2: Preguntas Frecuentes (FAQs) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-5">
              <div className="border-b border-crema-dark/50 pb-3">
                <h2 className="font-sans font-extrabold text-2xl text-tierra">
                  Preguntas Frecuentes
                </h2>
                <p className="text-xs text-tierra-muted mt-0.5">
                  Todo lo que necesitas saber antes y después de comprar tu maceta
                </p>
              </div>

              <div className="space-y-3.5">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-crema-tint/30 border border-crema-dark/60 space-y-1.5"
                  >
                    <h3 className="font-sans font-bold text-sm text-tierra flex items-start gap-2">
                      <span className="text-terracotta font-bold">Q:</span>
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-tierra-muted leading-relaxed font-sans pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha: WhatsApp Directo (Solo, sin nada debajo) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="p-6 sm:p-7 rounded-3xl bg-blanco-artesanal border-2 border-[#25D366]/40 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                  <WhatsappLogo size={28} weight="fill" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-tierra">
                    WhatsApp Directo
                  </h3>
                  <p className="text-xs text-tierra-muted">
                    Respuesta rápida y trato personal
                  </p>
                </div>
              </div>

              <p className="text-xs text-tierra-muted leading-relaxed font-sans">
                Escríbenos directamente para consultar stock en tiempo real,
                enviarnos fotos de tu planta para elegir la mejor maceta o coordinar
                pagos y entregas en El Salvador.
              </p>

              <div className="pt-2">
                <Button
                  href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
                    siteConfig.whatsapp.greeting
                  )}`}
                  isExternal
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  leftIcon={<WhatsappLogo size={22} weight="fill" />}
                >
                  Abrir Chat de WhatsApp ({siteConfig.whatsapp.display})
                </Button>
              </div>

              <div className="text-[11px] text-tierra-light text-center pt-1">
                Atendido directamente por el matrimonio artesano detrás de Ixchel
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
