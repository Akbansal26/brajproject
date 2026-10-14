"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  DoorOpen,
  CheckCircle2,
  Eye,
  Edit3,
  Search,
  Save,
  ExternalLink,
  Info,
  FileCheck,
  Database as DatabaseIcon,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { TEMPLES_DATA, TempleDetail } from "@/data/temples";
import { GATE_GUIDES, GateRecord, TempleGateGuide } from "@/data/gates";
import {
  getTemples,
  getGateGuides,
  getVerificationSources,
  VerificationSourceItem,
} from "@/services/templeDataService";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type AdminTab = "temples" | "gates" | "verification" | "crowd";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("temples");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCityFilter, setSelectedCityFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Local editable in-memory states (Development / Demo only)
  const [temples, setTemples] = useState<TempleDetail[]>(TEMPLES_DATA);
  const [gateGuides, setGateGuides] = useState<TempleGateGuide[]>(GATE_GUIDES);
  const [verificationSources, setVerificationSources] = useState<VerificationSourceItem[]>([]);
  const [isDbConfigured] = useState(() => isSupabaseConfigured());
  const [dataSourceLabel, setDataSourceLabel] = useState("Local Memory / Fallback");

  useEffect(() => {
    let active = true;
    getTemples().then((res) => {
      if (active) {
        setTemples(res.data);
        setDataSourceLabel(res.sourceLabel);
      }
    });

    getGateGuides().then((res) => {
      if (active) {
        setGateGuides(res.data);
      }
    });

    getVerificationSources().then((res) => {
      if (active) {
        setVerificationSources(res.data);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Edit modal / drawer state
  const [editingTemple, setEditingTemple] = useState<TempleDetail | null>(null);
  const [editingGate, setEditingGate] = useState<{
    templeSlug: string;
    gate: GateRecord;
  } | null>(null);

  // Success toast simulated state
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 4000);
  };

  // Filtered Temples
  const filteredTemples = useMemo(() => {
    return temples.filter((t) => {
      const matchesCity =
        selectedCityFilter === "all" ||
        t.citySlug.toLowerCase() === selectedCityFilter.toLowerCase();
      const matchesStatus =
        selectedStatusFilter === "all" ||
        t.gateInfoStatus === selectedStatusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.hindiName.includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q);

      return matchesCity && matchesStatus && matchesQuery;
    });
  }, [temples, selectedCityFilter, selectedStatusFilter, searchQuery]);

  // Flattened Gate Records with Temple Context
  const allGateEntries = useMemo(() => {
    const list: {
      templeName: string;
      templeSlug: string;
      city: string;
      gate: GateRecord;
    }[] = [];

    gateGuides.forEach((guide) => {
      guide.gates.forEach((g) => {
        list.push({
          templeName: guide.templeName,
          templeSlug: guide.templeSlug,
          city: guide.city,
          gate: g,
        });
      });
    });

    return list;
  }, [gateGuides]);

  // Filtered Gates
  const filteredGates = useMemo(() => {
    return allGateEntries.filter((item) => {
      const matchesCity =
        selectedCityFilter === "all" ||
        item.city.toLowerCase() === selectedCityFilter.toLowerCase();
      const matchesStatus =
        selectedStatusFilter === "all" ||
        item.gate.verificationStatus === selectedStatusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.gate.gateName.toLowerCase().includes(q) ||
        item.gate.gateNumber.toLowerCase().includes(q) ||
        item.templeName.toLowerCase().includes(q) ||
        item.gate.source.toLowerCase().includes(q);

      return matchesCity && matchesStatus && matchesQuery;
    });
  }, [allGateEntries, selectedCityFilter, selectedStatusFilter, searchQuery]);

  // Crowd Observation items
  const crowdObservations = useMemo(() => {
    return allGateEntries.filter((item) => item.gate.crowdObservation?.available);
  }, [allGateEntries]);

  // Handle Temple Edit Save (In-Memory Only)
  const handleSaveTemple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemple) return;

    setTemples((prev) =>
      prev.map((t) => (t.id === editingTemple.id ? { ...editingTemple } : t))
    );
    showNotice(
      `Temple "${editingTemple.name}" updated in local UI state. (In-memory only; not persisted to database)`
    );
    setEditingTemple(null);
  };

  // Handle Gate Edit Save (In-Memory Only)
  const handleSaveGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGate) return;

    setGateGuides((prev) =>
      prev.map((guide) => {
        if (guide.templeSlug !== editingGate.templeSlug) return guide;
        return {
          ...guide,
          gates: guide.gates.map((g) =>
            g.id === editingGate.gate.id ? { ...editingGate.gate } : g
          ),
        };
      })
    );
    showNotice(
      `Gate "${editingGate.gate.gateName}" updated in local UI state. (In-memory only; not persisted to database)`
    );
    setEditingGate(null);
  };

  return (
    <PageContainer paddingY="lg" className="space-y-8">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Admin Console (Dev Only)" },
        ]}
      />

      {/* Heading */}
      <SectionHeading
        badge="Internal Development"
        badgeVariant="saffron"
        title="BrajMitra Data Audit & Admin Console"
        subtitle="Manage sanctum directories, gate records, operational authorization, and verification provenance. Inspect audit sources and review crowd observation feeds."
        align="left"
      />

      {/* SUPABASE INTEGRATION & PERSISTENCE NOTICE BANNER */}
      <div className={`rounded-2xl border-2 p-5 sm:p-6 shadow-xs ${isDbConfigured ? "border-amber-300 bg-amber-50/80" : "border-red-300 bg-red-50/80"}`}>
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-xl shrink-0 ${isDbConfigured ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
            <DatabaseIcon className="h-6 w-6" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isDbConfigured ? "bg-amber-200 text-amber-900" : "bg-red-200 text-red-900"}`}>
                Phase 2 Integration • {isDbConfigured ? "Supabase Client Detected" : "Supabase Not Configured"}
              </span>
              <span className="text-xs font-medium text-braj-indigo-950/70">
                • Active Read Source: <strong className="text-braj-indigo-950">{dataSourceLabel}</strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-braj-indigo-950/80 leading-relaxed">
              {isDbConfigured
                ? "Supabase client credentials are configured. Live queries for temples, gates, verification sources, and observations are active. Direct writes in this console are managed in-memory unless signed in with an authorized administrative role under Supabase Row Level Security (RLS)."
                : "Supabase environment variables are currently unconfigured. The application is operating on the offline verified catalog fallback. To connect live Supabase PostgreSQL, copy .env.example to .env.local and execute the migration script in supabase/migrations/."}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Notice Toast */}
      {feedbackNotice && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs font-semibold text-emerald-900 flex items-center justify-between shadow-xs animate-in fade-in duration-200">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {feedbackNotice}
          </span>
          <button
            type="button"
            onClick={() => setFeedbackNotice(null)}
            className="text-emerald-700 hover:text-emerald-950 text-2xs uppercase cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ADMIN METRICS SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-braj-cream-300 bg-white p-4 shadow-2xs">
          <span className="text-2xs font-bold text-braj-indigo-950/60 uppercase">Total Temples</span>
          <p className="text-2xl font-bold text-braj-indigo-950 mt-1">{temples.length}</p>
          <span className="text-2xs text-braj-saffron-600 font-semibold">Across all 6 sacred regions</span>
        </div>
        <div className="rounded-2xl border border-braj-cream-300 bg-white p-4 shadow-2xs">
          <span className="text-2xs font-bold text-braj-indigo-950/60 uppercase">Total Gates Indexed</span>
          <p className="text-2xl font-bold text-braj-indigo-950 mt-1">{allGateEntries.length}</p>
          <span className="text-2xs text-emerald-600 font-semibold">
            {allGateEntries.filter((g) => g.gate.verificationStatus === "verified").length} Verified Records
          </span>
        </div>
        <div className="rounded-2xl border border-braj-cream-300 bg-white p-4 shadow-2xs">
          <span className="text-2xs font-bold text-braj-indigo-950/60 uppercase">Pending Audits</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {allGateEntries.filter((g) => g.gate.verificationStatus === "pending_verification").length}
          </p>
          <span className="text-2xs text-amber-800 font-semibold">Requires on-ground survey</span>
        </div>
        <div className="rounded-2xl border border-braj-cream-300 bg-white p-4 shadow-2xs">
          <span className="text-2xs font-bold text-braj-indigo-950/60 uppercase">Crowd Feeds</span>
          <p className="text-2xl font-bold text-braj-indigo-950 mt-1">{crowdObservations.length}</p>
          <span className="text-2xs text-braj-indigo-950/60 font-semibold">Sample observation records</span>
        </div>
      </div>

      {/* ADMIN WORKFLOW TABS */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-braj-cream-300 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("temples")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "temples"
              ? "bg-braj-indigo-950 text-white shadow-xs"
              : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Temple Directory ({filteredTemples.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("gates")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "gates"
              ? "bg-braj-indigo-950 text-white shadow-xs"
              : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
          }`}
        >
          <DoorOpen className="h-4 w-4" />
          Gate Records ({filteredGates.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("verification")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "verification"
              ? "bg-braj-indigo-950 text-white shadow-xs"
              : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
          }`}
        >
          <FileCheck className="h-4 w-4" />
          Verification & Sources
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("crowd")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "crowd"
              ? "bg-braj-indigo-950 text-white shadow-xs"
              : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:bg-braj-cream-100"
          }`}
        >
          <Eye className="h-4 w-4" />
          Crowd Observations ({crowdObservations.length})
        </button>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-braj-cream-300 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-braj-indigo-950/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, gate, number, city, or source..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-braj-cream-300 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* City Filter */}
          <select
            value={selectedCityFilter}
            onChange={(e) => setSelectedCityFilter(e.target.value)}
            className="rounded-xl border border-braj-cream-300 bg-white px-3 py-2 text-xs font-semibold text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
          >
            <option value="all">All Regions</option>
            <option value="mathura">Mathura</option>
            <option value="vrindavan">Vrindavan</option>
            <option value="govardhan">Govardhan</option>
            <option value="barsana">Barsana</option>
            <option value="nandgaon">Nandgaon</option>
            <option value="gokul">Gokul</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="rounded-xl border border-braj-cream-300 bg-white px-3 py-2 text-xs font-semibold text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
          >
            <option value="all">All Verification Statuses</option>
            <option value="verified">Verified Only</option>
            <option value="pending_verification">Pending Verification</option>
          </select>

          {(searchQuery || selectedCityFilter !== "all" || selectedStatusFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCityFilter("all");
                setSelectedStatusFilter("all");
              }}
              className="text-xs text-braj-saffron-600 hover:underline font-semibold px-2 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: TEMPLE DIRECTORY MANAGEMENT */}
      {activeTab === "temples" && (
        <section className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-braj-cream-300 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-braj-cream-300 bg-braj-cream-50/80">
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Temple & City</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Verification</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Coordinates</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Source & Last Verified</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-braj-cream-200">
                {filteredTemples.map((temple) => (
                  <tr key={temple.id} className="hover:bg-braj-cream-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-braj-indigo-950">{temple.name}</div>
                      <div className="text-2xs text-braj-indigo-950/60 font-medium">
                        {temple.hindiName} • <span className="text-braj-saffron-700">{temple.city}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge
                        variant={temple.gateInfoStatus === "verified" ? "success" : "gold"}
                        size="sm"
                      >
                        {temple.gateInfoStatus === "verified" ? "Verified" : "Pending Audit"}
                      </StatusBadge>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono">
                      {temple.coordinates?.verified ? (
                        <span className="text-emerald-700">
                          {temple.coordinates.lat.toFixed(4)}, {temple.coordinates.lng.toFixed(4)}
                        </span>
                      ) : (
                        <span className="text-braj-indigo-950/40 italic">Unverified / None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-2xs font-semibold text-braj-indigo-950/80 line-clamp-1">
                        {temple.source}
                      </div>
                      <div className="text-2xs text-braj-indigo-950/50">
                        Audited: {temple.lastVerified}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/temples/${temple.slug}`}
                          className="p-1.5 rounded-lg text-braj-indigo-950/60 hover:text-braj-saffron-600 hover:bg-braj-cream-100 transition-colors"
                          title="View public page"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setEditingTemple(temple)}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-braj-cream-100 text-braj-indigo-950 hover:bg-braj-saffron-50 hover:text-braj-saffron-700 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Edit3 className="h-3 w-3" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: GATE RECORD MANAGEMENT */}
      {activeTab === "gates" && (
        <section className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-braj-cream-300 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-braj-cream-300 bg-braj-cream-50/80">
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Gate & Temple</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Gate Type</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Public Entry</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Status</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Provenance</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-braj-cream-200">
                {filteredGates.map((item) => (
                  <tr key={item.gate.id} className="hover:bg-braj-cream-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-braj-indigo-950">
                        {item.gate.gateNumber}: {item.gate.gateName}
                      </div>
                      <div className="text-2xs text-braj-indigo-950/60 font-medium">
                        {item.templeName} ({item.city})
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded bg-braj-cream-100 text-braj-indigo-950">
                        {item.gate.gateType.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-2xs font-bold uppercase px-2 py-0.5 rounded ${
                          item.gate.publicEntryStatus === "authorized"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.gate.publicEntryStatus === "exit_only"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.gate.publicEntryStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge
                        variant={item.gate.verificationStatus === "verified" ? "success" : "gold"}
                        size="sm"
                      >
                        {item.gate.verificationStatus === "verified" ? "Verified" : "Pending"}
                      </StatusBadge>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-2xs font-semibold text-braj-indigo-950/80 line-clamp-1">
                        {item.gate.source}
                      </div>
                      <div className="text-2xs text-braj-indigo-950/50">
                        Verified: {item.gate.lastVerified}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingGate({
                            templeSlug: item.templeSlug,
                            gate: item.gate,
                          })
                        }
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-braj-cream-100 text-braj-indigo-950 hover:bg-braj-saffron-50 hover:text-braj-saffron-700 transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Edit3 className="h-3 w-3" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 3: VERIFICATION STATUS & DATA PROVENANCE AUDIT */}
      {activeTab === "verification" && (
        <section className="space-y-6">
          <div className="rounded-3xl border border-braj-cream-300 bg-white p-6 sm:p-8 shadow-2xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-braj-indigo-950 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-braj-saffron-600" />
              Verification Standards & Operational Audit Checklist
            </h3>
            <p className="text-xs sm:text-sm text-braj-indigo-950/70">
              In BrajMitra AI, factual operational data (gates, timings, wheelchairs, coordinates) requires positive evidence from official trust notices or verified on-ground surveys before being flagged as verified.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1.5">
                <span className="text-xs font-bold text-emerald-900 uppercase">
                  Fully Verified Criteria
                </span>
                <p className="text-2xs sm:text-xs text-emerald-800 leading-relaxed">
                  Active gate verified by District Police circular or official temple board signpost. Coordinates acquired by GPS survey.
                </p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 space-y-1.5">
                <span className="text-xs font-bold text-amber-900 uppercase">
                  Pending Verification Criteria
                </span>
                <p className="text-2xs sm:text-xs text-amber-800 leading-relaxed">
                  Gate known from pilgrim lore or community feedback, but exact coordinate or door access rules are awaiting formal confirmation.
                </p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 space-y-1.5">
                <span className="text-xs font-bold text-blue-900 uppercase">
                  Restricted & Exit Corridors
                </span>
                <p className="text-2xs sm:text-xs text-blue-800 leading-relaxed">
                  Exclusively designated for outbound crowd evacuation or VIP passes. Public entrance attempts strictly prohibited by police barriers.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Sources Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-braj-indigo-950 flex items-center gap-2">
              <DatabaseIcon className="w-4 h-4 text-braj-saffron-600" />
              <span>Registered Verification Sources ({verificationSources.length})</span>
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-braj-cream-300 bg-white shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-braj-cream-300 bg-braj-cream-50/80">
                    <th className="py-3 px-4 font-bold text-braj-indigo-950">Source Authority / Entity</th>
                    <th className="py-3 px-4 font-bold text-braj-indigo-950">Source Type</th>
                    <th className="py-3 px-4 font-bold text-braj-indigo-950">Reference / Contact</th>
                    <th className="py-3 px-4 font-bold text-braj-indigo-950">Last Audit Date</th>
                    <th className="py-3 px-4 font-bold text-braj-indigo-950">Audit Scope</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-braj-cream-200">
                  {verificationSources.map((source) => (
                    <tr key={source.id} className="hover:bg-braj-cream-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-braj-indigo-950">{source.name}</div>
                        <div className="text-2xs font-mono text-braj-cream-700">ID: {source.id.slice(0, 8)}...</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize text-xs font-semibold px-2 py-0.5 rounded bg-braj-cream-100 text-braj-indigo-950 border border-braj-cream-300">
                          {source.sourceType.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-braj-indigo-950/80">
                        {source.referenceUrl ? (
                          <a
                            href={source.referenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-braj-saffron-700 hover:underline flex items-center gap-1"
                          >
                            <span>{source.contactInfo || "Reference Link"}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span>{source.contactInfo || "Internal Official Filing"}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-braj-indigo-950">
                        {source.verificationDate}
                      </td>
                      <td className="py-3.5 px-4 text-2xs text-braj-cream-800">
                        {source.notes || "Official verification of pedestrian rules and gate access."}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* TAB 4: CROWD OBSERVATION REVIEW */}
      {activeTab === "crowd" && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-braj-gold-400 bg-amber-50/50 p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-braj-gold-600 shrink-0 mt-0.5" />
            <p className="text-xs text-braj-indigo-950/80 leading-relaxed">
              <strong>Observation Data Review Policy:</strong> Live crowd metrics and wait times are only published when supported by fresh verified observations. Guessed or synthesized live numbers must never be displayed to pilgrims.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-braj-cream-300 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-braj-cream-300 bg-braj-cream-50/80">
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Gate & Temple</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Recorded Crowd Level</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Est. Wait Time</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Observation Time</th>
                  <th className="py-3 px-4 font-bold text-braj-indigo-950">Observer Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-braj-cream-200">
                {crowdObservations.length > 0 ? (
                  crowdObservations.map((item) => (
                    <tr key={item.gate.id} className="hover:bg-braj-cream-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-braj-indigo-950">
                          {item.gate.gateNumber}: {item.gate.gateName}
                        </div>
                        <div className="text-2xs text-braj-indigo-950/60 font-medium">
                          {item.templeName} ({item.city})
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          {item.gate.crowdObservation?.level || "Unknown"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-braj-indigo-950">
                        {item.gate.crowdObservation?.estimatedWaitMinutes
                          ? `${item.gate.crowdObservation.estimatedWaitMinutes} mins`
                          : "N/A"}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-braj-indigo-950/70">
                        {item.gate.crowdObservation?.observationTime
                          ? new Date(item.gate.crowdObservation.observationTime).toLocaleString()
                          : "Historical Baseline"}
                      </td>
                      <td className="py-3.5 px-4 text-2xs text-braj-indigo-950/80">
                        {item.gate.crowdObservation?.note || "Routine observation report."}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-braj-cream-700">
                      No real-time crowd observations recorded in database yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TEMPLE EDIT FORM MODAL (IN-MEMORY DEMO) */}
      {editingTemple && (
        <div className="fixed inset-0 z-50 bg-braj-indigo-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveTemple}
            className="bg-white rounded-3xl border border-braj-cream-300 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-braj-cream-200 pb-3">
              <div>
                <span className="text-2xs font-bold text-braj-saffron-600 uppercase tracking-wider block">
                  Edit Temple Record (In-Memory Demo)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-braj-indigo-950 mt-0.5">
                  {editingTemple.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTemple(null)}
                className="text-braj-indigo-950/50 hover:text-braj-indigo-950 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-braj-indigo-950 block">Temple Name</label>
                <input
                  type="text"
                  value={editingTemple.name}
                  onChange={(e) =>
                    setEditingTemple({ ...editingTemple, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-braj-indigo-950 block">Hindi Name</label>
                <input
                  type="text"
                  value={editingTemple.hindiName}
                  onChange={(e) =>
                    setEditingTemple({ ...editingTemple, hindiName: e.target.value })
                  }
                  className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-braj-indigo-950 block">Verification Status</label>
                  <select
                    value={editingTemple.gateInfoStatus}
                    onChange={(e) =>
                      setEditingTemple({
                        ...editingTemple,
                        gateInfoStatus: e.target.value as "verified" | "pending_verification",
                      })
                    }
                    className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending_verification">Pending Verification</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-braj-indigo-950 block">Last Verified Date</label>
                  <input
                    type="text"
                    value={editingTemple.lastVerified}
                    onChange={(e) =>
                      setEditingTemple({ ...editingTemple, lastVerified: e.target.value })
                    }
                    className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-braj-indigo-950 block">Audit Source Citation</label>
                <input
                  type="text"
                  value={editingTemple.source}
                  onChange={(e) =>
                    setEditingTemple({ ...editingTemple, source: e.target.value })
                  }
                  className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-braj-cream-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingTemple(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="flex items-center gap-1.5">
                <Save className="h-4 w-4" />
                Save Locally (Demo)
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* GATE EDIT FORM MODAL (IN-MEMORY DEMO) */}
      {editingGate && (
        <div className="fixed inset-0 z-50 bg-braj-indigo-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveGate}
            className="bg-white rounded-3xl border border-braj-cream-300 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-braj-cream-200 pb-3">
              <div>
                <span className="text-2xs font-bold text-braj-saffron-600 uppercase tracking-wider block">
                  Edit Gate Record (In-Memory Demo)
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-braj-indigo-950 mt-0.5">
                  {editingGate.gate.gateNumber}: {editingGate.gate.gateName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingGate(null)}
                className="text-braj-indigo-950/50 hover:text-braj-indigo-950 p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-bold text-braj-indigo-950 block">Gate Name</label>
                <input
                  type="text"
                  value={editingGate.gate.gateName}
                  onChange={(e) =>
                    setEditingGate({
                      ...editingGate,
                      gate: { ...editingGate.gate, gateName: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-braj-indigo-950 block">Public Entry Status</label>
                  <select
                    value={editingGate.gate.publicEntryStatus}
                    onChange={(e) =>
                      setEditingGate({
                        ...editingGate,
                        gate: {
                          ...editingGate.gate,
                          publicEntryStatus: e.target.value as
                            | "authorized"
                            | "exit_only"
                            | "restricted_passes_only"
                            | "emergency_only"
                            | "unverified",
                        },
                      })
                    }
                    className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                  >
                    <option value="authorized">Authorized (Open Entry)</option>
                    <option value="exit_only">Exit Only</option>
                    <option value="restricted_passes_only">Restricted / Passes Only</option>
                    <option value="emergency_only">Emergency Only</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-braj-indigo-950 block">Verification Status</label>
                  <select
                    value={editingGate.gate.verificationStatus}
                    onChange={(e) =>
                      setEditingGate({
                        ...editingGate,
                        gate: {
                          ...editingGate.gate,
                          verificationStatus: e.target.value as "verified" | "pending_verification",
                        },
                      })
                    }
                    className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending_verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-braj-indigo-950 block">Source & Verification Citation</label>
                <input
                  type="text"
                  value={editingGate.gate.source}
                  onChange={(e) =>
                    setEditingGate({
                      ...editingGate,
                      gate: { ...editingGate.gate, source: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-braj-indigo-950 block">Operational Notes / Best For</label>
                <input
                  type="text"
                  value={editingGate.gate.bestFor}
                  onChange={(e) =>
                    setEditingGate({
                      ...editingGate,
                      gate: { ...editingGate.gate, bestFor: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-braj-cream-300 p-2.5 bg-braj-cream-50/50 text-braj-indigo-950 focus:border-braj-saffron-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-braj-cream-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingGate(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="flex items-center gap-1.5">
                <Save className="h-4 w-4" />
                Save Locally (Demo)
              </Button>
            </div>
          </form>
        </div>
      )}
    </PageContainer>
  );
}
