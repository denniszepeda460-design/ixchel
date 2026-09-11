"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/config/site";
import Button from "@/components/ui/Button";
import {
  Plus,
  Minus,
  Trash,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  WhatsappLogo,
  Plant,
} from "@phosphor-icons/react";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-crema text-center">
        <div className="w-24 h-24 rounded-full bg-crema-tint flex items-center justify-center text-terracotta/60 mb-6">
          <ShoppingBag size={48} weight="duotone" />
        </div>
        <h1 className="font-sans font-extrabold text-3xl text-tierra mb-2">
          Tu carrito está vacío
        </h1>
        <p className="text-sm text-tierra-muted max-w-md leading-relaxed mb-8">
          Aún no has agregado ninguna maceta artesanal a tu pedido. Explora
          nuestras piezas hechas a mano e inspira tu hogar con naturaleza.
        </p>
        <Button href="/catalogo" variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
          Explorar el Catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crema py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2 border-b border-crema-dark/60 pb-5">
          <div>
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra">
              Tu Carrito de Compras
            </h1>
            <p className="text-xs sm:text-sm text-tierra-muted mt-1">
              Tienes {totalItems} {totalItems === 1 ? "pieza artesanal" : "piezas artesanales"} en tu lista
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-tierra-light hover:text-red-700 underline font-medium cursor-pointer self-start sm:self-auto"
          >
            Vaciar todo el carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Lista de Productos */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity, selectedColor }) => (
              <div
                key={`${product.id}-${selectedColor || "default"}`}
                className="p-4 sm:p-5 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-2xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Imagen + Info */}
                <div className="flex gap-4 items-center min-w-0">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-crema-tint shrink-0 border border-crema-dark/40">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h3 className="font-sans font-bold text-base text-tierra truncate">
                      <Link
                        href={`/producto/${product.slug}`}
                        className="hover:text-terracotta transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-tierra-muted">
                      {selectedColor ? (
                        <span className="font-semibold text-terracotta">
                          Color: {selectedColor} •{" "}
                        </span>
                      ) : null}
                      {product.sizeLabel}
                    </p>
                    <p className="text-xs font-bold text-terracotta">
                      {formatPrice(product.price)} c/u
                    </p>
                  </div>
                </div>

                {/* Controles de Cantidad y Total de Fila */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-crema-tint">
                  <div className="flex items-center border border-crema-dark rounded-full bg-crema-tint/50 p-0.5">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1, selectedColor)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-tierra hover:bg-crema-dark/60 transition-colors cursor-pointer"
                      aria-label="Restar una unidad"
                    >
                      <Minus size={12} weight="bold" />
                    </button>
                    <span className="w-9 text-center text-xs font-bold text-tierra select-none">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1, selectedColor)}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-tierra hover:bg-crema-dark/60 transition-colors cursor-pointer"
                      aria-label="Sumar una unidad"
                    >
                      <Plus size={12} weight="bold" />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="font-extrabold text-base text-tierra font-sans block">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(product.id, selectedColor)}
                    className="text-tierra-light hover:text-red-700 p-2 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar producto"
                    aria-label={`Eliminar ${product.name}`}
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 text-xs font-bold text-salvia-dark hover:text-terracotta transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Seguir agregando macetas al carrito</span>
              </Link>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-6 sticky top-24">
              <h2 className="font-sans font-bold text-lg text-tierra border-b border-crema-dark/60 pb-3">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-tierra-muted">
                  <span>Subtotal de piezas</span>
                  <span className="font-bold text-tierra">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-tierra-muted">
                  <span>Envío</span>
                  <span className="text-xs text-salvia-dark font-medium">
                    A convenir por WhatsApp
                  </span>
                </div>

                <div className="pt-3 border-t border-crema-dark/60 flex justify-between items-baseline">
                  <span className="font-bold text-tierra text-base">Total Estimado</span>
                  <span className="font-extrabold text-2xl text-terracotta font-sans">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Botón de Checkout */}
              <div className="space-y-3 pt-2">
                <Button
                  href="/checkout"
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                  leftIcon={<WhatsappLogo size={20} weight="fill" />}
                  rightIcon={<ArrowRight size={18} weight="bold" />}
                >
                  Continuar al Checkout
                </Button>

                <p className="text-[11px] text-tierra-light text-center leading-relaxed">
                  Podrás ingresar tus datos de entrega en el siguiente paso para
                  generar el mensaje de WhatsApp estructurado.
                </p>
              </div>

              {/* Garantía y Cuidados */}
              <div className="pt-4 border-t border-crema-dark/50 space-y-3 text-xs text-salvia-dark">
                <div className="flex items-start gap-2">
                  <ShieldCheck size={18} weight="duotone" className="shrink-0 text-salvia mt-0.5" />
                  <span>Embalaje anti-impacto con materiales ecológicos.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Plant size={18} weight="duotone" className="shrink-0 text-salvia mt-0.5" />
                  <span>Incluye guía impresa de cuidados botánicos con cada maceta.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
