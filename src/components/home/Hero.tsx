"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Sun,
  Search,
  Sparkles,
  MapPin,
  Bot,
  DoorOpen,
} from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/explore");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-braj-indigo-950 via-braj-indigo-900 to-braj-indigo-950 text-white py-16 sm:py-24 border-b border-braj-gold-500/30">
      {/* Sacred background aura & jaali motif */}
      <div className="absolute inset-0 bg-jaali-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-braj-saffron-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-braj-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <PageContainer className="relative z-10 text-center">
        {/* Sacred Invocation Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-braj-indigo-900/90 border border-braj-gold-400/40 text-xs sm:text-sm text-braj-cream-100 shadow-sm mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <span className="text-braj-saffron-400 font-semibold">श्री राधे राधे</span>
          <span className="w-1 h-1 rounded-full bg-braj-gold-400" />
          <span className="text-braj-gold-300 font-medium">
            BrajMitra AI • Your Intelligent Companion to Explore Braj
          </span>
        </div>

        {/* Brand Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
          Discover Braj{" "}
          <span className="bg-gradient-to-r from-braj-saffron-400 via-braj-gold-300 to-braj-saffron-300 bg-clip-text text-transparent">
            Beyond the Journey.
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="mt-5 text-sm sm:text-base lg:text-lg text-braj-cream-200 max-w-3xl mx-auto font-normal leading-relaxed">
          Experience Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, and Gokul with{" "}
          <strong className="text-white font-medium">AI-powered travel planning</strong>,{" "}
          <strong className="text-white font-medium">temple discovery</strong>,{" "}
          <strong className="text-white font-medium">gate-level navigation</strong>,{" "}
          <strong className="text-white font-medium">cultural storytelling</strong>, and{" "}
          <strong className="text-white font-medium">multilingual pilgrim assistance</strong>.
        </p>

        {/* Destination Search Input Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-2xl mx-auto flex items-center gap-2 p-1.5 rounded-2xl bg-white/95 border-2 border-braj-gold-500/50 shadow-lg backdrop-blur-sm"
        >
          <div className="pl-3 text-braj-gold-600">
            <Search className="w-5 h-5 text-braj-gold-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search destination, temple, kund, or ghat (e.g. Bankey Bihari, Radha Kund)..."
            className="flex-1 px-2 py-2 text-xs sm:text-sm text-braj-indigo-950 placeholder:text-braj-cream-700 focus:outline-none bg-transparent"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="shrink-0 font-semibold shadow-xs"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        {/* Main & Secondary CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href="/planner" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-semibold shadow-md"
            >
              <span>Plan Your Journey</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>

          <Link href="/temples" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto font-semibold"
            >
              <Sun className="w-4 h-4 text-braj-gold-400 mr-1" />
              <span>Explore Temples</span>
            </Button>
          </Link>
        </div>

        {/* Quick Dhams Pills Bar */}
        <div className="mt-12 pt-8 border-t border-braj-indigo-800/80 max-w-3xl mx-auto">
          <p className="text-xs uppercase font-semibold text-braj-gold-300/90 tracking-wider mb-4">
            Direct Access to the Six Holy Dhams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { name: "Mathura", hindi: "मथुरा", slug: "mathura" },
              { name: "Vrindavan", hindi: "वृन्दावन", slug: "vrindavan" },
              { name: "Govardhan", hindi: "गोवर्धन", slug: "govardhan" },
              { name: "Barsana", hindi: "बरसाना", slug: "barsana" },
              { name: "Nandgaon", hindi: "नन्दगांव", slug: "nandgaon" },
              { name: "Gokul", hindi: "गोकुल", slug: "gokul" },
            ].map((dham) => (
              <Link
                key={dham.name}
                href={`/explore?destination=${dham.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-braj-indigo-900/70 hover:bg-braj-saffron-950/60 border border-braj-gold-500/30 hover:border-braj-saffron-400 text-xs text-braj-cream-200 transition-all flex items-center gap-1.5 group"
              >
                <MapPin className="w-3.5 h-3.5 text-braj-saffron-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-white">{dham.name}</span>
                <span className="text-braj-gold-300 text-[11px] font-normal">{dham.hindi}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          <Link
            href="/assistant"
            className="p-4 rounded-xl bg-braj-indigo-900/60 border border-braj-gold-500/20 hover:border-braj-gold-400/50 transition-colors flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-braj-saffron-600/30 text-braj-saffron-400 group-hover:bg-braj-saffron-600 group-hover:text-white transition-colors">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">AI Travel Assistant</h4>
              <p className="text-xs text-braj-cream-300 mt-0.5">
                Multilingual sthala-purana, crowd advice, and instant answers.
              </p>
            </div>
          </Link>

          <Link
            href="/gate-finder"
            className="p-4 rounded-xl bg-braj-indigo-900/60 border border-braj-gold-500/20 hover:border-braj-gold-400/50 transition-colors flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-braj-gold-500/20 text-braj-gold-400 group-hover:bg-braj-gold-500 group-hover:text-braj-indigo-950 transition-colors">
              <DoorOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Temple Gate Finder</h4>
              <p className="text-xs text-braj-cream-300 mt-0.5">
                Exact entry gates, shoe counters, and parking distances.
              </p>
            </div>
          </Link>

          <Link
            href="/culture"
            className="p-4 rounded-xl bg-braj-indigo-900/60 border border-braj-gold-500/20 hover:border-braj-gold-400/50 transition-colors flex items-start gap-3 group"
          >
            <div className="p-2.5 rounded-lg bg-braj-indigo-600/40 text-braj-indigo-200 group-hover:bg-braj-indigo-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Braj Sanskriti</h4>
              <p className="text-xs text-braj-cream-300 mt-0.5">
                Krishna traditions, Laddu Gopal seva, and sacred pastimes.
              </p>
            </div>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
};
