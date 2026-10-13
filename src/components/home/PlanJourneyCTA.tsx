import React from "react";
import Link from "next/link";
import { ArrowRight, Bot, Calendar, Compass, ShieldCheck } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { Button } from "../ui/Button";

export const PlanJourneyCTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-braj-indigo-950 via-braj-indigo-900 to-braj-indigo-950 text-white relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute inset-0 bg-jaali-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-braj-saffron-600/20 rounded-full blur-3xl pointer-events-none" />

      <PageContainer className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-braj-indigo-900/90 border border-braj-gold-400/40 text-xs text-braj-cream-200 mb-6">
          <span className="text-braj-saffron-400 font-semibold">श्री राधे</span>
          <span className="w-1 h-1 rounded-full bg-braj-gold-400" />
          <span>Begin Your Sacred Braj Yatra</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Ready to Experience the Sacred Soul of Braj?
        </h2>

        <p className="mt-4 text-sm sm:text-base text-braj-cream-200 max-w-2xl mx-auto leading-relaxed">
          Let BrajMitra AI organize your temple windows, parikrama circuits, and gate navigation
          so you can focus entirely on divine devotion.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/planner" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-semibold shadow-md"
              icon={<Calendar className="w-4 h-4" />}
            >
              <span>Plan Your Journey</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>

          <Link href="/assistant" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto font-semibold"
              icon={<Bot className="w-4 h-4 text-braj-gold-400" />}
            >
              <span>Ask AI Mitra Assistant</span>
            </Button>
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-braj-indigo-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-braj-cream-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-braj-saffron-400" />
            <span>Verified Temple Schedules</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-braj-gold-400" />
            <span>Complete Parikrama Guides</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-braj-gold-400">⚡</span>
            <span>Free For All Seekers & Pilgrims</span>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};
