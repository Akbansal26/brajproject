import React from "react";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  status?: string;
  statusVariant?: "saffron" | "gold" | "indigo" | "cream" | "success" | "warning";
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  status,
  statusVariant = "saffron",
  actionHref,
  actionLabel = "Learn More",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-braj-cream-300 bg-white p-6 shadow-2xs hover:shadow-md hover:border-braj-gold-400/60 transition-all duration-300 flex flex-col justify-between ${className}`}
      {...props}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-xl bg-braj-saffron-50 text-braj-saffron-600 border border-braj-saffron-200 flex items-center justify-center shrink-0">
            {icon}
          </div>

          {status && (
            <StatusBadge variant={statusVariant} size="sm">
              {status}
            </StatusBadge>
          )}
        </div>

        <div>
          <h3 className="font-bold text-base sm:text-lg text-braj-indigo-950">
            {title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-braj-cream-800 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {actionHref && (
        <div className="pt-4 mt-4 border-t border-braj-cream-200">
          <a
            href={actionHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-500 rounded p-0.5"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};
