"use client";

import React, { useState } from "react";
import { CartItem } from "@/store/cartStore";
import { formatPrice } from "@/config/site";
import Button from "@/components/ui/Button";
import { CreditCard, LockSimple, WarningCircle } from "@phosphor-icons/react";

interface PaymentGatewayBridgeProps {
  items: CartItem[];
  subtotal: number;
  onSuccess?: (paymentResult: any) => void;
  onError?: (error: any) => void;
}

/**
 * PaymentGatewayBridge
 *
 * Módulo de arquitectura desacoplada para pasarelas de pago (Stripe, Wompi, etc.).
 *
 * Para activar Stripe en el futuro:
 * 1. Instalar `@stripe/stripe-js` y `@stripe/react-stripe-js`
 * 2. En `src/config/site.ts`, cambiar `checkoutMode: 'stripe'`
 * 3. Configurar tu `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` y endpoint de API `/api/checkout/stripe`
 * 4. Reemplazar este componente por el contenedor `Elements` de Stripe sin tocar la lógica del carrito.
 */
export default function PaymentGatewayBridge({
  items,
  subtotal,
  onSuccess,
  onError,
}: PaymentGatewayBridgeProps) {
  const [loading, setLoading] = useState(false);

  const handleSimulatePayment = async () => {
    setLoading(true);
    // Simulación de pasarela de pago futura
    setTimeout(() => {
      setLoading(false);
      if (onSuccess) {
        onSuccess({ status: "success", orderId: `IXCHEL-${Date.now()}` });
      }
    }, 1500);
  };

  return (
    <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark shadow-xs space-y-5">
      <div className="flex items-center gap-2 border-b border-crema-dark/60 pb-3">
        <CreditCard size={22} className="text-terracotta" />
        <h3 className="font-sans font-bold text-base text-tierra">
          Pasarela de Pagos Digitales
        </h3>
      </div>

      <div className="p-4 rounded-xl bg-luna-light/60 border border-luna/40 flex items-start gap-3 text-xs text-[#7e5510]">
        <WarningCircle size={20} className="shrink-0 text-luna mt-0.5" />
        <div>
          <strong className="block font-bold">Modo de Pasarela Preparado:</strong>
          Actualmente los pedidos se procesan directamente por WhatsApp para
          brindarte atención personalizada y confirmar costos exactos de entrega.
          Esta sección está lista para vincular Stripe en cualquier momento.
        </div>
      </div>

      <div className="space-y-3 text-xs text-tierra-muted">
        <div className="flex justify-between">
          <span>Piezas seleccionadas:</span>
          <span className="font-bold text-tierra">{items.length} productos</span>
        </div>
        <div className="flex justify-between">
          <span>Total a procesar:</span>
          <span className="font-bold text-terracotta text-sm">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>

      <Button
        onClick={handleSimulatePayment}
        isLoading={loading}
        variant="primary"
        size="lg"
        fullWidth
        leftIcon={<LockSimple size={18} />}
      >
        Procesar Pago Seguro
      </Button>
    </div>
  );
}
