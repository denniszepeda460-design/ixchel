"use client";

import React, { useState } from "react";
import { CartItem } from "@/store/cartStore";
import { formatPrice, siteConfig } from "@/config/site";
import Button from "@/components/ui/Button";
import {
  WhatsappLogo,
  CheckCircle,
  PaperPlaneTilt,
  LockSimple,
  ShieldCheck,
  MapPin,
  Truck,
  WarningCircle,
  PottedPlant,
} from "@phosphor-icons/react";
import confetti from "canvas-confetti";

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  address: string;
  notes: string;
}

interface WhatsAppCheckoutBridgeProps {
  items: CartItem[];
  subtotal: number;
  onSuccess?: () => void;
}

export default function WhatsAppCheckoutBridge({
  items,
  subtotal,
  onSuccess,
}: WhatsAppCheckoutBridgeProps) {
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const [deliveryMode, setDeliveryMode] = useState<"pickup" | "delivery">("pickup");
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");

  const hasPlantCombo = items.some(
    (item) =>
      item.product.id.startsWith("combo-") ||
      item.product.name.toLowerCase().includes("combo")
  );

  const validate = () => {
    const errs: Partial<CustomerDetails> = {};
    if (!customer.name.trim()) errs.name = "Por favor ingresa tu nombre completo";
    if (!customer.phone.trim()) errs.phone = "Por favor ingresa un número de teléfono o WhatsApp";
    if (!customer.city.trim()) errs.city = "Por favor especifica tu ciudad, departamento o zona";
    if (!customer.address.trim()) errs.address = "Por favor ingresa tu dirección o punto de entrega preferido";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const productLines = items
      .map(
        (item) =>
          `• ${item.quantity}x *${item.product.name}* (${item.selectedColor ? `Color: ${item.selectedColor}, ` : ""}${item.product.sizeLabel}) — ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join("\n");

    const deliveryText =
      deliveryMode === "pickup"
        ? "Punto de encuentro (recomendado)"
        : "Envío a domicilio (sin responsabilidad de Ixchel sobre la planta)";

    const disclaimerText =
      hasPlantCombo && deliveryMode === "delivery"
        ? "\n• *Aviso botánico:* El cliente asume la responsabilidad del estado de la planta viva durante el trayecto a domicilio."
        : "";

    const message = `🌵 *¡Hola Ixchel!*
Me gustaría realizar el siguiente pedido de macetas y piezas artesanales:

📦 *DETALLE DEL PEDIDO:*
${productLines}

💰 *TOTAL ESTIMADO:* ${formatPrice(subtotal)}

📍 *DATOS PARA LA ENTREGA:*
• *Modalidad de entrega:* ${deliveryText}${disclaimerText}
• *Nombre:* ${customer.name}
• *Teléfono de contacto:* ${customer.phone}
• *Ciudad / Zona:* ${customer.city}
• *Dirección / Referencia:* ${customer.address}${
      customer.notes ? `\n• *Notas especiales:* ${customer.notes}` : ""
    }

¿Me confirman disponibilidad y métodos de pago para coordinar la entrega? ¡Muchas gracias!`;

    return encodeURIComponent(message);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const encodedMessage = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMessage}`;
    setGeneratedWhatsAppUrl(waUrl);

    // Lanzar confeti de celebración artesanal
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#bf692e", "#77806b", "#d8a643", "#f3e7d1"],
      });
    } catch {
      // Ignorar si canvas no está disponible
    }

    setOrderSent(true);
    setIsSubmitting(false);

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (onSuccess) {
      onSuccess();
    }
  };

  if (orderSent) {
    return (
      <div className="p-8 rounded-3xl bg-blanco-artesanal border-2 border-salvia/40 shadow-lg text-center space-y-5 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-salvia/15 text-salvia mx-auto flex items-center justify-center">
          <CheckCircle size={40} weight="fill" />
        </div>

        <div className="space-y-2">
          <h3 className="font-sans font-extrabold text-2xl text-tierra">
            ¡Tu pedido ha sido armado con éxito!
          </h3>
          <p className="text-sm text-tierra-muted max-w-md mx-auto leading-relaxed">
            Se ha generado tu mensaje personalizado con la lista de macetas y datos
            de entrega para el número oficial de <strong>Ixchel</strong>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-crema-tint/70 text-xs text-tierra space-y-1 text-left max-w-md mx-auto border border-crema-dark/60">
          <p className="font-bold text-salvia-dark">
            ¿No se abrió WhatsApp automáticamente en tu dispositivo?
          </p>
          <p className="text-tierra-muted">
            Haz clic en el botón de abajo para enviar tu pedido manualmente:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            href={generatedWhatsAppUrl}
            isExternal
            variant="whatsapp"
            size="lg"
            leftIcon={<WhatsappLogo size={22} weight="fill" />}
          >
            Abrir WhatsApp de Ixchel Ahora
          </Button>

          <Button href="/catalogo" variant="outline" size="lg">
            Volver a la Tienda
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmitOrder} className="space-y-6">
      {/* Aviso de Entrega para Combos con Planta */}
      {hasPlantCombo && (
        <div className="p-5 rounded-2xl bg-luna/15 border-2 border-luna/40 text-tierra space-y-2">
          <div className="flex items-center gap-2 text-terracotta font-sans font-bold text-sm">
            <PottedPlant size={20} weight="fill" />
            <span>Nota Importante sobre Combos con Planta Viva</span>
          </div>
          <p className="text-xs text-tierra-muted leading-relaxed">
            Por defecto, los combos con planta se coordinan en un punto de encuentro para
            revisar que todo llegue en buen estado. Si prefieres envío a domicilio, puedes
            seleccionarlo, entendiendo que Ixchel no se hace responsable por el estado de la
            planta durante el trayecto.
          </p>
        </div>
      )}

      {/* Selector de Modalidad de Entrega */}
      <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-crema-dark/50 pb-3">
          <div className="w-7 h-7 rounded-full bg-salvia/15 text-salvia-dark flex items-center justify-center text-xs font-bold">
            1
          </div>
          <h3 className="font-sans font-bold text-base text-tierra">
            Modalidad de Entrega
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDeliveryMode("pickup")}
            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
              deliveryMode === "pickup"
                ? "border-salvia-dark bg-salvia/10 shadow-xs"
                : "border-crema-dark bg-crema-tint/20 hover:border-salvia/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin
                  size={20}
                  weight="fill"
                  className={deliveryMode === "pickup" ? "text-salvia-dark" : "text-tierra-muted"}
                />
                <span className="font-sans font-bold text-sm text-tierra">
                  Punto de encuentro
                </span>
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-salvia text-white">
                Recomendado
              </span>
            </div>
            <p className="text-xs text-tierra-muted leading-relaxed">
              Coordinamos un punto céntrico y seguro en El Salvador para revisar juntos tus piezas y plantas en perfecto estado.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMode("delivery")}
            className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
              deliveryMode === "delivery"
                ? "border-terracotta bg-terracotta/10 shadow-xs"
                : "border-crema-dark bg-crema-tint/20 hover:border-terracotta/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Truck
                  size={20}
                  weight="fill"
                  className={deliveryMode === "delivery" ? "text-terracotta" : "text-tierra-muted"}
                />
                <span className="font-sans font-bold text-sm text-tierra">
                  Envío a domicilio
                </span>
              </div>
            </div>
            <p className="text-xs text-tierra-muted leading-relaxed">
              Servicio de mensajería directo. {hasPlantCombo && (
                <span className="font-semibold text-terracotta block pt-1">
                  (Sin responsabilidad de Ixchel sobre la planta durante el traslado).
                </span>
              )}
            </p>
          </button>
        </div>
      </div>

      {/* Información del Cliente */}
      <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-crema-dark/50 pb-3">
          <div className="w-7 h-7 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center text-xs font-bold">
            2
          </div>
          <h3 className="font-sans font-bold text-base text-tierra">
            Tus Datos de Contacto
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="customer-name"
              className="block text-xs font-bold text-tierra"
            >
              Nombre y Apellido *
            </label>
            <input
              id="customer-name"
              type="text"
              placeholder="Ej. María López"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-crema-tint/30 text-tierra focus:outline-none focus:ring-2 focus:ring-terracotta ${
                errors.name ? "border-red-500" : "border-crema-dark"
              }`}
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="customer-phone"
              className="block text-xs font-bold text-tierra"
            >
              Número de Teléfono / WhatsApp *
            </label>
            <input
              id="customer-phone"
              type="tel"
              placeholder="Ej. 0000 0000"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-crema-tint/30 text-tierra focus:outline-none focus:ring-2 focus:ring-terracotta ${
                errors.phone ? "border-red-500" : "border-crema-dark"
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Dirección / Lugar de Entrega */}
      <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-crema-dark/50 pb-3">
          <div className="w-7 h-7 rounded-full bg-luna/25 text-tierra flex items-center justify-center text-xs font-bold">
            3
          </div>
          <h3 className="font-sans font-bold text-base text-tierra">
            {deliveryMode === "pickup" ? "Punto de Encuentro Deseado" : "Dirección de Entrega"}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="customer-city"
              className="block text-xs font-bold text-tierra"
            >
              Ciudad, Municipio o Departamento *
            </label>
            <input
              id="customer-city"
              type="text"
              placeholder="Ej. Santa Tecla, La Libertad / San Salvador"
              value={customer.city}
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-crema-tint/30 text-tierra focus:outline-none focus:ring-2 focus:ring-salvia ${
                errors.city ? "border-red-500" : "border-crema-dark"
              }`}
            />
            {errors.city && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.city}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="customer-address"
              className="block text-xs font-bold text-tierra"
            >
              {deliveryMode === "pickup"
                ? "Punto de encuentro sugerido o referencia *"
                : "Dirección exacta o punto de referencia *"}
            </label>
            <input
              id="customer-address"
              type="text"
              placeholder={
                deliveryMode === "pickup"
                  ? "Ej. C.C. Multiplaza, Plaza Merliot, La Gran Vía, etc."
                  : "Ej. Colonia Las Rosas, Calle Los Pinos #12, frente al parque"
              }
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-crema-tint/30 text-tierra focus:outline-none focus:ring-2 focus:ring-salvia ${
                errors.address ? "border-red-500" : "border-crema-dark"
              }`}
            />
            {errors.address && (
              <p className="text-[11px] text-red-600 font-medium">
                {errors.address}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="customer-notes"
              className="block text-xs font-bold text-tierra"
            >
              Notas especiales o dedicatoria (Opcional)
            </label>
            <textarea
              id="customer-notes"
              rows={2}
              placeholder="Ej. Es un regalo de cumpleaños para mi mamá, ¿pueden incluir una tarjetita con su nombre?"
              value={customer.notes}
              onChange={(e) =>
                setCustomer({ ...customer, notes: e.target.value })
              }
              className="w-full px-3.5 py-2 rounded-xl border border-crema-dark text-sm bg-crema-tint/30 text-tierra focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>
        </div>
      </div>

      {/* Botón de Envío y Compromiso */}
      <div className="space-y-4">
        <Button
          type="submit"
          variant="whatsapp"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          leftIcon={<WhatsappLogo size={22} weight="fill" />}
          rightIcon={<PaperPlaneTilt size={18} weight="bold" />}
        >
          Confirmar y Enviar Pedido a WhatsApp
        </Button>

        <div className="flex items-center justify-center gap-2 text-xs text-tierra-muted">
          <LockSimple size={14} className="text-salvia" />
          <span>Tus datos son privados y solo se usan para coordinar este pedido.</span>
        </div>
      </div>
    </form>
  );
}
