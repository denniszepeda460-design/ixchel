"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, getDiscountPercentage } from "@/data/products";
import { formatPrice } from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import Badge from "@/components/ui/Badge";
import { ShoppingBag, Check, Gift } from "@phosphor-icons/react";
import { triggerCartAnimation } from "@/lib/cartAnimation";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const discount = getDiscountPercentage(product);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    triggerCartAnimation(e);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  return (
    <article
      className={`group flex flex-col bg-blanco-artesanal rounded-2xl border border-crema-dark/70 overflow-hidden shadow-[0_2px_12px_rgba(44,35,28,0.04)] hover:shadow-[0_8px_24px_rgba(191,105,46,0.12)] transition-all duration-300 ${className}`}
    >
      {/* Imagen del producto */}
      <Link
        href={`/producto/${product.slug}`}
        className="relative aspect-4/3 overflow-hidden bg-crema-tint/50 block focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <Image
          src={product.images[0]}
          alt={`${product.name} — pieza artesanal Ixchel`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Badges flotantes (Descuento, Promoción y Distintivo de Estudio) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.onSale && discount && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-terracotta text-white shadow-xs font-sans tracking-tight">
              -{discount}%
            </span>
          )}
          {product.isPromotion && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-salvia text-white shadow-xs font-sans tracking-tight">
              <Gift size={12} weight="bold" />
              <span>{product.promotionBadge || "Incluye Suculenta Gratis"}</span>
            </span>
          )}
          {product.badge && (
            <Badge variant="terracotta" className="bg-white/95 backdrop-blur-sm shadow-xs">
              {product.badge}
            </Badge>
          )}
        </div>
        {/* Etiqueta de tamaño */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded-md bg-tierra/70 text-crema backdrop-blur-xs">
            {product.dimensions.formattedSummary || product.dimensions.diameter}
          </span>
        </div>
      </Link>

      {/* Contenido de la tarjeta */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-sans text-salvia-dark font-medium tracking-wide uppercase">
              {product.finishLabel}
            </span>
            {product.includesSaucer && (
              <span className="text-[11px] text-tierra-light">Plato incluido</span>
            )}
          </div>

          <h3 className="font-sans font-bold text-lg text-tierra group-hover:text-terracotta transition-colors leading-snug">
            <Link href={`/producto/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-tierra-muted line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Precio y Acción */}
        <div className="pt-3 border-t border-crema-dark/50 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-tierra-light">
              Precio
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className={`${product.priceDisplay ? "text-sm" : "text-xl"} font-bold text-terracotta font-sans`}>
                {product.priceDisplay || formatPrice(product.price)}
              </span>
              {product.onSale && product.regularPrice && !product.priceDisplay && (
                <span className="text-xs text-tierra-light line-through font-normal">
                  {formatPrice(product.regularPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold select-none cursor-pointer transition-all duration-200 active:scale-95 ${
              justAdded
                ? "bg-salvia text-white"
                : "bg-terracotta text-white hover:bg-terracotta-dark"
            }`}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {justAdded ? (
              <>
                <Check size={14} weight="bold" />
                <span>Agregado</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} weight="bold" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
