"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  MapPin,
  Clock,
  Compass,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Phone,
  DoorOpen,
  Calendar,
  BookOpen,
} from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import { SACRED_DESTINATIONS } from "@/data/destinations";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      className="fixed inset-0 z-50 lg:hidden flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-braj-indigo-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-l border-braj-gold-500/30 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-braj-cream-200 flex items-center justify-between bg-braj-cream-50/70">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-braj-indigo-900 text-braj-gold-400 flex items-center justify-center border border-braj-gold-400/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-braj-indigo-950">BrajMitra AI</span>
                <span className="text-[10px] font-semibold px-1 py-0.5 rounded bg-braj-gold-100 text-braj-gold-800">
                  ब्रजमित्र
                </span>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-braj-cream-700 hover:text-braj-indigo-950 hover:bg-braj-cream-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="p-4 space-y-6 flex-1">
          {/* Main Links */}
          <div className="space-y-1">
            <Link
              href="/explore"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-braj-saffron-600" />
                <span>Explore Dhams</span>
              </div>
              <ChevronRight className="w-4 h-4 text-braj-cream-500" />
            </Link>

            <Link
              href="/temples"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-braj-gold-600" />
                <span>Temple Directory & Darshan</span>
              </div>
              <ChevronRight className="w-4 h-4 text-braj-cream-500" />
            </Link>

            <Link
              href="/gate-finder"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <DoorOpen className="w-4 h-4 text-braj-indigo-600" />
                <span>Temple Gate Finder</span>
              </div>
              <ChevronRight className="w-4 h-4 text-braj-cream-500" />
            </Link>

            <Link
              href="/planner"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-braj-saffron-600" />
                <span>Smart Trip Planner</span>
              </div>
              <ChevronRight className="w-4 h-4 text-braj-cream-500" />
            </Link>

            <Link
              href="/culture"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-braj-gold-600" />
                <span>Braj Sanskriti Heritage</span>
              </div>
              <ChevronRight className="w-4 h-4 text-braj-cream-500" />
            </Link>

            <Link
              href="/assistant"
              onClick={onClose}
              className="flex items-center justify-between p-2.5 rounded-xl text-sm font-medium text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-braj-saffron-600" />
                <span>AI Mitra Assistant</span>
              </div>
              <StatusBadge variant="saffron" size="sm">
                AI Companion
              </StatusBadge>
            </Link>
          </div>

          {/* Quick Dhams Picker */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-braj-saffron-700 uppercase tracking-wider mb-2.5">
              Explore By Holy Center
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {SACRED_DESTINATIONS.map((dham) => (
                <Link
                  key={dham.id}
                  href={`/explore?destination=${dham.slug}`}
                  onClick={onClose}
                  className="p-2.5 rounded-xl bg-braj-cream-50 hover:bg-braj-cream-100 border border-braj-cream-200 text-xs font-medium text-braj-indigo-950 flex flex-col justify-between transition-colors"
                >
                  <span className="font-semibold">{dham.name}</span>
                  <span className="text-[11px] text-braj-saffron-600">{dham.hindiName}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Emergency Helpline Box */}
          <div className="p-3.5 rounded-xl bg-braj-indigo-950 text-white border border-braj-gold-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-braj-gold-300 font-semibold">
              <ShieldAlert className="w-4 h-4 text-braj-saffron-400" />
              <span>Yatra Emergency Hotlines</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-braj-cream-200">
              <div>Police: <span className="font-mono font-bold text-white">112</span></div>
              <div>Ambulance: <span className="font-mono font-bold text-white">108</span></div>
            </div>
            <a
              href="tel:112"
              className="w-full mt-2 py-1.5 bg-braj-saffron-600 hover:bg-braj-saffron-700 text-white font-medium rounded-lg text-center flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Emergency (112)</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-braj-cream-200 bg-braj-cream-50 text-center text-xs text-braj-cream-700">
          <span>श्री राधे राधे • Braj Bhoomi Pilgrimage</span>
        </div>
      </div>
    </div>
  );
};
