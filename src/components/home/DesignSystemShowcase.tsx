"use client";

import React, { useState } from "react";
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Search,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Layers,
  Send,
} from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { PageBreadcrumb } from "../ui/PageBreadcrumb";
import { StatusBadge } from "../ui/StatusBadge";
import { Button } from "../ui/Button";
import { SearchBar } from "../ui/SearchBar";
import { LoadingSkeleton } from "../ui/LoadingSkeleton";
import { EmptyState } from "../ui/EmptyState";
import { ErrorState } from "../ui/ErrorState";
import { FeatureCard } from "../ui/FeatureCard";
import { DestinationCard } from "../ui/DestinationCard";
import { SACRED_DESTINATIONS } from "@/data/destinations";

export const DesignSystemShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"buttons" | "badges" | "skeletons" | "states" | "cards">("buttons");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [searchDemo, setSearchDemo] = useState("");
  const [errorRetrying, setErrorRetrying] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const breadcrumbItems = [
    { label: "Braj Mandala", href: "#destinations" },
    { label: "Vrindavan Dham", href: "#vrindavan" },
    { label: "Bankey Bihari Darshan" },
  ];

  const handleSimulateRetry = () => {
    setErrorRetrying(true);
    setTimeout(() => {
      setErrorRetrying(false);
      setErrorDismissed(true);
    }, 1500);
  };

  return (
    <section id="design-system" className="py-16 sm:py-20 bg-white border-b border-braj-cream-300 scroll-mt-16">
      <PageContainer>
        {/* Section Heading */}
        <SectionHeading
          badge="Interactive UI Kit"
          badgeVariant="indigo"
          title="BrajMitra Design System Showcase"
          subtitle="Explore all 13 reusable UI components built with deep indigo, sacred saffron, warm cream, and subtle gold design tokens."
          align="center"
        />

        {/* Live Breadcrumb Demonstration */}
        <div className="mb-8 p-3.5 rounded-xl bg-braj-cream-50 border border-braj-cream-200">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="text-[10px] font-bold text-braj-saffron-700 uppercase tracking-wider block mb-1">
                PageBreadcrumb Component
              </span>
              <PageBreadcrumb items={breadcrumbItems} />
            </div>
            <StatusBadge variant="gold" size="sm">
              Keyboard Accessible
            </StatusBadge>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-braj-cream-100/80 border border-braj-cream-300 w-full overflow-x-auto mb-8 max-w-2xl mx-auto">
          {[
            { id: "buttons", label: "Buttons & Form", icon: Send },
            { id: "badges", label: "Status Badges", icon: Sparkles },
            { id: "skeletons", label: "Loading Skeletons", icon: Clock },
            { id: "states", label: "Empty & Error States", icon: RefreshCw },
            { id: "cards", label: "Cards & Imagery", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-white text-braj-indigo-950 shadow-2xs border border-braj-cream-300 font-semibold"
                    : "text-braj-cream-800 hover:text-braj-indigo-950 hover:bg-white/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Buttons & Form (SearchBar, Button states) */}
        {activeTab === "buttons" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* SearchBar Demo */}
            <div className="p-6 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-braj-indigo-950">
                    SearchBar Component
                  </h4>
                  <p className="text-xs text-braj-cream-700">
                    Features clear button (`X`), shortcut badge, and accessible focus ring.
                  </p>
                </div>
                <StatusBadge variant="saffron" size="sm">
                  Active Demo
                </StatusBadge>
              </div>

              <div className="max-w-lg">
                <SearchBar
                  value={searchDemo}
                  onChange={(e) => setSearchDemo(e.target.value)}
                  onClear={() => setSearchDemo("")}
                  placeholder="Try typing 'Yamuna' or 'Ghats' to test clear button..."
                />
              </div>

              {searchDemo && (
                <div className="text-xs text-braj-indigo-950 bg-white p-2.5 rounded-lg border border-braj-cream-200 flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-braj-saffron-600" />
                  <span>Current Input: &quot;<strong>{searchDemo}</strong>&quot;</span>
                </div>
              )}
            </div>

            {/* Button Variants & States */}
            <div className="p-6 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="font-bold text-sm text-braj-indigo-950">
                    Button Variants & Interactive States
                  </h4>
                  <p className="text-xs text-braj-cream-700">
                    Primary, Secondary, Outline, Ghost with loading and disabled states.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setButtonLoading(!buttonLoading)}
                  icon={<Sliders className="w-3.5 h-3.5" />}
                >
                  Toggle Loading: {buttonLoading ? "ON" : "OFF"}
                </Button>
              </div>

              {/* Variants Row */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block">
                  Color Variants
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" loading={buttonLoading}>
                    Primary Saffron
                  </Button>
                  <Button variant="secondary" loading={buttonLoading}>
                    Secondary Indigo
                  </Button>
                  <Button variant="outline" loading={buttonLoading}>
                    Outline Gold
                  </Button>
                  <Button variant="ghost" loading={buttonLoading}>
                    Ghost Cream
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled State
                  </Button>
                </div>
              </div>

              {/* Sizes Row */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block">
                  Sizes (sm, md, lg)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="sm">
                    Small Button
                  </Button>
                  <Button variant="primary" size="md">
                    Medium Button
                  </Button>
                  <Button variant="primary" size="lg">
                    Large Button
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Status Badges */}
        {activeTab === "badges" && (
          <div className="p-6 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 space-y-6 animate-in fade-in duration-200">
            <div>
              <h4 className="font-bold text-sm text-braj-indigo-950">
                StatusBadge Component Variants
              </h4>
              <p className="text-xs text-braj-cream-700">
                Crafted for high contrast, static or animated pulsing dots, and semantic feedback.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block mb-2">
                  Brand Variants
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <StatusBadge variant="saffron" dot>
                    Saffron Active
                  </StatusBadge>
                  <StatusBadge variant="gold" dot>
                    Temple Gold
                  </StatusBadge>
                  <StatusBadge variant="indigo" dot>
                    Midnight Indigo
                  </StatusBadge>
                  <StatusBadge variant="cream" dot>
                    Chandan Cream
                  </StatusBadge>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block mb-2">
                  Semantic Feedback & Pulse Dots
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <StatusBadge variant="success" dot pulseDot>
                    Live Darshan Open
                  </StatusBadge>
                  <StatusBadge variant="warning" dot pulseDot>
                    High Crowd Rush
                  </StatusBadge>
                  <StatusBadge variant="neutral">
                    Offline
                  </StatusBadge>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Loading Skeletons */}
        {activeTab === "skeletons" && (
          <div className="p-6 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 space-y-6 animate-in fade-in duration-200">
            <div>
              <h4 className="font-bold text-sm text-braj-indigo-950">
                LoadingSkeleton Component Shimmer
              </h4>
              <p className="text-xs text-braj-cream-700">
                Warm chandan shimmer animation rather than cold gray blocks, matching our design aesthetic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block mb-2">
                  Destination Card Skeleton
                </span>
                <LoadingSkeleton variant="destination" />
              </div>

              <div>
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block mb-2">
                  Feature / Info Card Skeleton
                </span>
                <LoadingSkeleton variant="card" />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Empty & Error States */}
        {activeTab === "states" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Empty State */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block">
                  EmptyState Component
                </span>
                <EmptyState
                  icon={<Compass className="w-7 h-7 text-braj-gold-600" />}
                  title="No Yatra Itinerary Found"
                  description="You have not saved any pilgrimage routes yet. Select temples to create your first Braj yatra circuit."
                  action={
                    <Button variant="primary" size="sm">
                      Create New Yatra
                    </Button>
                  }
                />
              </div>

              {/* Error State */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block">
                  ErrorState Component
                </span>
                {errorDismissed ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-950 text-sm">Action Successfully Resolved</h4>
                    <p className="text-xs text-emerald-800">The error state has been handled gracefully.</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setErrorDismissed(false)}
                      className="mt-2 text-xs"
                    >
                      Reset Demo
                    </Button>
                  </div>
                ) : (
                  <ErrorState
                    title="Darshan Feed Unavailable"
                    message="Could not connect to the temple schedule synchronization gateway. Click below to retry."
                    onRetry={handleSimulateRetry}
                    loading={errorRetrying}
                    retryLabel="Retry Connection"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Cards & Imagery */}
        {activeTab === "cards" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h4 className="font-bold text-sm text-braj-indigo-950">
                DestinationCard & FeatureCard
              </h4>
              <p className="text-xs text-braj-cream-700">
                Destination cards with image error fallbacks and Feature cards with Lucide icons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination Card Demo */}
              <div>
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block mb-2">
                  DestinationCard (With Mathura Data & Image Fallback Support)
                </span>
                <DestinationCard
                  destination={SACRED_DESTINATIONS[0]}
                  imageUrl={SACRED_DESTINATIONS[0].imageUrl}
                />
              </div>

              {/* Feature Card Demo */}
              <div>
                <span className="text-xs font-semibold text-braj-cream-800 uppercase tracking-wider block mb-2">
                  FeatureCard (With Lucide Icon & Status Badge)
                </span>
                <FeatureCard
                  icon={<MapPin className="w-6 h-6 text-braj-saffron-600" />}
                  title="84 Kos Braj Parikrama Navigation"
                  description="Complete circuit guidance across all 12 forests (Vanas) and 24 groves (Upavanas) with verified resting camps."
                  status="Verified Guide"
                  statusVariant="saffron"
                  actionHref="#parikrama"
                  actionLabel="Explore Circuit"
                />
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
};
