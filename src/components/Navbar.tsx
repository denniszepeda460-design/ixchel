"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, List, X, WhatsappLogo } from "@phosphor-icons/react";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getTotalItems, checkExpiration } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    checkExpiration();
  }, [checkExpiration]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/encuentra-su-hogar", label: "Encuentra su Hogar" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-crema/90 backdrop-blur-md border-b border-crema-dark/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Logo de Marca */}
        <Logo size="md" showTagline={false} />

        {/* Enlaces Principales en Escritorio (Línea Única) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-sans font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-terracotta font-semibold"
                    : "text-tierra hover:text-terracotta"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Acciones del extremo derecho: WhatsApp Directo + Carrito */}
        <div className="flex items-center gap-3">
          {/* Botón rápido de consulta WhatsApp */}
          <a
            href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
              siteConfig.whatsapp.greeting
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/15 text-[#145a27] hover:bg-[#25D366]/25 transition-colors border border-[#25D366]/30 cursor-pointer"
            aria-label="Escribir por WhatsApp a Ixchel"
          >
            <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
            <span>Consultar</span>
          </a>

          {/* Botón de Carrito con Contador */}
          <button
            id="navbar-cart-button"
            onClick={openCart}
            className="relative p-2.5 text-tierra hover:text-terracotta hover:bg-crema-tint/80 rounded-full transition-all cursor-pointer active:scale-95"
            aria-label={`Abrir carrito con ${totalItems} productos`}
          >
            <ShoppingBag size={22} weight="duotone" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] px-1 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-75 duration-200">
                {totalItems}
              </span>
            )}
          </button>

          {/* Menú Hamburguesa en Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-tierra hover:text-terracotta rounded-lg cursor-pointer"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable en Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-crema border-b border-crema-dark px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-sans font-medium transition-colors ${
                    isActive
                      ? "bg-terracotta/10 text-terracotta font-semibold"
                      : "text-tierra hover:bg-crema-tint"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-crema-dark/60 flex flex-col gap-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
                siteConfig.whatsapp.greeting
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-semibold bg-[#25D366] text-[#0b3317] shadow-2xs"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>Escríbenos por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
