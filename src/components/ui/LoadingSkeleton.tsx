import React from "react";

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card" | "destination";
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "rectangular",
  width,
  height,
  count = 1,
  className = "",
  style,
  ...props
}) => {
  const baseShimmer = "animate-shimmer rounded-lg border border-braj-cream-200/60";

  const renderSingle = (index: number) => {
    if (variant === "text") {
      return (
        <div
          key={index}
          className={`${baseShimmer} h-4 w-full rounded my-1.5 ${className}`}
          style={{ width, height, ...style }}
          {...props}
        />
      );
    }

    if (variant === "circular") {
      return (
        <div
          key={index}
          className={`${baseShimmer} rounded-full shrink-0 ${className}`}
          style={{ width: width || "40px", height: height || "40px", ...style }}
          {...props}
        />
      );
    }

    if (variant === "card") {
      return (
        <div
          key={index}
          className={`p-5 rounded-xl border border-braj-cream-300 bg-white space-y-4 ${className}`}
          style={{ width, height, ...style }}
          {...props}
        >
          <div className="flex items-center gap-3">
            <div className={`${baseShimmer} w-10 h-10 rounded-lg shrink-0`} />
            <div className="space-y-2 flex-1">
              <div className={`${baseShimmer} h-4 w-2/3 rounded`} />
              <div className={`${baseShimmer} h-3 w-1/3 rounded`} />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className={`${baseShimmer} h-3.5 w-full rounded`} />
            <div className={`${baseShimmer} h-3.5 w-5/6 rounded`} />
          </div>
          <div className="pt-2 flex justify-between items-center">
            <div className={`${baseShimmer} h-5 w-24 rounded-full`} />
            <div className={`${baseShimmer} h-8 w-20 rounded-lg`} />
          </div>
        </div>
      );
    }

    if (variant === "destination") {
      return (
        <div
          key={index}
          className={`rounded-xl border border-braj-cream-300 bg-white overflow-hidden space-y-4 ${className}`}
          style={{ width, height, ...style }}
          {...props}
        >
          <div className={`${baseShimmer} h-44 w-full rounded-none`} />
          <div className="p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div className={`${baseShimmer} h-5 w-1/3 rounded`} />
              <div className={`${baseShimmer} h-5 w-16 rounded-full`} />
            </div>
            <div className={`${baseShimmer} h-3.5 w-full rounded`} />
            <div className={`${baseShimmer} h-3.5 w-3/4 rounded`} />
            <div className="pt-3 border-t border-braj-cream-200 flex justify-between items-center">
              <div className={`${baseShimmer} h-3 w-32 rounded`} />
              <div className={`${baseShimmer} h-7 w-20 rounded-lg`} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        className={`${baseShimmer} ${className}`}
        style={{ width: width || "100%", height: height || "100px", ...style }}
        {...props}
      />
    );
  };

  if (count > 1) {
    return (
      <div className="space-y-3 w-full">
        {Array.from({ length: count }).map((_, i) => renderSingle(i))}
      </div>
    );
  }

  return renderSingle(0);
};
