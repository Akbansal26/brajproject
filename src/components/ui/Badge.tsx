import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "saffron" | "gold" | "indigo" | "cream";
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "saffron",
  dot = false,
  children,
  className = "",
  ...props
}) => {
  const variantStyles = {
    saffron: "bg-braj-saffron-100 text-braj-saffron-800 border-braj-saffron-300",
    gold: "bg-braj-gold-100 text-braj-gold-900 border-braj-gold-300",
    indigo: "bg-braj-indigo-100 text-braj-indigo-900 border-braj-indigo-200",
    cream: "bg-braj-cream-200 text-braj-cream-900 border-braj-cream-300",
  };

  const dotColors = {
    saffron: "bg-braj-saffron-600",
    gold: "bg-braj-gold-600",
    indigo: "bg-braj-indigo-700",
    cream: "bg-braj-cream-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
