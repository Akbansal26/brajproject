"use client";

import React, { useState } from "react";
import { Clock, Landmark, ChevronRight, Sparkles } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Destination } from "@/types";

export interface DestinationCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  destination: Destination;
  imageUrl?: string;
  onSelect?: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  imageUrl,
  onSelect,
  className = "",
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  // High-contrast clean cultural fallback placeholder if image fails to load or is not provided
  const renderFallbackArt = () => (
    <div className="w-full h-44 bg-gradient-to-br from-braj-indigo-950 via-braj-indigo-900 to-braj-indigo-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-jaali-pattern opacity-15" />
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-braj-indigo-800/80 border border-braj-gold-400/40 text-braj-gold-400 flex items-center justify-center mx-auto mb-2 shadow-sm">
          <Landmark className="w-6 h-6 text-braj-gold-300" />
        </div>
        <span className="font-bold text-lg text-white block">
          {destination.name}
        </span>
        <span className="text-xs text-braj-saffron-300 font-medium">
          {destination.hindiName}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`group rounded-2xl border border-braj-cream-300 bg-white shadow-2xs hover:shadow-md hover:border-braj-gold-400/70 transition-all duration-300 flex flex-col overflow-hidden ${className}`}
      {...props}
    >
      {/* Top Image or Elegant Fallback Art */}
      <div className="relative w-full h-44 bg-braj-cream-100 overflow-hidden">
        {imageUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={`Authentic view of ${destination.name} (${destination.hindiName}) - ${destination.tagline}`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          renderFallbackArt()
        )}

        {/* Distance Badge Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <StatusBadge
            variant={destination.distanceFromMathuraKm === 0 ? "saffron" : "gold"}
            size="sm"
            className="backdrop-blur-md shadow-2xs"
          >
            {destination.distanceFromMathuraKm === 0
              ? "Center Dham"
              : `${destination.distanceFromMathuraKm} km from Mathura`}
          </StatusBadge>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-braj-indigo-950 group-hover:text-braj-saffron-700 transition-colors">
              {destination.name}
            </h3>
            <span className="text-xs font-semibold text-braj-saffron-600">
              {destination.hindiName}
            </span>
          </div>

          <p className="text-xs text-braj-cream-700 mt-0.5 line-clamp-1 font-medium">
            {destination.tagline}
          </p>

          <p className="text-xs sm:text-sm text-braj-cream-800 mt-2.5 leading-relaxed line-clamp-2">
            {destination.description}
          </p>

          {/* Key Temples */}
          <div className="mt-3.5 pt-3 border-t border-braj-cream-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-braj-saffron-600" />
              <span>Key Mandirs & Kunds</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {destination.keyTemples.slice(0, 3).map((temple) => (
                <span
                  key={temple}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-braj-cream-100 text-braj-indigo-900 border border-braj-cream-200"
                >
                  {temple}
                </span>
              ))}
              {destination.keyTemples.length > 3 && (
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-braj-cream-50 text-braj-cream-700">
                  +{destination.keyTemples.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar with Darshan Timings */}
        <div className="pt-3 border-t border-braj-cream-200 flex items-center justify-between text-xs text-braj-cream-800">
          <div className="flex items-center gap-1.5 truncate max-w-[220px]">
            <Clock className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
            <span className="truncate">{destination.darshanSummary}</span>
          </div>

          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(destination)}
              className="inline-flex items-center gap-1 font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-500 rounded p-0.5 shrink-0"
            >
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <a
              href={`#${destination.slug}`}
              className="inline-flex items-center gap-1 font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-500 rounded p-0.5 shrink-0"
            >
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
