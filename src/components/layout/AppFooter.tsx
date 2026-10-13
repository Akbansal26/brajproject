import React from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SACRED_DESTINATIONS } from "@/data/destinations";

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-braj-indigo-950 text-braj-cream-200 border-t-2 border-braj-gold-500/30 relative overflow-hidden">
      {/* Decorative top gold gradient hairline */}
      <div className="h-1 bg-gradient-to-r from-braj-gold-600 via-braj-saffron-500 to-braj-gold-600 opacity-90" />

      <PageContainer className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Sacred Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-braj-indigo-900 border border-braj-gold-400/40 text-braj-gold-400 flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5 text-braj-gold-300" />
              </div>
              <div>
                <span className="font-bold text-xl text-white tracking-tight">
                  BrajMitra <span className="text-braj-saffron-400">AI</span>
                </span>
                <span className="block text-xs text-braj-gold-300 font-medium">
                  ब्रजमित्र • Sacred Yatra Companion
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-braj-cream-300 leading-relaxed">
              An intelligent, reverent travel companion for pilgrims and seekers exploring the
              sacred lands of Shri Radha-Krishna across Mathura, Vrindavan, Govardhan, Barsana,
              Nandgaon, and Gokul.
            </p>

            <div className="pt-2 text-xs text-braj-gold-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-braj-saffron-400 shrink-0" />
              <span>&quot;राधे राधे जपो, चले आएंगे बिहारी&quot;</span>
            </div>
          </div>

          {/* Column 2: Six Sacred Dhams */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-braj-gold-300 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-braj-saffron-400" />
              <span>The Six Sacred Dhams</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-braj-cream-300">
              {SACRED_DESTINATIONS.map((dham) => (
                <li key={dham.id}>
                  <Link
                    href={`/explore?destination=${dham.slug}`}
                    className="hover:text-braj-saffron-300 transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5"
                  >
                    <span>{dham.name} ({dham.hindiName})</span>
                    <span className="text-xs text-braj-gold-400/60 group-hover:text-braj-gold-400">
                      {dham.distanceFromMathuraKm === 0 ? "0 km" : `${dham.distanceFromMathuraKm} km`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Pilgrim Tools & Guides */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-braj-gold-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-braj-gold-400" />
              <span>Yatra Tools & Guides</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-braj-cream-300">
              <li>
                <Link
                  href="/temples"
                  className="hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5 block"
                >
                  Temple Directory & Aarti Schedules
                </Link>
              </li>
              <li>
                <Link
                  href="/gate-finder"
                  className="hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5 block"
                >
                  Temple Gate Finder & Parking Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  className="hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5 block"
                >
                  Smart Trip & Parikrama Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/culture"
                  className="hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5 block"
                >
                  Braj Sanskriti & Living Traditions
                </Link>
              </li>
              <li>
                <Link
                  href="/assistant"
                  className="hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-braj-saffron-400" />
                  <span>AI Mitra Travel Assistant</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-braj-saffron-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-braj-saffron-400 rounded py-0.5 flex items-center justify-between"
                >
                  <span>Data Audit & Admin Console</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-900/60 text-amber-200 border border-amber-500/40">
                    Dev Only
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Helplines & Emergency */}
          <div id="helpline" className="space-y-3">
            <h4 className="text-xs font-bold text-braj-gold-300 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-braj-saffron-400" />
              <span>Helplines & Safety</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-braj-indigo-900/80 border border-braj-gold-500/20 space-y-1.5">
                <p className="text-[11px] text-braj-gold-300 font-semibold uppercase tracking-wider">
                  Emergency Hotlines
                </p>
                <div className="flex justify-between text-xs">
                  <span className="text-braj-cream-300">Police Emergency:</span>
                  <a href="tel:112" className="text-white font-mono font-bold hover:text-braj-saffron-300">112</a>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-braj-cream-300">Ambulance Service:</span>
                  <a href="tel:108" className="text-white font-mono font-bold hover:text-braj-saffron-300">108</a>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-braj-cream-300">Tourist Police Mathura:</span>
                  <a href="tel:+915652403244" className="text-white font-mono font-bold hover:text-braj-saffron-300">+91 565 240 3244</a>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-braj-saffron-900/30 border border-braj-saffron-700/40 text-xs text-braj-cream-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-braj-saffron-400 shrink-0 mt-0.5" />
                <span>
                  Deposit shoes at official temple cloak counters. Always accept official temple receipts for offerings.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Devotional & Legal Bar */}
        <div className="mt-12 pt-6 border-t border-braj-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-braj-cream-400">
          <div className="flex items-center gap-2 text-braj-gold-300/80 font-medium">
            <span>जय श्री राधे कृष्ण</span>
            <span>•</span>
            <span>ॐ नमो भगवते वासुदेवाय</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} BrajMitra AI. All rights reserved.</span>
            <span>Built for Braj Pilgrims Worldwide</span>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};
