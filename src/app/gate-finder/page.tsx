"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  DoorOpen,
  MapPin,
  Car,
  Footprints,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Compass,
  Navigation,
  ExternalLink,
  Info,
  Clock,
  X,
  SlidersHorizontal,
  ShieldAlert,
  ArrowRight,
  Accessibility,
  Database as DatabaseIcon,
} from "lucide-react";
import { getGateGuides } from "@/services/templeDataService";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { TempleGateMap } from "@/components/gates/TempleGateMap";
import {
  GATE_GUIDES,
  GateRecord,
  TempleGateGuide,
  getGateSummary,
  canEnterPublicly,
} from "@/data/gates";

function GateFinderContent() {
  const searchParams = useSearchParams();
  const initialTempleSlug = searchParams.get("temple") || searchParams.get("id") || "";
  const initialGateId = searchParams.get("gate") || "";

  const [guides, setGuides] = useState<TempleGateGuide[]>(() => GATE_GUIDES);
  const [dataMeta, setDataMeta] = useState<{ isLiveDatabase: boolean; label: string; error?: string }>({
    isLiveDatabase: false,
    label: "Local Verified Gate Guides",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getGateGuides()
      .then((result) => {
        if (active) {
          setGuides(result.data);
          setDataMeta({
            isLiveDatabase: result.isLiveDatabase,
            label: result.sourceLabel,
            error: result.error,
          });
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // Find initial guide from query param or fallback to first
  const defaultGuide = useMemo(() => {
    if (initialTempleSlug) {
      const found = guides.find(
        (g) =>
          g.templeId.toLowerCase() === initialTempleSlug.toLowerCase() ||
          g.templeSlug.toLowerCase() === initialTempleSlug.toLowerCase()
      );
      if (found) return found;
    }
    if (initialGateId) {
      const foundByGate = guides.find((g) =>
        g.gates.some((gate) => gate.id.toLowerCase() === initialGateId.toLowerCase())
      );
      if (foundByGate) return foundByGate;
    }
    return guides[0] || GATE_GUIDES[0];
  }, [initialTempleSlug, initialGateId, guides]);

  const [userSelectedTempleId, setUserSelectedTempleId] = useState<string | null>(null);
  const [templeSearchQuery, setTempleSearchQuery] = useState("");
  const [gateTypeFilter, setGateTypeFilter] = useState<"all" | "entry" | "exit" | "restricted">("all");
  const [accessibilityFilter, setAccessibilityFilter] = useState<"all" | "wheelchair" | "step_free">("all");
  const [verificationFilter, setVerificationFilter] = useState<"all" | "verified" | "pending">("all");
  const [userSelectedGateId, setUserSelectedGateId] = useState<string | null>(null);
  const [inspectedGate, setInspectedGate] = useState<GateRecord | null>(null);

  const selectedTempleId = userSelectedTempleId ?? defaultGuide.templeId;
  const setSelectedTempleId = (id: string) => setUserSelectedTempleId(id);

  const selectedGateId = userSelectedGateId ?? initialGateId ?? null;
  const setSelectedGateId = (id: string | null) => setUserSelectedGateId(id);

  // Current active temple guide
  const currentGuide: TempleGateGuide = useMemo(() => {
    return guides.find((g) => g.templeId === selectedTempleId) || guides[0] || GATE_GUIDES[0];
  }, [selectedTempleId, guides]);

  // Filter temples for selector
  const filteredTemplesList = useMemo(() => {
    const q = templeSearchQuery.trim().toLowerCase();
    if (!q) return guides;
    return guides.filter(
      (g) =>
        g.templeName.toLowerCase().includes(q) ||
        g.hindiName.includes(q) ||
        g.city.toLowerCase().includes(q) ||
        g.address.toLowerCase().includes(q)
    );
  }, [templeSearchQuery, guides]);

  // Filter gates for current temple
  const filteredGates = useMemo(() => {
    return currentGuide.gates.filter((gate) => {
      // Type filter
      let matchesType = true;
      if (gateTypeFilter === "entry") {
        matchesType = gate.gateType === "main_entrance" || gate.gateType === "secondary_entrance";
      } else if (gateTypeFilter === "exit") {
        matchesType = gate.gateType === "exit_only";
      } else if (gateTypeFilter === "restricted") {
        matchesType = gate.gateType === "restricted" || gate.gateType === "emergency_exit";
      }

      // Accessibility filter
      let matchesAccessibility = true;
      if (accessibilityFilter === "wheelchair") {
        matchesAccessibility = gate.accessibility.wheelchairRamp === true;
      } else if (accessibilityFilter === "step_free") {
        matchesAccessibility = gate.accessibility.stepFree === true;
      }

      // Verification filter
      let matchesVerification = true;
      if (verificationFilter === "verified") {
        matchesVerification = gate.verificationStatus === "verified";
      } else if (verificationFilter === "pending") {
        matchesVerification = gate.verificationStatus === "pending_verification";
      }

      return matchesType && matchesAccessibility && matchesVerification;
    });
  }, [currentGuide, gateTypeFilter, accessibilityFilter, verificationFilter]);

  // Active gate for map highlight
  const activeGate = useMemo(() => {
    if (selectedGateId) {
      const found = currentGuide.gates.find((g) => g.id === selectedGateId);
      if (found) return found;
    }
    return currentGuide.gates[0] || null;
  }, [selectedGateId, currentGuide]);

  const summary = useMemo(() => getGateSummary(currentGuide), [currentGuide]);

  const handleSelectTemple = (templeId: string) => {
    setSelectedTempleId(templeId);
    setSelectedGateId(null);
    setGateTypeFilter("all");
    setVerificationFilter("all");
  };

  const getGateTypeBadge = (gate: GateRecord) => {
    switch (gate.gateType) {
      case "main_entrance":
        return <StatusBadge variant="success" size="sm">Main Public Entrance</StatusBadge>;
      case "secondary_entrance":
        return <StatusBadge variant="success" size="sm">Secondary Public Entrance</StatusBadge>;
      case "exit_only":
        return <StatusBadge variant="saffron" size="sm">Exit Only (One-Way)</StatusBadge>;
      case "restricted":
        return <StatusBadge variant="indigo" size="sm">Restricted Passes Only</StatusBadge>;
      case "emergency_exit":
        return <StatusBadge variant="warning" size="sm">Emergency Exit (Closed)</StatusBadge>;
      default:
        return <StatusBadge variant="neutral" size="sm">Unverified Configuration</StatusBadge>;
    }
  };

  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Temple Gate Finder & Crowd Navigation" },
        ]}
      />

      {/* Main Section Heading */}
      <SectionHeading
        badge="Gate Intelligence & Crowd Routing"
        badgeVariant="saffron"
        title="Temple Gate Finder & Pilgrim Navigation"
        subtitle="Avoid dense one-way alley bottlenecks, identify verified public entrances vs dedicated exit portals, locate official shoe counters, and view GPS-verified gate positions across sacred Braj shrines."
        align="left"
      />

      {/* Database Integration Status Strip */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-2xl bg-braj-cream-100/70 border border-braj-cream-300 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <DatabaseIcon className={`w-4 h-4 ${dataMeta.isLiveDatabase ? "text-emerald-600" : "text-amber-600"}`} />
          <span className="font-semibold text-braj-indigo-950">
            Source: <span className="font-normal">{dataMeta.label}</span>
          </span>
          {isLoading && (
            <span className="text-[11px] text-braj-gold-700 bg-braj-gold-100/70 px-2 py-0.5 rounded-md animate-pulse">
              Syncing...
            </span>
          )}
          {dataMeta.error && (
            <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Notice: {dataMeta.error}
            </span>
          )}
        </div>
        <StatusBadge
          variant={dataMeta.isLiveDatabase ? "success" : "neutral"}
          size="sm"
          dot
        >
          {isLoading
            ? "Checking Database..."
            : dataMeta.isLiveDatabase
            ? "Supabase Live Connected"
            : "Local Development Fallback"}
        </StatusBadge>
      </div>

      {/* Temple Search & Quick Selector */}
      <div className="bg-white p-6 rounded-3xl border border-braj-cream-300 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 max-w-lg">
            <SearchBar
              value={templeSearchQuery}
              onChange={(e) => setTempleSearchQuery(e.target.value)}
              onClear={() => setTempleSearchQuery("")}
              placeholder="Search temple by name or city (e.g. Banke Bihari, Janmasthan, Prem Mandir)..."
              size="md"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-braj-cream-700">
            <DoorOpen className="w-4 h-4 text-braj-gold-600" />
            <span>Select from <strong>{GATE_GUIDES.length}</strong> audited Braj shrines</span>
          </div>
        </div>

        {/* Temple Selectors Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {filteredTemplesList.map((guide) => {
            const isSelected = selectedTempleId === guide.templeId;
            return (
              <button
                key={guide.templeId}
                type="button"
                onClick={() => handleSelectTemple(guide.templeId)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? "bg-braj-indigo-900 text-white shadow-2xs border border-braj-gold-400/50"
                    : "bg-braj-cream-50 text-braj-indigo-950 border border-braj-cream-300 hover:border-braj-gold-400 hover:bg-white"
                }`}
              >
                <DoorOpen className={`w-3.5 h-3.5 ${isSelected ? "text-braj-gold-400" : "text-braj-cream-700"}`} />
                <span>{guide.templeName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected ? "bg-braj-indigo-800 text-braj-gold-300" : "bg-braj-cream-200 text-braj-cream-800"
                  }`}
                >
                  {guide.city}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Temple Overview & Gate Audit Summary Banner */}
      <div className="bg-white rounded-3xl border border-braj-cream-300 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-braj-cream-200">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-bold text-braj-indigo-950">
                {currentGuide.templeName}
              </h2>
              <span className="text-sm font-semibold text-braj-saffron-600">
                {currentGuide.hindiName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-braj-cream-700 mt-1 flex-wrap">
              <span className="font-semibold text-braj-indigo-900">{currentGuide.city}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-braj-gold-600" />
                <span>{currentGuide.address}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge
              variant={currentGuide.gatesAuditStatus === "fully_verified" ? "success" : "warning"}
              dot
              size="md"
            >
              {currentGuide.gatesAuditStatus === "fully_verified"
                ? "Full Gate Audit Verified"
                : "Perimeter Audit in Progress"}
            </StatusBadge>
            <Link href={`/temples/${currentGuide.templeSlug}`}>
              <Button variant="outline" size="sm" className="text-xs">
                <span>Temple Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Overview Narrative */}
        <p className="text-xs sm:text-sm text-braj-cream-800 leading-relaxed">
          {currentGuide.overview}
        </p>

        {/* Mathura Police / District Authority One-Way Directive if present */}
        {currentGuide.oneWayTrafficDirective && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Official Traffic & Crowd Flow Directive</span>
            </div>
            <p className="text-amber-900 leading-relaxed">
              {currentGuide.oneWayTrafficDirective}
            </p>
          </div>
        )}

        {/* 4-Stat Metrics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-2">
          {/* Stat 1: Verified Public Entry Gates */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              Public Entry Gates
            </span>
            <div className="text-2xl font-black text-emerald-950">
              {summary.verifiedPublicEntries}
            </div>
            <span className="text-[11px] text-emerald-700 block">
              Authorized for general pilgrims
            </span>
          </div>

          {/* Stat 2: Known Exits & Restricted */}
          <div className="p-4 rounded-2xl bg-braj-saffron-50/70 border border-braj-saffron-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-braj-saffron-800 block">
              Exits & Restricted
            </span>
            <div className="text-2xl font-black text-braj-saffron-950">
              {summary.knownExitsAndRestricted}
            </div>
            <span className="text-[11px] text-braj-saffron-700 block">
              One-way exits & pass gates
            </span>
          </div>

          {/* Stat 3: Awaiting Verification */}
          <div className="p-4 rounded-2xl bg-braj-cream-100/70 border border-braj-cream-300 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-braj-indigo-950 block">
              Pending Audit
            </span>
            <div className="text-2xl font-black text-braj-indigo-950">
              {summary.pendingVerification}
            </div>
            <span className="text-[11px] text-braj-cream-700 block">
              Field verification pending
            </span>
          </div>

          {/* Stat 4: Total Known Gates */}
          <div className="p-4 rounded-2xl bg-braj-indigo-50/70 border border-braj-indigo-200 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-braj-indigo-900 block">
              Total Known Gates
            </span>
            <div className="text-2xl font-black text-braj-indigo-950">
              {summary.isGateCountUnknown ? "Unknown" : summary.totalKnownGates}
            </div>
            <span className="text-[11px] text-braj-indigo-800 block truncate">
              {summary.isGateCountUnknown ? "Open perimeter steps" : "Surveyed physical portals"}
            </span>
          </div>
        </div>

        {/* Notice when Gate Count is Unknown */}
        {summary.isGateCountUnknown && (
          <div className="p-4 rounded-2xl bg-braj-cream-100 border border-braj-cream-300 flex items-start gap-3 text-xs text-braj-cream-900">
            <Info className="w-5 h-5 text-braj-indigo-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-braj-indigo-950 block mb-0.5">
                Perimeter Gate Count Unknown & Continuous Embankment Access
              </strong>
              This sacred shrine does not feature numbered boundary portals. The perimeter is composed of open heritage stone ghat steps with continuous pedestrian access. Physical gate audit will be updated as Nagar Panchayat demarcation proceeds.
            </div>
          </div>
        )}

        {/* Live Crowd Data Notice */}
        <div className="p-3.5 rounded-xl bg-braj-cream-50 border border-braj-cream-200 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-braj-cream-800">
            <Clock className="w-4 h-4 text-braj-gold-600" />
            <span>
              <strong>Crowd Intelligence Status:</strong> Live crowd information unavailable (Automated sensor telemetry pending; relying on police historical flow logs).
            </span>
          </div>
          <span className="text-[11px] font-mono text-braj-cream-600">
            Audit Source: {currentGuide.officialAuditSource}
          </span>
        </div>
      </div>

      {/* Gate Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-braj-cream-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-braj-indigo-950 flex items-center gap-1 shrink-0 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-braj-gold-600" />
            <span>Gate Type:</span>
          </span>
          <button
            type="button"
            onClick={() => setGateTypeFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              gateTypeFilter === "all"
                ? "bg-braj-indigo-900 text-white font-semibold"
                : "bg-braj-cream-100 text-braj-indigo-950 hover:bg-braj-cream-200"
            }`}
          >
            All Gates ({currentGuide.gates.length})
          </button>
          <button
            type="button"
            onClick={() => setGateTypeFilter("entry")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              gateTypeFilter === "entry"
                ? "bg-emerald-700 text-white font-semibold"
                : "bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            Public Entrances ({summary.verifiedPublicEntries})
          </button>
          <button
            type="button"
            onClick={() => setGateTypeFilter("exit")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              gateTypeFilter === "exit"
                ? "bg-braj-saffron-600 text-white font-semibold"
                : "bg-braj-saffron-50 text-braj-saffron-900 border border-braj-saffron-200 hover:bg-braj-saffron-100"
            }`}
          >
            Exits Only
          </button>
          <button
            type="button"
            onClick={() => setGateTypeFilter("restricted")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
              gateTypeFilter === "restricted"
                ? "bg-purple-900 text-white font-semibold"
                : "bg-purple-50 text-purple-950 border border-purple-200 hover:bg-purple-100"
            }`}
          >
            Restricted / Emergency
          </button>
        </div>

        {/* Accessibility & Verification Filters */}
        <div className="flex items-center gap-3 flex-wrap shrink-0">
          <div className="flex items-center gap-1.5">
            <Accessibility className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
            <span className="text-xs text-braj-cream-700">Access:</span>
            <select
              value={accessibilityFilter}
              onChange={(e) =>
                setAccessibilityFilter(e.target.value as "all" | "wheelchair" | "step_free")
              }
              aria-label="Filter gates by accessibility"
              className="text-xs bg-braj-cream-50 border border-braj-cream-300 rounded-xl px-2.5 py-1.5 text-braj-indigo-950 font-medium focus:outline-none focus:border-braj-saffron-500 cursor-pointer"
            >
              <option value="all">All Access</option>
              <option value="wheelchair">Wheelchair Ramp</option>
              <option value="step_free">Step-Free Entry</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-braj-cream-700">Audit:</span>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value as "all" | "verified" | "pending")}
              aria-label="Filter gates by verification status"
              className="text-xs bg-braj-cream-50 border border-braj-cream-300 rounded-xl px-2.5 py-1.5 text-braj-indigo-950 font-medium focus:outline-none focus:border-braj-saffron-500 cursor-pointer"
            >
              <option value="all">All Records</option>
              <option value="verified">Verified Only</option>
              <option value="pending">Pending Verification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Map Section Placeholder + Gate Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Top: Interactive Leaflet Map */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <TempleGateMap
            guide={currentGuide}
            selectedGateId={selectedGateId}
            onSelectGate={(gateId) => setSelectedGateId(gateId)}
          />

          {/* Quick Legend Notice */}
          <div className="bg-white p-4 rounded-2xl border border-braj-cream-300 text-xs space-y-2">
            <span className="font-bold text-braj-indigo-950 block">Safety & Entry Legend:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-braj-cream-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Authorized Public Entry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-braj-saffron-500 shrink-0" />
                <span>One-Way Dedicated Exit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                <span>Restricted / VIP Passes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                <span>Emergency Exit (Do Not Enter)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right / Main: Gate Cards List */}
        <div className="lg:col-span-7 space-y-5">
          {filteredGates.length > 0 ? (
            filteredGates.map((gate) => {
              const isSelected = activeGate?.id === gate.id;
              const isEntry = canEnterPublicly(gate);
              const isExitOnly = gate.gateType === "exit_only";
              const isRestricted = gate.gateType === "restricted" || gate.gateType === "emergency_exit";

              return (
                <div
                  key={gate.id}
                  className={`rounded-3xl border bg-white overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? "border-braj-gold-500 shadow-md ring-1 ring-braj-gold-400/40"
                      : "border-braj-cream-300 shadow-2xs hover:border-braj-cream-400 hover:shadow-xs"
                  }`}
                >
                  {/* Gate Card Header */}
                  <div className="p-5 pb-4 border-b border-braj-cream-200/80 bg-gradient-to-r from-braj-cream-50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-lg text-braj-indigo-950">
                          {gate.gateNumber}
                        </span>
                        <span className="font-bold text-base text-braj-indigo-900">
                          {gate.gateName}
                        </span>
                      </div>
                      <p className="text-xs text-braj-cream-700 mt-0.5">
                        {gate.bestFor}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {getGateTypeBadge(gate)}
                      <StatusBadge
                        variant={gate.verificationStatus === "verified" ? "success" : "warning"}
                        size="sm"
                      >
                        {gate.verificationStatus === "verified" ? "Verified" : "Pending"}
                      </StatusBadge>
                    </div>
                  </div>

                  {/* Gate Card Body */}
                  <div className="p-5 space-y-4 text-xs">
                    {/* Public Entry Authorized Banner */}
                    {isEntry && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>VERIFIED PUBLIC ENTRANCE:</strong> Authorized portal for general devotees and families. Free entry during standard darshan hours.
                        </div>
                      </div>
                    )}

                    {/* Safety Warnings for Non-Entry Gates */}
                    {isExitOnly && (
                      <div className="p-3 rounded-xl bg-braj-saffron-50 border border-braj-saffron-200 text-braj-saffron-950 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-braj-saffron-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>DO NOT ATTEMPT ENTRY:</strong> This portal is enforced as an exit-only corridor by police barricades. Attempting entry causes reverse pedestrian jams.
                        </div>
                      </div>
                    )}

                    {isRestricted && (
                      <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                        <div>
                          <strong>RESTRICTED ACCESS:</strong> Devotees without authorized passes or emergency credentials will not be admitted.
                        </div>
                      </div>
                    )}

                    {/* Operational & Accessibility Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Accessibility */}
                      <div className="p-3 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-braj-indigo-950">
                          <Accessibility className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
                          <span>Accessibility:</span>
                        </div>
                        <p className="text-braj-cream-800 text-[11px] leading-relaxed">
                          {gate.accessibility.details}
                        </p>
                      </div>

                      {/* Footwear Proximity */}
                      <div className="p-3 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-braj-indigo-950">
                          <Footprints className="w-3.5 h-3.5 text-braj-saffron-600 shrink-0" />
                          <span>Footwear Counter:</span>
                        </div>
                        <p className="text-braj-cream-800 text-[11px] leading-relaxed">
                          {gate.footwearProximity}
                        </p>
                      </div>
                    </div>

                    {/* Security Check & Specific Warnings */}
                    <div className="space-y-1.5 text-braj-cream-800 text-[11px]">
                      <div>
                        <strong>Security & Screening:</strong> {gate.securityCheck}
                      </div>
                      {gate.warnings && (
                        <div className="text-amber-900 font-medium">
                          <strong>Note:</strong> {gate.warnings}
                        </div>
                      )}
                    </div>

                    {/* Real-time Crowd Observation Display */}
                    {gate.crowdObservation?.available ? (
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 flex items-center justify-between flex-wrap gap-1">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Crowd: <strong className="uppercase">{gate.crowdObservation.level}</strong>
                            {gate.crowdObservation.estimatedWaitMinutes !== undefined && (
                              <span> • Wait: ~{gate.crowdObservation.estimatedWaitMinutes} min</span>
                            )}
                          </span>
                        </span>
                        <span className="text-emerald-800 text-[10px]">
                          {gate.crowdObservation.note || `Verified: ${gate.lastVerified}`}
                        </span>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-braj-cream-100/60 border border-braj-cream-200 text-[11px] text-braj-cream-700 flex items-center justify-between flex-wrap gap-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-braj-gold-600" />
                          <span>Live crowd: <em>{gate.crowdObservation?.note || "No real-time report"}</em></span>
                        </span>
                        <span>Verified: {gate.lastVerified}</span>
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="pt-3 border-t border-braj-cream-200 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={isSelected ? "primary" : "outline"}
                          size="sm"
                          onClick={() => setSelectedGateId(gate.id)}
                          className="text-xs"
                        >
                          <Compass className="w-3.5 h-3.5 mr-1" />
                          <span>{isSelected ? "Active on Map" : "Highlight on Map"}</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setInspectedGate(gate)}
                          className="text-xs"
                        >
                          <Info className="w-3.5 h-3.5 mr-1" />
                          <span>Gate Details</span>
                        </Button>
                      </div>

                      {/* Direction Link ONLY when coordinates verified */}
                      {gate.coordinates?.verified ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${gate.coordinates.lat},${gate.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-braj-indigo-900 text-white text-xs font-semibold hover:bg-braj-indigo-800 transition-colors shadow-2xs"
                        >
                          <Navigation className="w-3.5 h-3.5 text-braj-gold-400" />
                          <span>Get Directions</span>
                          <ExternalLink className="w-3 h-3 ml-0.5 text-braj-gold-300" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-braj-cream-500 italic bg-braj-cream-100 px-2.5 py-1 rounded-lg">
                          Directions Unavailable (GPS Pending)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              icon={<DoorOpen className="w-8 h-8 text-braj-saffron-600" />}
              title="No Gates Match Filter"
              description="No gates in this temple match your selected filter criteria. Reset filters to view all audited portals."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setGateTypeFilter("all");
                    setAccessibilityFilter("all");
                    setVerificationFilter("all");
                  }}
                >
                  Reset Gate Filters
                </Button>
              }
            />
          )}
        </div>
      </div>

      {/* Authorized Parking & Footwear Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Footwear Counters */}
        <div className="bg-white p-6 rounded-3xl border border-braj-cream-300 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-braj-gold-600" />
            <h3 className="font-bold text-base text-braj-indigo-950">
              Verified Footwear & Cloakroom Stands
            </h3>
          </div>
          <div className="space-y-3">
            {currentGuide.footwearLocations.map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 text-xs space-y-1"
              >
                <div className="font-bold text-braj-indigo-950 flex items-center justify-between">
                  <span>{f.name}</span>
                  <StatusBadge variant="success" size="sm">
                    Verified Free
                  </StatusBadge>
                </div>
                <div className="text-braj-cream-800">
                  <strong>Location:</strong> {f.location}
                </div>
                <div className="text-[11px] text-braj-cream-600">
                  Managed by: {f.managedBy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parking Locations */}
        <div className="bg-white p-6 rounded-3xl border border-braj-cream-300 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-braj-indigo-600" />
            <h3 className="font-bold text-base text-braj-indigo-950">
              Authorized Parking & Transit Shuttles
            </h3>
          </div>
          <div className="space-y-3">
            {currentGuide.parkingInfo.map((p, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 text-xs space-y-1"
              >
                <div className="font-bold text-braj-indigo-950 flex items-center justify-between">
                  <span>{p.name}</span>
                  <StatusBadge variant="indigo" size="sm">
                    {p.distance}
                  </StatusBadge>
                </div>
                <div className="text-braj-cream-800">
                  <strong>Suitable for:</strong> {p.suitableFor}
                </div>
                {p.shuttleInfo && (
                  <div className="text-[11px] text-braj-saffron-800 font-medium">
                    Shuttle / Transit: {p.shuttleInfo}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety & Anti-Stampede Pilgrim Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-braj-indigo-950 text-white border border-braj-gold-500/40 space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-braj-gold-400" />
          <h3 className="font-bold text-base sm:text-lg text-white">
            Mathura Police & Mandir Seva Crowd Safety Guidelines
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-braj-cream-200 leading-relaxed">
          {currentGuide.safetyTips.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-braj-indigo-900/60 border border-braj-indigo-800 space-y-1.5">
              <span className="font-bold text-braj-gold-400 text-sm block">Rule #{idx + 1}</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gate Detail Slide-Over / Modal Panel */}
      {inspectedGate && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
        >
          <div className="bg-white rounded-3xl border border-braj-cream-300 max-w-xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-braj-cream-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-braj-indigo-950">
                    {inspectedGate.gateNumber}
                  </span>
                  <span className="text-base font-bold text-braj-indigo-900">
                    {inspectedGate.gateName}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {getGateTypeBadge(inspectedGate)}
                  <StatusBadge
                    variant={inspectedGate.verificationStatus === "verified" ? "success" : "warning"}
                    size="sm"
                  >
                    {inspectedGate.verificationStatus === "verified" ? "Verified" : "Pending"}
                  </StatusBadge>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedGate(null)}
                aria-label="Close gate audit panel"
                className="p-1.5 rounded-xl hover:bg-braj-cream-100 text-braj-cream-700 hover:text-braj-indigo-950 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Audit Details */}
            <div className="space-y-4 text-xs sm:text-sm text-braj-cream-900">
              <div className="space-y-1">
                <strong className="text-braj-indigo-950 block">Best For:</strong>
                <p>{inspectedGate.bestFor}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-braj-cream-50 border border-braj-cream-200 space-y-2">
                <strong className="text-braj-indigo-950 block">Accessibility Audit:</strong>
                <p className="text-xs">{inspectedGate.accessibility.details}</p>
                <div className="flex items-center gap-3 text-xs pt-1 border-t border-braj-cream-200">
                  <span>Wheelchair Ramp: <strong>{inspectedGate.accessibility.wheelchairRamp ? "Yes" : "No"}</strong></span>
                  <span>Step-Free: <strong>{inspectedGate.accessibility.stepFree ? "Yes" : "No"}</strong></span>
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-braj-indigo-950 block">Footwear Proximity:</strong>
                <p className="text-xs">{inspectedGate.footwearProximity}</p>
              </div>

              <div className="space-y-1">
                <strong className="text-braj-indigo-950 block">Security Screening:</strong>
                <p className="text-xs">{inspectedGate.securityCheck}</p>
              </div>

              {inspectedGate.warnings && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                  <strong>Warning:</strong> {inspectedGate.warnings}
                </div>
              )}

              {/* Real-Time Crowd Telemetry */}
              {inspectedGate.crowdObservation?.available ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5 text-emerald-950">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Crowd Observation (Verified)</span>
                  </div>
                  <div>
                    Crowd Level: <strong className="uppercase">{inspectedGate.crowdObservation.level}</strong>
                    {inspectedGate.crowdObservation.estimatedWaitMinutes !== undefined && (
                      <span> • Estimated Wait: ~{inspectedGate.crowdObservation.estimatedWaitMinutes} mins</span>
                    )}
                  </div>
                  {inspectedGate.crowdObservation.note && (
                    <p className="text-[11px] text-emerald-800 leading-relaxed">{inspectedGate.crowdObservation.note}</p>
                  )}
                  {inspectedGate.crowdObservation.observationTime && (
                    <div className="text-[10px] text-emerald-700 pt-1 border-t border-emerald-200/60">
                      Reported: {new Date(inspectedGate.crowdObservation.observationTime).toLocaleString()}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-braj-cream-50 border border-braj-cream-200 text-xs text-braj-cream-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-braj-cream-500" />
                  <span>Real-Time Telemetry: <em>{inspectedGate.crowdObservation?.note || "No live observation reported."}</em></span>
                </div>
              )}

              {/* Source & Verified Stamp */}
              <div className="p-3 rounded-xl bg-braj-cream-100 border border-braj-cream-200 text-xs space-y-1 text-braj-cream-800">
                <div><strong>Audit Authority:</strong> {inspectedGate.source}</div>
                <div><strong>Last Verified:</strong> {inspectedGate.lastVerified}</div>
                <div><strong>Coordinates:</strong> {inspectedGate.coordinates?.verified ? `${inspectedGate.coordinates.lat}° N, ${inspectedGate.coordinates.lng}° E` : "GPS Ground Audit Pending"}</div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-braj-cream-200 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInspectedGate(null)}
              >
                Close Audit
              </Button>

              {inspectedGate.coordinates?.verified && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${inspectedGate.coordinates.lat},${inspectedGate.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-braj-indigo-900 text-white text-xs font-semibold hover:bg-braj-indigo-800 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-braj-gold-400" />
                  <span>Open in Navigation</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 text-braj-gold-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default function GateFinderPage() {
  return (
    <Suspense
      fallback={
        <PageContainer paddingY="lg">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-48 bg-braj-cream-200 rounded" />
            <div className="h-12 w-96 bg-braj-cream-200 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-braj-cream-200 rounded-3xl" />
              ))}
            </div>
          </div>
        </PageContainer>
      }
    >
      <GateFinderContent />
    </Suspense>
  );
}
