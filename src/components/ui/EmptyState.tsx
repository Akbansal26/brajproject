import React from "react";
import { Compass } from "lucide-react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border border-dashed border-braj-gold-400/50 bg-white/70 p-8 sm:p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center ${className}`}
      {...props}
    >
      <div className="w-14 h-14 rounded-2xl bg-braj-cream-100 text-braj-saffron-600 border border-braj-gold-300/40 flex items-center justify-center mb-4 shadow-2xs">
        {icon || <Compass className="w-7 h-7 text-braj-gold-600" />}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-braj-indigo-950">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-braj-cream-800 max-w-md leading-relaxed">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
