import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "terracotta" | "salvia" | "luna" | "outline" | "neutral";
  className?: string;
}

export default function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    terracotta: "bg-terracotta/15 text-terracotta-dark border-terracotta/30",
    salvia: "bg-salvia/15 text-salvia-dark border-salvia/30",
    luna: "bg-luna/20 text-[#85590e] border-luna/40",
    outline: "border-crema-dark text-tierra bg-blanco-artesanal/60",
    neutral: "bg-crema-tint text-tierra-muted border-crema-dark/70",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide border uppercase select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
