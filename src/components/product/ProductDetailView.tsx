"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, products } from "@/data/products";
import { formatPrice, siteConfig } from "@/config/site";
import { useCartStore } from "@/store/cartStore";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/ProductCard";
import {
  Plus,
  Minus,
  ShoppingBag,
  WhatsappLogo,
  Check,
  Sun,
  Drop,
  PottedPlant,
  ShieldCheck,
  CaretRight,
  Sparkle,
} from "@phosphor-icons/react";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const availableColorList = product.colors && product.colors.length > 0
    ? product.colors
    : ["Blanco Base", "Café", "Rojo", "Azul"];
  const [selectedColor, setSelectedColor] = useState<string>(availableColorList[0] || "Blanco Base");
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const whatsappInquiryMessage = `¡Hola Ixchel! 🌿 Estoy interesado en la *${product.name}* (Color: ${selectedColor}, ${formatPrice(product.price)}). ¿Tienen disponibilidad inmediata para entrega?`;

  return (
    <div className="min-h-screen bg-crema pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav
          className="flex items-center gap-2 text-xs text-tierra-muted"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-terracotta transition-colors">
            Inicio
          </Link>
          <CaretRight size={12} />
          <Link href="/catalogo" className="hover:text-terracotta transition-colors">
            Catálogo
          </Link>
          <CaretRight size={12} />
          <span className="text-tierra font-semibold truncate">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Contenido Principal de Producto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Columna Izquierda: Galería de Imágenes */}
          <div className="lg:col-span-6 space-y-4">
            {/* Imagen Principal */}
            <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-blanco-artesanal border border-crema-dark shadow-md">
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} vista principal`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="terracotta" className="bg-white/95 backdrop-blur-sm shadow-xs">
                    {product.badge}
                  </Badge>
                </div>
              )}
            </div>

            {/* Miniaturas de galería */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImage === idx
                        ? "border-terracotta scale-105 shadow-sm"
                        : "border-crema-dark opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Ver foto ${idx + 1} de ${product.name}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} miniatura ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Ficha rápida del proceso artesanal */}
            <div className="p-5 rounded-2xl bg-blanco-artesanal border border-crema-dark/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-salvia-dark uppercase tracking-wider">
                <Sparkle size={15} weight="fill" className="text-luna" />
                <span>Proceso en Nuestro Estudio</span>
              </div>
              <p className="text-xs text-tierra-muted leading-relaxed font-sans">
                {product.craftProcess}
              </p>
            </div>
          </div>

          {/* Columna Derecha: Información de Compra y Cuidados */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="salvia">{product.finishLabel}</Badge>
                <Badge variant="outline">{product.sizeLabel}</Badge>
              </div>

              <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-tierra tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm font-medium text-salvia-dark mt-1 font-sans">
                {product.subtitle}
              </p>

              {/* Precio */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-terracotta font-sans">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-tierra-light">
                  Precio unitario artesanal
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="prose prose-sm text-tierra-muted leading-relaxed font-sans border-t border-b border-crema-dark/60 py-4">
              <p>{product.description}</p>
            </div>

            {/* Dimensiones y Drenaje */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-blanco-artesanal border border-crema-dark/50 text-center">
                <span className="text-[10px] uppercase font-bold text-tierra-light block">
                  Altura
                </span>
                <span className="text-sm font-bold text-tierra">
                  {product.dimensions.height}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blanco-artesanal border border-crema-dark/50 text-center">
                <span className="text-[10px] uppercase font-bold text-tierra-light block">
                  Diámetro
                </span>
                <span className="text-sm font-bold text-tierra">
                  {product.dimensions.diameter}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blanco-artesanal border border-crema-dark/50 text-center">
                <span className="text-[10px] uppercase font-bold text-tierra-light block">
                  Drenaje
                </span>
                <span className="text-sm font-bold text-salvia-dark">
                  Incluido
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blanco-artesanal border border-crema-dark/50 text-center">
                <span className="text-[10px] uppercase font-bold text-tierra-light block">
                  Plato
                </span>
                <span className="text-sm font-bold text-tierra">
                  {product.includesSaucer ? "A juego" : "Opcional"}
                </span>
              </div>
            </div>

            {/* Selector fijo: Ediciones de Color */}
            <div className="p-4 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-tierra font-sans uppercase tracking-wider">
                  Ediciones de Color
                </span>
                <span className="text-xs font-semibold text-terracotta">
                  Seleccionado: {selectedColor}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="flex-1 bg-crema-tint border border-crema-dark rounded-xl px-3.5 py-2.5 text-xs font-bold text-tierra focus:outline-none focus:ring-2 focus:ring-terracotta cursor-pointer"
                  aria-label="Seleccionar color de la maceta"
                >
                  {availableColorList.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5">
                  {[
                    { name: "Blanco Base", bg: "bg-[#ede4d3] border border-[#cbbda8]" },
                    { name: "Café", bg: "bg-[#784421]" },
                    { name: "Rojo", bg: "bg-[#a63d2f]" },
                    { name: "Azul", bg: "bg-[#2b547e]" },
                  ]
                    .filter((c) => availableColorList.includes(c.name))
                    .map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full ${c.bg} transition-all cursor-pointer border-2 ${
                          selectedColor === c.name
                            ? "border-tierra scale-110 shadow-xs ring-2 ring-terracotta/40"
                            : "border-transparent opacity-75 hover:opacity-100"
                        }`}
                        title={`Elegir color ${c.name}`}
                        aria-label={`Color ${c.name}`}
                      />
                    ))}
                </div>
              </div>
            </div>

            {/* Selector de Cantidad y Botón de Compra */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                {/* Control de cantidad */}
                <div className="flex items-center border border-crema-dark rounded-full bg-blanco-artesanal p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-tierra hover:bg-crema-tint transition-colors cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={14} weight="bold" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-tierra select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-full text-tierra hover:bg-crema-tint transition-colors cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={14} weight="bold" />
                  </button>
                </div>

                {/* Botón Añadir al Carrito */}
                <div className="flex-1">
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    size="lg"
                    fullWidth
                    leftIcon={
                      justAdded ? (
                        <Check size={20} weight="bold" />
                      ) : (
                        <ShoppingBag size={20} weight="bold" />
                      )
                    }
                  >
                    {justAdded
                      ? "¡Agregada al carrito!"
                      : `Agregar al Carrito • ${formatPrice(product.price * quantity)}`}
                  </Button>
                </div>
              </div>

              {/* Botón secundario: Consulta por WhatsApp */}
              <Button
                href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
                  whatsappInquiryMessage
                )}`}
                isExternal
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />}
              >
                Hacer una consulta sobre esta pieza por WhatsApp
              </Button>
            </div>

            {/* Garantía de embalaje seguro */}
            <div className="p-4 rounded-xl bg-salvia/10 border border-salvia/20 flex items-start gap-3 text-xs text-salvia-dark">
              <ShieldCheck size={22} weight="duotone" className="shrink-0 text-salvia mt-0.5" />
              <div>
                <strong className="block font-bold">Garantía de Entrega Intacta:</strong>
                Empacamos cada maceta con viruta amortiguadora y cámara de aire. Si alguna pieza sufre durante el traslado, te enviamos un reemplazo sin costo.
              </div>
            </div>

            {/* SECCIÓN: GUÍA DE CUIDADOS BOTÁNICOS */}
            <div className="p-6 rounded-2xl bg-blanco-artesanal border border-crema-dark/70 shadow-xs space-y-4 mt-6">
              <div className="flex items-center gap-2 border-b border-crema-dark/50 pb-3">
                <PottedPlant size={22} weight="duotone" className="text-terracotta" />
                <h3 className="font-sans font-bold text-base text-tierra">
                  Guía de Cuidados para tu Planta
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <PottedPlant size={16} weight="duotone" className="text-salvia shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-tierra block">Especies recomendadas:</strong>
                    <span className="text-tierra-muted">
                      {product.plantCare.recommendedSpecies}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Sun size={16} weight="duotone" className="text-luna shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-tierra block">Iluminación ideal:</strong>
                    <span className="text-tierra-muted">{product.plantCare.light}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Drop size={16} weight="duotone" className="text-salvia shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-tierra block">Pauta de riego:</strong>
                    <span className="text-tierra-muted">{product.plantCare.watering}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-crema-tint/60 text-tierra-muted italic leading-relaxed">
                  💡 <strong>Consejo de nuestro estudio:</strong> {product.plantCare.careTip}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Piezas Relacionadas */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-crema-dark/60">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-tierra mb-8">
              Otras piezas que te pueden encantar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
