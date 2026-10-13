"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  SearchX,
  MapPin,
  Clock,
  DoorOpen,
  ArrowRight,
  Sun,
  ShieldCheck,
  CheckCircle2,
  Compass,
  SlidersHorizontal,
  X,
  Landmark,
  CalendarCheck,
  ArrowUpDown,
  Database as DatabaseIcon,
} from "lucide-react";
import { getTemples } from "@/services/templeDataService";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { SearchBar } from "@/components/ui/SearchBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import {
  getAllTemples,
  getCities,
  getCategories,
  TempleDetail,
} from "@/data/temples";

function TempleCard({ temple }: { temple: TempleDetail }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group rounded-3xl border border-braj-cream-300 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-braj-gold-400/80 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Top Image Banner */}
        <div className="relative h-48 sm:h-52 w-full bg-braj-cream-100 overflow-hidden">
          {!imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={temple.imageUrl}
              alt={`View of ${temple.name} (${temple.hindiName}) in ${temple.city}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-braj-indigo-950 via-braj-indigo-900 to-braj-indigo-950 flex flex-col items-center justify-center p-4 text-center">
              <Landmark className="w-8 h-8 text-braj-gold-300 mb-2" />
              <span className="font-bold text-white text-base">{temple.name}</span>
              <span className="text-xs text-braj-saffron-300">{temple.hindiName}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Region Badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
            <StatusBadge variant="indigo" size="sm" className="backdrop-blur-md shadow-2xs">
              {temple.city}
            </StatusBadge>
            <StatusBadge variant="gold" size="sm" className="backdrop-blur-md shadow-2xs">
              {temple.category}
            </StatusBadge>
          </div>

          {/* Verification Badge */}
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge
              variant={temple.gateInfoStatus === "verified" ? "success" : "warning"}
              dot
              size="sm"
              className="backdrop-blur-md shadow-2xs"
            >
              {temple.gateInfoStatus === "verified" ? "Verified" : "Pending"}
            </StatusBadge>
          </div>

          {/* Duration Badge Bottom Right */}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
              <Clock className="w-3 h-3 text-braj-gold-400" />
              <span>{temple.estimatedVisitDuration}</span>
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-braj-indigo-950 group-hover:text-braj-saffron-700 transition-colors leading-snug">
                {temple.name}
              </h3>
            </div>
            <p className="text-xs font-semibold text-braj-saffron-600 mt-0.5">
              {temple.hindiName}
            </p>

            <p className="text-xs sm:text-sm text-braj-cream-800 mt-2 leading-relaxed line-clamp-2">
              {temple.description}
            </p>
          </div>

          {/* Address & Darshan Timings Strip */}
          <div className="space-y-2 pt-2 border-t border-braj-cream-200">
            <div className="flex items-center gap-1.5 text-xs text-braj-cream-800">
              <MapPin className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
              <span className="truncate">{temple.address}</span>
            </div>

            {/* Summer Timing snippet */}
            <div className="p-2.5 rounded-xl bg-braj-cream-50 border border-braj-cream-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-medium text-braj-indigo-950 truncate">
                <Sun className="w-3.5 h-3.5 text-braj-saffron-600 shrink-0" />
                <span className="truncate">
                  {temple.openingHours.summer.morning} | {temple.openingHours.summer.evening}
                </span>
              </div>
              <span className="text-[10px] text-braj-cream-600 uppercase font-semibold shrink-0 ml-1">
                Summer
              </span>
            </div>

            {/* Gate Summary */}
            <div className="p-2.5 rounded-xl bg-braj-cream-100/60 border border-braj-cream-200 text-[11px] text-braj-indigo-950 space-y-1">
              <div className="flex items-center gap-1.5 text-braj-indigo-900 font-semibold">
                <DoorOpen className="w-3 h-3 text-braj-gold-600 shrink-0" />
                <span className="truncate">Entry: {temple.gateDetails.entry}</span>
              </div>
            </div>

            {/* Lat / Long Coordinates status */}
            <div className="flex items-center justify-between text-[11px] text-braj-cream-700 pt-1">
              <div className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-braj-indigo-600" />
                {temple.coordinates?.verified ? (
                  <span className="font-mono text-braj-indigo-950 font-medium">
                    {temple.coordinates.lat.toFixed(4)}° N, {temple.coordinates.lng.toFixed(4)}° E
                  </span>
                ) : (
                  <span className="text-braj-cream-600 italic">GPS in verification</span>
                )}
              </div>
              <span className="text-braj-saffron-700 font-medium">
                {temple.entryFee.split("(")[0].trim()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-5 pt-3 border-t border-braj-cream-200 bg-braj-cream-50/50 flex items-center justify-between gap-3">
        <Link
          href={`/gate-finder`}
          className="text-xs font-semibold text-braj-indigo-950 hover:text-braj-saffron-600 flex items-center gap-1 transition-colors"
        >
          <DoorOpen className="w-3.5 h-3.5 text-braj-gold-600" />
          <span>Gate Map</span>
        </Link>

        <Link href={`/temples/${temple.slug}`}>
          <Button variant="primary" size="sm" className="text-xs">
            <span>View Full Guide</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </article>
  );
}

function TemplesDirectoryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const initialCity = searchParams.get("city") || "all";
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState<"name-asc" | "name-desc" | "city">("name-asc");

  const [temples, setTemples] = useState<TempleDetail[]>(() => getAllTemples());
  const [dataMeta, setDataMeta] = useState<{ isLiveDatabase: boolean; label: string }>({
    isLiveDatabase: false,
    label: "Local Verified Catalog",
  });

  useEffect(() => {
    let active = true;
    getTemples().then((result) => {
      if (active) {
        setTemples(result.data);
        setDataMeta({
          isLiveDatabase: result.isLiveDatabase,
          label: result.sourceLabel,
        });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const cities = useMemo(() => getCities(), []);
  const categories = useMemo(() => getCategories(), []);

  // Filter & Sort Logic
  const filteredTemples = useMemo(() => {
    let result = temples.filter((temple) => {
      // City filter
      const matchesCity =
        selectedCity === "all" || temple.citySlug === selectedCity.toLowerCase();

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        selectedCategory === "All Categories" ||
        temple.category === selectedCategory;

      // Search query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCity && matchesCategory;

      const matchesSearch =
        temple.name.toLowerCase().includes(query) ||
        temple.hindiName.includes(query) ||
        temple.city.toLowerCase().includes(query) ||
        temple.category.toLowerCase().includes(query) ||
        temple.description.toLowerCase().includes(query) ||
        temple.culturalSignificance.toLowerCase().includes(query) ||
        temple.address.toLowerCase().includes(query);

      return matchesCity && matchesCategory && matchesSearch;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortOrder === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sortOrder === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sortOrder === "city") {
        return a.city.localeCompare(b.city) || a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [temples, searchQuery, selectedCity, selectedCategory, sortOrder]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCity !== "all" ||
    (selectedCategory !== "all" && selectedCategory !== "All Categories");

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("all");
    setSelectedCategory("all");
    setSortOrder("name-asc");
  };

  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Sacred Temple Directory" },
        ]}
      />

      {/* Main Section Heading */}
      <SectionHeading
        badge="Sacred Sanctorums of Braj"
        badgeVariant="gold"
        title="Explore Sacred Temples & Dham Destinations"
        subtitle="Searchable directory of verified mandirs, parikrama hills, holy kunds, and ghats across Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, and Gokul with verified darshan schedules and gate logistics."
        align="left"
      />

      {/* Database Integration Status Strip */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-2xl bg-braj-cream-100/70 border border-braj-cream-300 text-xs">
        <div className="flex items-center gap-2">
          <DatabaseIcon className={`w-4 h-4 ${dataMeta.isLiveDatabase ? "text-emerald-600" : "text-amber-600"}`} />
          <span className="font-semibold text-braj-indigo-950">
            Source: <span className="font-normal">{dataMeta.label}</span>
          </span>
        </div>
        <StatusBadge
          variant={dataMeta.isLiveDatabase ? "success" : "neutral"}
          size="sm"
          dot
        >
          {dataMeta.isLiveDatabase ? "Supabase Live Connected" : "Local Development Fallback"}
        </StatusBadge>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-5 bg-white p-6 rounded-3xl border border-braj-cream-300 shadow-2xs">
        {/* Top Row: Search and Sort Control */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 max-w-xl">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              placeholder="Search by temple name, deity, or region (e.g. Banke Bihari, Janmabhoomi, Govardhan)..."
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-braj-cream-800 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-braj-gold-600" />
              <span>Sort:</span>
            </div>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "name-asc" | "name-desc" | "city")
              }
              aria-label="Sort temples"
              className="text-xs bg-braj-cream-50 border border-braj-cream-300 rounded-xl px-3 py-2 text-braj-indigo-950 font-semibold focus:outline-none focus:border-braj-saffron-500 cursor-pointer"
            >
              <option value="name-asc">Alphabetical (A → Z)</option>
              <option value="name-desc">Alphabetical (Z → A)</option>
              <option value="city">By Region / City</option>
            </select>
          </div>
        </div>

        {/* City Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-braj-cream-700 font-medium">
            <span>Filter by Sacred Region:</span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-braj-saffron-600 hover:text-braj-saffron-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {cities.map((city) => {
              const isSelected = selectedCity === city.slug;
              const count =
                city.slug === "all"
                  ? temples.length
                  : temples.filter((t: TempleDetail) => t.citySlug === city.slug).length;

              return (
                <button
                  key={city.slug}
                  type="button"
                  onClick={() => setSelectedCity(city.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-braj-indigo-900 text-white shadow-2xs font-semibold"
                      : "bg-braj-cream-50 text-braj-indigo-950 border border-braj-cream-300 hover:border-braj-gold-400 hover:bg-white"
                  }`}
                >
                  <span>{city.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-braj-gold-500 text-braj-indigo-950 font-bold"
                        : "bg-braj-cream-200 text-braj-cream-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 border-t border-braj-cream-200 flex items-center gap-2 overflow-x-auto pb-1">
          <div className="flex items-center gap-1 text-xs text-braj-cream-700 font-medium mr-1 shrink-0">
            <SlidersHorizontal className="w-3 h-3 text-braj-gold-600" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => {
            const isSelected =
              (cat === "All Categories" && selectedCategory === "all") ||
              selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setSelectedCategory(cat === "All Categories" ? "all" : cat)
                }
                className={`px-3 py-1 rounded-lg text-xs transition-colors duration-150 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-braj-saffron-500 text-white font-semibold shadow-2xs"
                    : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:border-braj-saffron-400 hover:bg-braj-saffron-50/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Count Status Strip */}
      <div className="flex items-center justify-between text-xs text-braj-cream-800 px-1">
        <div>
          Showing{" "}
          <strong className="text-braj-indigo-950 font-bold">
            {filteredTemples.length}
          </strong>{" "}
          of {temples.length} sacred destinations across Braj
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified Trust Data
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-braj-indigo-900 bg-braj-indigo-50 px-2 py-0.5 rounded-md border border-braj-indigo-200 text-[11px] font-medium">
            <ShieldCheck className="w-3 h-3 text-braj-indigo-600" />
            Zero Fake Fees
          </span>
        </div>
      </div>

      {/* Temples Grid */}
      {filteredTemples.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX className="w-8 h-8 text-braj-saffron-600" />}
          title="No Sacred Places Match Your Query"
          description={`We couldn't find any temple or shrine matching "${searchQuery}" with the current filters. Reset filters to explore all 12 key sanctums.`}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
            >
              Reset All Filters
            </Button>
          }
        />
      )}

      {/* Verification Standards & Trust Notice */}
      <div className="p-6 rounded-3xl bg-braj-cream-100/70 border border-braj-cream-300 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-braj-indigo-950">
          <CalendarCheck className="w-4 h-4 text-braj-gold-600" />
          <span>BrajMitra Data Integrity & Verification Standard</span>
        </div>
        <p className="text-xs text-braj-cream-800 leading-relaxed">
          Operational darshan schedules, seasonal aarti times, entry gates, and footwear counters are verified against official Temple Trusts, UP Tourism records, and verified pilgrim documentation. Entry to sanctums across Braj Bhoomi is universally free; any voluntary pujas or prasad receipts are administered exclusively through official trust counters.
        </p>
      </div>
    </PageContainer>
  );
}

export default function TemplesPage() {
  return (
    <Suspense
      fallback={
        <PageContainer paddingY="lg">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-48 bg-braj-cream-200 rounded" />
            <div className="h-12 w-96 bg-braj-cream-200 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-braj-cream-200 rounded-3xl" />
              ))}
            </div>
          </div>
        </PageContainer>
      }
    >
      <TemplesDirectoryContent />
    </Suspense>
  );
}
