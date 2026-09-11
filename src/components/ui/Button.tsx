import React, { ButtonHTMLAttributes } from "react";
import Link from "next/link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  isLoading,
  leftIcon,
  rightIcon,
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium whitespace-nowrap transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-full";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5 min-h-[36px]",
    md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
    lg: "text-base px-6 py-3.5 gap-2.5 min-h-[50px] font-semibold tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-terracotta text-white shadow-sm hover:bg-terracotta-dark focus-visible:ring-terracotta active:scale-[0.97]",
    secondary:
      "bg-salvia text-white shadow-sm hover:bg-salvia-dark focus-visible:ring-salvia active:scale-[0.97]",
    outline:
      "border-1.5 border-terracotta text-terracotta bg-transparent hover:bg-terracotta-light/60 focus-visible:ring-terracotta active:scale-[0.97]",
    whatsapp:
      "bg-[#25D366] text-[#0b3317] font-semibold shadow-sm hover:bg-[#20ba59] focus-visible:ring-[#25D366] active:scale-[0.97]",
    ghost:
      "bg-transparent text-tierra hover:bg-crema-tint/80 focus-visible:ring-terracotta active:scale-[0.97]",
  };

  const widthStyle = fullWidth ? "w-full" : "w-auto";
  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  const content = (
    <>
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          role="button"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses} role="button">
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
