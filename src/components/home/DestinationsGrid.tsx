"use client";

import React, { useState, useMemo } from "react";
import { SearchX } from "lucide-react";
import { PageContainer } from "../ui/PageContainer";
import { SectionHeading } from "../ui/SectionHeading";
import { SearchBar } from "../ui/SearchBar";
import { DestinationCard } from "../ui/DestinationCard";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";
import { SACRED_DESTINATIONS } from "@/data/destinations";

export const DestinationsGrid: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return SACRED_DESTINATIONS;

    return SACRED_DESTINATIONS.filter((dham) => {
      return (
        dham.name.toLowerCase().includes(query) ||
        dham.hindiName.includes(query) ||
        dham.tagline.toLowerCase().includes(query) ||
        dham.keyTemples.some((t) => t.toLowerCase().includes(query)) ||
        dham.description.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-braj-cream-100 scroll-mt-16">
      <PageContainer>
        {/* Section Heading */}
        <SectionHeading
          badge="Sacred Braj Mandala"
          badgeVariant="saffron"
          title="The Six Sacred Holy Dhams"
          subtitle="Every dust particle (Raja) of these six holy abodes carries eternal memories of Lord Krishna's pastimes and the deep love of Shri Radha Rani."
          align="center"
        />

        {/* Search Bar for Filtering Dhams */}
        <div id="search-section" className="max-w-xl mx-auto mb-10 scroll-mt-24">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery("")}
            placeholder="Search by dham name, mandir, or kund (e.g. Bankey Bihari, Radha Kund)..."
          />
          {searchQuery && (
            <p className="text-xs text-braj-cream-700 mt-2 text-center">
              Showing {filteredDestinations.length} of {SACRED_DESTINATIONS.length} sacred destinations
            </p>
          )}
        </div>

        {/* Results Grid or Empty State */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((dham) => (
              <div key={dham.id} id={dham.slug} className="scroll-mt-24">
                <DestinationCard
                  destination={dham}
                  imageUrl={dham.imageUrl}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<SearchX className="w-7 h-7 text-braj-saffron-600" />}
            title="No Sacred Dhams Found"
            description={`We couldn't find any holy dham or mandir matching "${searchQuery}". Try searching for 'Mathura', 'Vrindavan', 'Govardhan', or 'Barsana'.`}
            action={
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                Clear Search Filter
              </Button>
            }
          />
        )}
      </PageContainer>
    </section>
  );
};
