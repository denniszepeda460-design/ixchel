"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, siteConfig } from "@/config/site";
import {
  X,
  Plus,
  Minus,
  Trash,
  ShoppingBag,
  WhatsappLogo,
  ArrowRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const pathname = usePathname();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close automatically on route change
  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop con desenfoque suave */}
      <div
        className="fixed inset-0 bg-tierra/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel lateral del carrito */}
      <div
        ref={drawerRef}
        className="relative w-full max-w-md bg-crema h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 ease-out border-l border-crema-dark"
      >
        {/* Cabecera */}
        <div className="p-5 border-b border-crema-dark bg-blanco-artesanal/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} className="text-terracotta" weight="duotone" />
            <h2
              id="cart-drawer-title"
              className="font-sans font-bold text-lg text-tierra"
            >
              Tu Carrito
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-terracotta/10 text-terracotta">
              {totalItems} {totalItems === 1 ? "pieza" : "piezas"}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 text-tierra-muted hover:text-tierra hover:bg-crema-tint rounded-full transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista de productos o Estado vacío */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-crema-tint flex items-center justify-center text-terracotta/60">
                <ShoppingBag size={38} weight="duotone" />
              </div>
              <div className="space-y-1">
                <p className="font-sans font-bold text-lg text-tierra">
                  Tu carrito está esperando por vida verde
                </p>
                <p className="text-xs text-tierra-muted max-w-xs leading-relaxed">
                  Cada maceta que elijas está modelada con amor y lista para
                  acompañar tus plantas favoritas.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={closeCart}
                href="/catalogo"
              >
                Ver Catálogo de Macetas
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ product, quantity, selectedColor }) => (
                <div
                  key={`${product.id}-${selectedColor || "default"}`}
                  className="flex gap-3.5 p-3.5 rounded-xl bg-blanco-artesanal border border-crema-dark/60 shadow-2xs"
                >
                  {/* Miniatura */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-crema-tint">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Datos del producto */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <h4 className="font-sans font-bold text-sm text-tierra truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-tierra-light">
                          {selectedColor ? (
                            <span className="font-semibold text-terracotta">
                              Color: {selectedColor} •{" "}
                            </span>
                          ) : null}
                          {product.sizeLabel}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(product.id, selectedColor)}
                        className="text-tierra-light hover:text-red-700 p-1 transition-colors cursor-pointer"
                        title="Eliminar del carrito"
                        aria-label={`Eliminar ${product.name}`}
                      >
                        <Trash size={16} />
                      </button>
                    </div>

                    {/* Controles de cantidad y precio */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-crema-tint">
                      <div className="flex items-center border border-crema-dark rounded-full bg-crema-tint/50">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1, selectedColor)}
                          className="w-7 h-7 flex items-center justify-center text-tierra hover:bg-crema-dark/60 rounded-l-full cursor-pointer transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={12} weight="bold" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-tierra select-none">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1, selectedColor)}
                          className="w-7 h-7 flex items-center justify-center text-tierra hover:bg-crema-dark/60 rounded-r-full cursor-pointer transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={12} weight="bold" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-terracotta">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer del Carrito */}
        {items.length > 0 && (
          <div className="p-5 border-t border-crema-dark bg-blanco-artesanal/95 space-y-3">
            {/* Garantía de empaque artesanal */}
            <div className="flex items-center gap-2 text-[11px] text-salvia-dark bg-salvia/10 px-3 py-1.5 rounded-lg">
              <ShieldCheck size={18} weight="duotone" className="shrink-0 text-salvia" />
              <span>Empaque protector antiroturas para cerámica garantizado.</span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-base font-sans">
              <span className="text-tierra-muted font-medium">Subtotal estimado</span>
              <span className="text-2xl font-bold text-terracotta">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="text-[11px] text-tierra-light leading-normal">
              El costo de envío local o departamental se confirma directamente al coordinar por WhatsApp según tu zona.
            </p>

            {/* Acciones principales */}
            <div className="space-y-2 pt-1">
              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                href="/checkout"
                onClick={closeCart}
                leftIcon={<WhatsappLogo size={20} weight="fill" />}
                rightIcon={<ArrowRight size={18} weight="bold" />}
              >
                Completar Pedido por WhatsApp
              </Button>

              <div className="text-center">
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="text-xs text-tierra-muted hover:text-terracotta font-medium underline underline-offset-4"
                >
                  Ver resumen detallado del carrito
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
