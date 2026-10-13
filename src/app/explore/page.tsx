"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchX, MapPin, Landmark, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { SearchBar } from "@/components/ui/SearchBar";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { SACRED_DESTINATIONS } from "@/data/destinations";
import { TEMPLES_DATA } from "@/data/temples";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialDham = searchParams.get("destination") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDham, setSelectedDham] = useState(initialDham);

  const dhamsList = [
    { slug: "all", name: "All 6 Dhams" },
    { slug: "mathura", name: "Mathura" },
    { slug: "vrindavan", name: "Vrindavan" },
    { slug: "govardhan", name: "Govardhan" },
    { slug: "barsana", name: "Barsana" },
    { slug: "nandgaon", name: "Nandgaon" },
    { slug: "gokul", name: "Gokul" },
  ];

  const filteredDestinations = useMemo(() => {
    return SACRED_DESTINATIONS.filter((dham) => {
      const matchesDham = selectedDham === "all" || dham.slug === selectedDham;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesDham;

      const matchesQuery =
        dham.name.toLowerCase().includes(query) ||
        dham.hindiName.includes(query) ||
        dham.tagline.toLowerCase().includes(query) ||
        dham.description.toLowerCase().includes(query) ||
        dham.keyTemples.some((t) => t.toLowerCase().includes(query));

      return matchesDham && matchesQuery;
    });
  }, [searchQuery, selectedDham]);

  const filteredTemples = useMemo(() => {
    return TEMPLES_DATA.filter((temple) => {
      const matchesDham = selectedDham === "all" || temple.citySlug === selectedDham;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesDham;

      return (
        matchesDham &&
        (temple.name.toLowerCase().includes(query) ||
          temple.hindiName.includes(query) ||
          temple.city.toLowerCase().includes(query) ||
          temple.category.toLowerCase().includes(query) ||
          temple.description.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, selectedDham]);

  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Sacred Braj Mandala", href: "/" },
          { label: "Explore Dhams & Shrines" },
        ]}
      />

      {/* Page Heading */}
      <SectionHeading
        badge="Braj Explorer"
        badgeVariant="saffron"
        title="Explore the Sacred Braj Region"
        subtitle="Discover Mathura, Vrindavan, Govardhan, Barsana, Nandgaon, and Gokul with verified shrine information, distances, and sacred landmarks."
        align="left"
      />

      {/* Search and Filter Controls */}
      <div className="space-y-4">
        <div className="max-w-2xl">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            placeholder="Search by city, temple, kund, or heritage site..."
          />
        </div>

        {/* Dham Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {dhamsList.map((dham) => {
            const isSelected = selectedDham === dham.slug;
            return (
              <button
                key={dham.slug}
                type="button"
                onClick={() => setSelectedDham(dham.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-braj-saffron-600 text-white shadow-2xs font-semibold"
                    : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:border-braj-gold-400"
                }`}
              >
                {dham.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Section */}
      {filteredDestinations.length > 0 || filteredTemples.length > 0 ? (
        <div className="space-y-12">
          {/* Destinations Grid */}
          {filteredDestinations.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-braj-indigo-950 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-braj-saffron-600" />
                  <span>Sacred Holy Centers ({filteredDestinations.length})</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((dham) => (
                  <DestinationCard
                    key={dham.id}
                    destination={dham}
                    imageUrl={dham.imageUrl}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Connected Temples Preview */}
          {filteredTemples.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-braj-cream-300">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-braj-indigo-950 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-braj-gold-600" />
                  <span>Prominent Temples in This Area ({filteredTemples.length})</span>
                </h3>
                <Link
                  href="/temples"
                  className="text-xs font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 flex items-center gap-1"
                >
                  <span>View All Temples</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemples.map((temple) => (
                  <div
                    key={temple.id}
                    className="p-5 rounded-2xl bg-white border border-braj-cream-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-base text-braj-indigo-950">
                            {temple.name}
                          </h4>
                          <span className="text-xs font-medium text-braj-saffron-600">
                            {temple.city}
                          </span>
                        </div>
                        <StatusBadge
                          variant={temple.gateInfoStatus === "verified" ? "success" : "gold"}
                          size="sm"
                        >
                          {temple.gateInfoStatus === "verified" ? "Verified" : "Pending"}
                        </StatusBadge>
                      </div>

                      <p className="text-xs text-braj-cream-800 line-clamp-2">
                        {temple.description}
                      </p>

                      <div className="text-[11px] bg-braj-cream-50 p-2.5 rounded-lg border border-braj-cream-200 text-braj-indigo-950 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-braj-gold-600 shrink-0" />
                        <span className="truncate">{temple.openingHours.summer.morning}</span>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-braj-cream-200 flex items-center justify-between">
                      <Link
                        href={`/gate-finder`}
                        className="text-xs text-braj-cream-700 hover:text-braj-indigo-950"
                      >
                        Find Gates
                      </Link>
                      <Link
                        href={`/temples/${temple.slug}`}
                        className="text-xs font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 flex items-center gap-1"
                      >
                        <span>Timings & Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX className="w-8 h-8 text-braj-saffron-600" />}
          title="No Sacred Places Match Your Search"
          description={`We couldn't find any destination or temple matching "${searchQuery}". Reset filters to see all 6 sacred Dhams.`}
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedDham("all");
              }}
            >
              Reset Filters
            </Button>
          }
        />
      )}
    </PageContainer>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <PageContainer paddingY="lg">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-48 bg-braj-cream-300 rounded" />
            <div className="h-10 w-96 bg-braj-cream-200 rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-braj-cream-200 rounded-xl" />
              <div className="h-64 bg-braj-cream-200 rounded-xl" />
              <div className="h-64 bg-braj-cream-200 rounded-xl" />
            </div>
          </div>
        </PageContainer>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
