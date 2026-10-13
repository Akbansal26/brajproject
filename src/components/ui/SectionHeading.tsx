import React from "react";
import { StatusBadge } from "./StatusBadge";

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: string | React.ReactNode;
  badgeVariant?: "saffron" | "gold" | "indigo" | "cream";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = "saffron",
  title,
  subtitle,
  align = "center",
  action,
  className = "",
  ...props
}) => {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 ${className}`}
      {...props}
    >
      <div className={`flex flex-col max-w-3xl ${alignStyles[align]}`}>
        {badge && (
          <div className="mb-3">
            {typeof badge === "string" ? (
              <StatusBadge variant={badgeVariant} dot>
                {badge}
              </StatusBadge>
            ) : (
              badge
            )}
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-braj-indigo-950 tracking-tight leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-braj-cream-800 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className={`shrink-0 ${align === "center" ? "mx-auto sm:mx-0 mt-3 sm:mt-0" : ""}`}>
          {action}
        </div>
      )}
    </div>
  );
};
