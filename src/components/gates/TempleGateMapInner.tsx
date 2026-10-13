"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  Navigation,
  ExternalLink,
  RotateCcw,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Footprints,
  Accessibility,
  Info,
} from "lucide-react";
import { GateRecord, TempleGateGuide, canEnterPublicly } from "@/data/gates";
import { Button } from "@/components/ui/Button";

// Accessible Custom DivIcons
function createGateIcon(gate: GateRecord, isSelected: boolean) {
  const isEntry = canEnterPublicly(gate);
  const isExit = gate.gateType === "exit_only";
  const isRestricted =
    gate.gateType === "restricted" || gate.gateType === "emergency_exit";

  const bgColor = isEntry
    ? "#059669" // Emerald for entry
    : isExit
    ? "#e25211" // Braj saffron for exits
    : isRestricted
    ? "#4c1d95" // Deep purple for restricted/emergency
    : "#475569"; // Slate for neutral

  const shortLabel = gate.gateNumber.replace(/Gate\s*/i, "G");

  const html = `
    <div class="relative flex items-center justify-center select-none" style="width: 40px; height: 40px;" title="${gate.gateNumber}: ${gate.gateName}">
      ${
        isSelected
          ? `<div class="absolute -inset-2 rounded-full bg-amber-400 opacity-60 animate-ping pointer-events-none"></div>`
          : ""
      }
      <div style="background-color: ${bgColor};" class="relative w-8 h-8 rounded-full border-2 ${
        isSelected
          ? "border-amber-300 ring-4 ring-amber-400/50 scale-125 z-30"
          : "border-white hover:scale-110 shadow-md z-10"
      } flex items-center justify-center text-white text-[11px] font-black transition-all">
        <span>${shortLabel}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "braj-gate-leaflet-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

// Controller component to manage Leaflet map views
function MapController({
  selectedGate,
  allCoordinates,
  resetTrigger,
}: {
  selectedGate: GateRecord | null;
  allCoordinates: [number, number][];
  resetTrigger: number;
}) {
  const map = useMap();

  // Pan to selected gate when selection changes
  useEffect(() => {
    if (selectedGate?.coordinates?.verified) {
      map.flyTo(
        [selectedGate.coordinates.lat, selectedGate.coordinates.lng],
        18,
        {
          duration: 1.0,
        }
      );
    }
  }, [selectedGate, map]);

  // Fit bounds when temple changes or reset button clicked
  useEffect(() => {
    if (allCoordinates.length > 0) {
      if (allCoordinates.length === 1) {
        map.setView(allCoordinates[0], 17);
      } else {
        const bounds = L.latLngBounds(allCoordinates);
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 18,
        });
      }
    }
  }, [allCoordinates, resetTrigger, map]);

  return null;
}

export interface TempleGateMapProps {
  guide: TempleGateGuide;
  selectedGateId: string | null;
  onSelectGate: (gateId: string) => void;
  tileUrl?: string;
  attribution?: string;
  className?: string;
}

export default function TempleGateMapInner({
  guide,
  selectedGateId,
  onSelectGate,
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
  className = "",
}: TempleGateMapProps) {
  const [resetCount, setResetCount] = useState(0);

  // Filter ONLY gates with verified GPS coordinates (NO GUESSING)
  const verifiedGates = useMemo(() => {
    return guide.gates.filter(
      (g) =>
        g.coordinates?.verified === true &&
        typeof g.coordinates.lat === "number" &&
        typeof g.coordinates.lng === "number"
    );
  }, [guide]);

  // Coordinates array for Leaflet bounds calculation
  const allCoordinates = useMemo<[number, number][]>(() => {
    return verifiedGates.map((g) => [g.coordinates!.lat, g.coordinates!.lng]);
  }, [verifiedGates]);

  // Selected gate
  const selectedGate = useMemo(() => {
    if (selectedGateId) {
      return guide.gates.find((g) => g.id === selectedGateId) || null;
    }
    return verifiedGates[0] || null;
  }, [selectedGateId, guide, verifiedGates]);

  // Center coordinate default
  const defaultCenter = useMemo<[number, number]>(() => {
    if (allCoordinates.length > 0) {
      return allCoordinates[0];
    }
    return [27.5794, 77.7029]; // Default Vrindavan / Mathura center
  }, [allCoordinates]);

  const unplottedCount = guide.gates.length - verifiedGates.length;

  // Empty State if temple has ZERO verified coordinates (e.g. Radha Kund open ghats)
  if (verifiedGates.length === 0) {
    return (
      <div
        className={`bg-white rounded-3xl border border-braj-cream-300 p-8 shadow-xs text-center flex flex-col items-center justify-center space-y-4 min-h-[380px] ${className}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-braj-cream-100 border border-braj-cream-300 flex items-center justify-center text-braj-gold-600">
          <Compass className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-1.5">
          <h4 className="text-lg font-bold text-braj-indigo-950">
            GPS Gate Coordinates Awaiting Field Audit
          </h4>
          <p className="text-xs sm:text-sm text-braj-cream-800 leading-relaxed">
            All access points at <strong>{guide.templeName}</strong> are currently undergoing on-ground GPS demarcation. To preserve data integrity, approximate or guessed coordinates are never placed on the map.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-braj-cream-50 border border-braj-cream-200 text-xs text-braj-indigo-900 font-medium">
          Source: {guide.officialAuditSource}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border border-braj-cream-300 bg-white shadow-xs flex flex-col ${className}`}
    >
      {/* Top Map Action Bar */}
      <div className="p-4 bg-white border-b border-braj-cream-200 flex items-center justify-between flex-wrap gap-2 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-braj-indigo-950">
            Live OpenStreetMap GPS Radar
          </span>
          <span className="text-[11px] text-braj-cream-700 bg-braj-cream-100 px-2 py-0.5 rounded-md font-medium">
            {verifiedGates.length} of {guide.gates.length} Gates Plotted
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setResetCount((c) => c + 1)}
            className="text-xs"
            title="Reset map view to fit all gates"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1 text-braj-gold-600" />
            <span>Reset View</span>
          </Button>

          {selectedGate?.coordinates?.verified && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedGate.coordinates.lat},${selectedGate.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-braj-indigo-900 text-white text-xs font-semibold hover:bg-braj-indigo-800 transition-colors shadow-2xs"
            >
              <Navigation className="w-3.5 h-3.5 text-braj-gold-400" />
              <span>Directions</span>
              <ExternalLink className="w-3 h-3 ml-0.5 text-braj-gold-300" />
            </a>
          )}
        </div>
      </div>

      {/* Map View Container */}
      <div className="relative h-80 sm:h-96 lg:h-[420px] w-full z-0">
        <MapContainer
          center={defaultCenter}
          zoom={17}
          scrollWheelZoom={true}
          className="w-full h-full"
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url={tileUrl} attribution={attribution} maxZoom={19} />

          <MapController
            selectedGate={selectedGate}
            allCoordinates={allCoordinates}
            resetTrigger={resetCount}
          />

          {verifiedGates.map((gate) => {
            const isSelected = selectedGate?.id === gate.id;
            const icon = createGateIcon(gate, isSelected);
            const isEntry = canEnterPublicly(gate);
            const isExit = gate.gateType === "exit_only";

            return (
              <Marker
                key={gate.id}
                position={[gate.coordinates!.lat, gate.coordinates!.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => {
                    onSelectGate(gate.id);
                  },
                }}
              >
                <Popup className="braj-leaflet-popup">
                  <div className="p-1 space-y-2 text-xs max-w-[260px]">
                    <div className="flex items-center justify-between gap-1 border-b border-braj-cream-200 pb-1.5">
                      <span className="font-extrabold text-braj-indigo-950 text-sm">
                        {gate.gateNumber}
                      </span>
                      {isEntry ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Public Entrance
                        </span>
                      ) : isExit ? (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          Exit Only
                        </span>
                      ) : (
                        <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                          Restricted Pass
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-braj-indigo-900 leading-snug">
                      {gate.gateName}
                    </div>

                    <p className="text-[11px] text-braj-cream-800 leading-tight">
                      {gate.bestFor}
                    </p>

                    {/* Safety Alert for Exits */}
                    {isExit && (
                      <div className="p-1.5 rounded bg-amber-50 text-[10px] text-amber-900 flex items-start gap-1 font-medium">
                        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                        <span>One-Way Exit Flow: Do not attempt to enter!</span>
                      </div>
                    )}

                    {/* Verified Entrance Note */}
                    {isEntry && (
                      <div className="p-1.5 rounded bg-emerald-50 text-[10px] text-emerald-900 flex items-start gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Authorized for general devotee entrance.</span>
                      </div>
                    )}

                    {/* Coordinates & Footwear */}
                    <div className="text-[10px] text-braj-cream-700 space-y-0.5 pt-1 border-t border-braj-cream-200">
                      <div className="flex items-center gap-1">
                        <Footprints className="w-3 h-3 text-braj-gold-600 shrink-0" />
                        <span className="truncate">{gate.footwearProximity}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Accessibility className="w-3 h-3 text-braj-indigo-600 shrink-0" />
                        <span className="truncate">
                          Ramp: {gate.accessibility.wheelchairRamp ? "Yes" : "No"} • Step-Free: {gate.accessibility.stepFree ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    {/* Directions link */}
                    <div className="pt-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${gate.coordinates!.lat},${gate.coordinates!.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-braj-indigo-900 text-white text-[11px] font-semibold hover:bg-braj-indigo-800 transition-colors"
                      >
                        <Navigation className="w-3 h-3 text-braj-gold-400" />
                        <span>Get Directions</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Info Strip */}
      <div className="p-3 bg-braj-cream-50 border-t border-braj-cream-200 flex items-center justify-between text-xs text-braj-cream-700 flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
          <span>
            Click markers to open gate logistics. Click gate cards below to fly to matching map pin.
          </span>
        </div>
        {unplottedCount > 0 && (
          <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-medium">
            {unplottedCount} gate(s) pending GPS audit (unplotted)
          </span>
        )}
      </div>
    </div>
  );
}
