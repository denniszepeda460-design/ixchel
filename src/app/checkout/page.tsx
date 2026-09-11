"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, siteConfig } from "@/config/site";
import WhatsAppCheckoutBridge from "@/components/checkout/WhatsAppCheckoutBridge";
import PaymentGatewayBridge from "@/components/checkout/PaymentGatewayBridge";
import Button from "@/components/ui/Button";
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  WhatsappLogo,
  CheckCircle,
} from "@phosphor-icons/react";

export default function CheckoutPage() {
  const { items, getSubtotal, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-crema">
        <div className="text-sm text-tierra-muted">Cargando pedido...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-crema text-center">
        <div className="w-20 h-20 rounded-full bg-crema-tint flex items-center justify-center text-terracotta/60 mb-4">
          <ShoppingBag size={40} weight="duotone" />
        </div>
        <h1 className="font-sans font-extrabold text-2xl text-tierra mb-2">
          No hay piezas para procesar en tu carrito
        </h1>
        <p className="text-xs text-tierra-muted max-w-sm mb-6 leading-relaxed">
          Para realizar un pedido por WhatsApp, primero elige tu maceta artesanal
          en nuestro catálogo.
        </p>
        <Button href="/catalogo" variant="primary" size="md">
          Ver Colección de Macetas
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del Checkout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-crema-dark/60 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-salvia-dark uppercase tracking-wider mb-1">
              <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
              <span>Cierre de Pedido Directo</span>
            </div>
            <h1 className="font-sans font-extrabold text-3xl text-tierra">
              Finalizar Pedido
            </h1>
          </div>

          <Link
            href="/carrito"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:underline"
          >
            <ArrowLeft size={14} />
            <span>Editar artículos en el carrito</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Columna Izquierda: Formulario de Checkout (WhatsApp o Pasarela) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-4 rounded-xl bg-crema-tint border border-crema-dark/70 text-xs text-tierra-muted leading-relaxed flex items-start gap-3">
              <WhatsappLogo size={22} weight="fill" className="text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <strong className="text-tierra block font-bold">
                  ¿Cómo funciona este checkout?
                </strong>
                Al llenar tus datos, generamos un mensaje formal y ordenado con
                el detalle de tus macetas. Se abrirá tu WhatsApp conectado
                directamente al número de los artesanos de <strong>Ixchel</strong>{" "}
                para coordinar entrega y método de pago (transferencia, depósito o contra entrega).
              </div>
            </div>

            {siteConfig.checkoutMode === "whatsapp" ? (
              <WhatsAppCheckoutBridge items={items} subtotal={subtotal} />
            ) : (
              <PaymentGatewayBridge items={items} subtotal={subtotal} />
            )}
          </div>

          {/* Columna Derecha: Resumen Detallado del Pedido */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-5 sticky top-24">
              <div className="flex items-center justify-between border-b border-crema-dark/50 pb-3">
                <h2 className="font-sans font-bold text-base text-tierra">
                  Resumen de Macetas ({totalItems})
                </h2>
                <Link
                  href="/carrito"
                  className="text-xs text-terracotta font-medium hover:underline"
                >
                  Modificar
                </Link>
              </div>

              {/* Lista compacta de items */}
              <div className="divide-y divide-crema-dark/40 max-h-72 overflow-y-auto pr-1 space-y-2">
                {items.map(({ product, quantity, selectedColor }) => (
                  <div
                    key={`${product.id}-${selectedColor || "default"}`}
                    className="pt-2 pb-2 flex gap-3 items-center"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-crema-tint shrink-0 border border-crema-dark/50">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-sans font-bold text-xs text-tierra truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-tierra-light">
                        {quantity}x •{" "}
                        {selectedColor ? (
                          <span className="font-semibold text-terracotta">
                            Color: {selectedColor} •{" "}
                          </span>
                        ) : null}
                        {product.sizeLabel}
                      </p>
                    </div>
                    <span className="font-bold text-xs text-terracotta shrink-0">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cálculos */}
              <div className="pt-3 border-t border-crema-dark/60 space-y-2 text-xs">
                <div className="flex justify-between text-tierra-muted">
                  <span>Subtotal piezas</span>
                  <span className="font-bold text-tierra">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-tierra-muted">
                  <span>Envío seguro</span>
                  <span className="text-salvia-dark font-semibold">
                    A confirmar por WhatsApp
                  </span>
                </div>
                <div className="pt-2 border-t border-crema-dark/60 flex justify-between text-base">
                  <span className="font-bold text-tierra">Total</span>
                  <span className="font-extrabold text-xl text-terracotta font-sans">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Sellos de Confianza */}
              <div className="pt-3 border-t border-crema-dark/40 space-y-2 text-[11px] text-tierra-muted">
                <div className="flex items-center gap-2 text-salvia-dark">
                  <CheckCircle size={15} weight="fill" className="text-salvia" />
                  <span>Trato directo con los artesanos sin intermediarios</span>
                </div>
                <div className="flex items-center gap-2 text-salvia-dark">
                  <ShieldCheck size={15} weight="fill" className="text-salvia" />
                  <span>Garantía de reposición ante cualquier percance en ruta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
