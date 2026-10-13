"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Compass, Loader2 } from "lucide-react";
import { TempleGateGuide } from "@/data/gates";

export interface TempleGateMapProps {
  guide: TempleGateGuide;
  selectedGateId: string | null;
  onSelectGate: (gateId: string) => void;
  tileUrl?: string;
  attribution?: string;
  className?: string;
}

const DynamicTempleGateMap = dynamic(
  () => import("./TempleGateMapInner"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-3xl border border-braj-cream-300 bg-white p-8 shadow-xs flex flex-col items-center justify-center space-y-4 min-h-[380px] animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-braj-cream-100 border border-braj-cream-200 flex items-center justify-center text-braj-gold-600">
          <Compass className="w-7 h-7 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <h4 className="font-bold text-sm text-braj-indigo-950 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-braj-saffron-600" />
            <span>Initializing Leaflet Map Engine...</span>
          </h4>
          <p className="text-xs text-braj-cream-700">
            Rendering OpenStreetMap satellite coordinates and verified gate markers.
          </p>
        </div>
      </div>
    ),
  }
);

export function TempleGateMap(props: TempleGateMapProps) {
  return <DynamicTempleGateMap {...props} />;
}
