import React from "react";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "saffron" | "gold" | "indigo" | "cream" | "success" | "warning" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
  pulseDot?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant = "saffron",
  size = "sm",
  dot = false,
  pulseDot = false,
  icon,
  children,
  className = "",
  ...props
}) => {
  const variantStyles = {
    saffron: "bg-braj-saffron-50 text-braj-saffron-800 border-braj-saffron-300",
    gold: "bg-braj-gold-50 text-braj-gold-900 border-braj-gold-300",
    indigo: "bg-braj-indigo-50 text-braj-indigo-900 border-braj-indigo-200",
    cream: "bg-braj-cream-100 text-braj-cream-900 border-braj-cream-300",
    success: "bg-emerald-50 text-emerald-800 border-emerald-300",
    warning: "bg-amber-50 text-amber-800 border-amber-300",
    neutral: "bg-slate-100 text-slate-800 border-slate-300",
  };

  const dotColors = {
    saffron: "bg-braj-saffron-600",
    gold: "bg-braj-gold-600",
    indigo: "bg-braj-indigo-700",
    cream: "bg-braj-cream-700",
    success: "bg-emerald-600",
    warning: "bg-amber-600",
    neutral: "bg-slate-500",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-sm px-3 py-1 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border select-none transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulseDot && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors[variant]}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors[variant]}`} />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
