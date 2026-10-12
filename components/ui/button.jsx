"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary", // "primary" | "secondary" | "accent" | "outline" | "danger" | "ghost"
  size = "md", // "sm" | "md" | "lg"
  loading = false,
  disabled = false,
  icon: Icon,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed shadow-xs";

  // Size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-[11px] gap-1.5",
    md: "px-4 py-2 text-xs gap-2",
    lg: "px-5 py-2.5 text-sm gap-2.5",
  };

  // Base styling per variant
  const variantClasses = {
    primary: "text-white shadow-sm hover:opacity-95 active:scale-[0.99]",
    secondary: "text-white shadow-sm hover:opacity-95 active:scale-[0.99]",
    accent: "text-white shadow-sm hover:opacity-95 active:scale-[0.99]",
    outline: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-none",
  };

  // Inline styles to tie directly into CSS variables defined in app/layout.jsx
  const dynamicStyles = {
    primary: { backgroundColor: "var(--brand-primary)" },
    secondary: { backgroundColor: "var(--brand-secondary)" },
    accent: { backgroundColor: "var(--brand-accent)" },
  };

  const style = dynamicStyles[variant] || {};

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={style}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-3.5 h-3.5 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}