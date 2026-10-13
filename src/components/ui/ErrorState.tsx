import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  loading?: boolean;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We were unable to load the sacred yatra details. Please check your network and try again.",
  onRetry,
  retryLabel = "Try Again",
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <div
      role="alert"
      className={`rounded-2xl border border-red-200 bg-red-50/50 p-6 sm:p-8 text-center max-w-lg mx-auto flex flex-col items-center justify-center ${className}`}
      {...props}
    >
      <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-red-950">
        {title}
      </h3>

      <p className="mt-1.5 text-xs sm:text-sm text-red-800/90 max-w-sm leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            loading={loading}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="border-red-300 text-red-900 hover:bg-red-100/60"
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
