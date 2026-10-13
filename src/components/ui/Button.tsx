import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary:
        "bg-braj-saffron-600 hover:bg-braj-saffron-700 active:bg-braj-saffron-800 text-white shadow-xs hover:shadow-sm focus-visible:ring-braj-saffron-500 border border-braj-saffron-600",
      secondary:
        "bg-braj-indigo-900 hover:bg-braj-indigo-800 active:bg-braj-indigo-950 text-white border border-braj-gold-500/30 shadow-xs focus-visible:ring-braj-indigo-700",
      outline:
        "bg-white hover:bg-braj-cream-100 active:bg-braj-cream-200 text-braj-indigo-900 border border-braj-gold-500/50 hover:border-braj-gold-600 focus-visible:ring-braj-gold-500 shadow-2xs",
      ghost:
        "bg-transparent hover:bg-braj-cream-200 active:bg-braj-cream-300 text-braj-indigo-900 focus-visible:ring-braj-gold-400",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2 gap-2",
      lg: "text-base px-6 py-2.5 gap-2.5",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        )}
        {!loading && icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!loading && icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
