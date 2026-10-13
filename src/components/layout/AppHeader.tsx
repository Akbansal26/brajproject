"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Compass,
  Clock,
  Sparkles,
  MapPin,
  ChevronDown,
  ShieldAlert,
  Search,
  DoorOpen,
  Calendar,
} from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { StatusBadge } from "../ui/StatusBadge";
import { Button } from "../ui/Button";
import { MobileNavigation } from "./MobileNavigation";
import { SACRED_DESTINATIONS } from "@/data/destinations";

export interface AppHeaderProps {
  onSearchClick?: () => void;
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSearchClick,
  className = "",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dhamsDropdownOpen, setDhamsDropdownOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-braj-gold-500/20 shadow-2xs ${className}`}
      >
        {/* Top Sacred Info Ribbon */}
        <div className="bg-braj-indigo-950 text-braj-cream-200 text-xs py-1.5 border-b border-braj-gold-500/20">
          <PageContainer className="flex items-center justify-between text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="text-braj-saffron-400 font-semibold tracking-wide">
                राधे राधे
              </span>
              <span className="hidden sm:inline text-braj-gold-300">|</span>
              <span className="hidden sm:inline text-braj-cream-300">
                BrajMitra AI • Your Intelligent Companion to Explore Braj
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:112"
                className="flex items-center gap-1.5 text-braj-gold-300 hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded px-1"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-braj-saffron-400 shrink-0" />
                <span>Helpline: 112 / 108</span>
              </a>
            </div>
          </PageContainer>
        </div>

        {/* Main Header Bar */}
        <div className="py-3 sm:py-3.5">
          <PageContainer className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-braj-indigo-900 border border-braj-gold-500/40 text-braj-gold-400 flex items-center justify-center shadow-xs group-hover:border-braj-saffron-500 transition-colors">
                <Compass className="w-5 h-5 text-braj-gold-300 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg sm:text-xl text-braj-indigo-950 tracking-tight">
                    BrajMitra <span className="text-braj-saffron-600">AI</span>
                  </span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-braj-gold-100 text-braj-gold-800 border border-braj-gold-300">
                    ब्रजमित्र
                  </span>
                </div>
                <p className="text-[11px] text-braj-cream-700 hidden sm:block">
                  Sacred Braj Travel Companion
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {/* Dhams Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDhamsDropdownOpen(!dhamsDropdownOpen)}
                  onBlur={() => setTimeout(() => setDhamsDropdownOpen(false), 200)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-950 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
                  aria-expanded={dhamsDropdownOpen}
                >
                  <MapPin className="w-4 h-4 text-braj-saffron-600" />
                  <span>Explore Dhams</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      dhamsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dhamsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl shadow-lg border border-braj-gold-400/30 p-2 grid gap-1 z-50 animate-in fade-in duration-150">
                    <Link
                      href="/explore"
                      className="p-2 rounded-lg bg-braj-cream-100 hover:bg-braj-cream-200 transition-colors flex items-center justify-between text-xs font-bold text-braj-indigo-950"
                    >
                      <span>All 6 Sacred Dhams</span>
                      <span className="text-braj-saffron-600">&rarr;</span>
                    </Link>
                    {SACRED_DESTINATIONS.map((dham) => (
                      <Link
                        key={dham.id}
                        href={`/explore?destination=${dham.slug}`}
                        className="p-2 rounded-lg hover:bg-braj-cream-100 transition-colors flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-braj-indigo-950 group-hover:text-braj-saffron-600">
                              {dham.name}
                            </span>
                            <span className="text-xs text-braj-gold-700 font-medium">
                              {dham.hindiName}
                            </span>
                          </div>
                          <p className="text-xs text-braj-cream-700 line-clamp-1">{dham.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/temples"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-950 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
              >
                <Clock className="w-4 h-4 text-braj-gold-600" />
                <span>Temples</span>
              </Link>

              <Link
                href="/gate-finder"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-950 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
              >
                <DoorOpen className="w-4 h-4 text-braj-indigo-600" />
                <span>Gate Finder</span>
              </Link>

              <Link
                href="/planner"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-950 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
              >
                <Calendar className="w-4 h-4 text-braj-saffron-600" />
                <span>Trip Planner</span>
              </Link>

              <Link
                href="/culture"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-950 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
              >
                <Sparkles className="w-4 h-4 text-braj-gold-600" />
                <span>Braj Sanskriti</span>
              </Link>

              <Link
                href="/assistant"
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-braj-indigo-950 hover:text-braj-saffron-600 rounded-lg hover:bg-braj-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
              >
                <span>AI Mitra</span>
                <StatusBadge variant="saffron" size="sm" className="text-[10px] py-0 px-1.5">
                  AI
                </StatusBadge>
              </Link>

              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-braj-indigo-950/70 hover:text-braj-indigo-950 rounded-lg hover:bg-braj-cream-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
                title="Internal Data Audit & Admin Console (Development Only)"
              >
                <span>Admin</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Dev
                </span>
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {onSearchClick ? (
                <button
                  type="button"
                  onClick={onSearchClick}
                  className="p-2 rounded-lg text-braj-cream-800 hover:text-braj-indigo-950 hover:bg-braj-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 cursor-pointer"
                  aria-label="Open search directory"
                >
                  <Search className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  href="/explore"
                  className="p-2 rounded-lg text-braj-cream-800 hover:text-braj-indigo-950 hover:bg-braj-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500"
                  aria-label="Open search directory"
                >
                  <Search className="w-4 h-4" />
                </Link>
              )}

              <Link href="/planner" className="hidden sm:inline-block">
                <Button variant="primary" size="sm" className="font-semibold shadow-2xs">
                  Plan Yatra
                </Button>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-braj-indigo-950 hover:bg-braj-cream-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-braj-saffron-500 cursor-pointer"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </PageContainer>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
