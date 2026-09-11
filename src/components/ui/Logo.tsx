import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon-only" | "full";
  size?: "sm" | "md" | "lg";
  tone?: "normal" | "inverted";
  showTagline?: boolean;
  className?: string;
}

export default function Logo({
  variant = "horizontal",
  size = "md",
  tone = "normal",
  showTagline = false,
  className = "",
}: LogoProps) {
  const isDark = tone === "inverted";

  const dimensions = {
    sm: {
      iconW: 24,
      iconH: 28,
      textW: 72,
      textH: 21,
      fullW: 90,
      fullH: 95,
    },
    md: {
      iconW: 32,
      iconH: 38,
      textW: 94,
      textH: 28,
      fullW: 120,
      fullH: 128,
    },
    lg: {
      iconW: 42,
      iconH: 50,
      textW: 124,
      textH: 37,
      fullW: 160,
      fullH: 170,
    },
  };

  const dim = dimensions[size];

  const iconSrc = isDark
    ? "/images/logo-solo-icono-negativo-trans.png"
    : "/images/logo-solo-icono-trans.png";

  const letrasSrc = isDark
    ? "/images/logo-letras-negativo-trans.png"
    : "/images/logo-letras-trans.png";

  const fullSrc = isDark
    ? "/images/logo-negativo-trans.png"
    : "/images/logo-principal-trans.png";

  if (variant === "icon-only") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg ${className}`}
        aria-label="Ir a la página de inicio de Ixchel"
      >
        <Image
          src={iconSrc}
          alt="Ixchel logo"
          width={dim.iconW}
          height={dim.iconH}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </Link>
    );
  }

  if (variant === "full") {
    return (
      <Link
        href="/"
        className={`inline-flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg ${className}`}
        aria-label="Ixchel - Macetas artesanales"
      >
        <Image
          src={fullSrc}
          alt="Ixchel logo artesanal"
          width={dim.fullW}
          height={dim.fullH}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
        {showTagline && (
          <span
            className={`text-[11px] font-sans tracking-wide leading-tight mt-1 ${
              isDark ? "text-crema-tint/80" : "text-tierra-muted"
            }`}
          >
            macetas artesanales
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg ${
        variant === "vertical" ? "flex-col text-center" : "flex-row"
      } ${className}`}
      aria-label="Ixchel - Macetas artesanales"
    >
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src={iconSrc}
          alt="Ixchel logo"
          width={dim.iconW}
          height={dim.iconH}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      <div className="flex flex-col text-left">
        <Image
          src={letrasSrc}
          alt="ixchel"
          width={dim.textW}
          height={dim.textH}
          className="object-contain"
          priority
        />
        {showTagline && (
          <span
            className={`text-[11px] font-sans tracking-wide leading-tight mt-0.5 ${
              isDark ? "text-crema-tint/80" : "text-tierra-muted"
            }`}
          >
            macetas artesanales
          </span>
        )}
      </div>
    </Link>
  );
}
