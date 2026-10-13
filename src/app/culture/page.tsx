"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ArrowRight,
  Search,
  BookOpen,
  Scroll,
  History,
  HeartHandshake,
  X,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  CULTURAL_STORIES,
  CULTURAL_CATEGORIES,
  CulturalStory,
} from "@/data/culture";

export default function CulturePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStoryModal, setActiveStoryModal] = useState<CulturalStory | null>(null);

  // Filtered stories based on category & search query
  const filteredStories = useMemo(() => {
    return CULTURAL_STORIES.filter((story) => {
      const matchesCategory =
        selectedCategory === "all" || story.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.hindiTitle.toLowerCase().includes(q) ||
        story.excerpt.toLowerCase().includes(q) ||
        story.spiritualEssence.toLowerCase().includes(q) ||
        story.devotionalTradition.toLowerCase().includes(q) ||
        story.historicalContext.toLowerCase().includes(q) ||
        story.keyLocations.some((loc) => loc.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Braj Sanskriti & Heritage" },
        ]}
      />

      {/* Heading */}
      <SectionHeading
        badge="Cultural Discovery"
        badgeVariant="gold"
        title="Braj Sanskriti: Living Traditions, Seva & Lore"
        subtitle="Immerse yourself in the eternal devotion of Shri Radha-Krishna. Explore authentic traditions of Laddu Gopal Ji, childhood pastimes, sacred Raas lilas, Govardhan ecology, world-famous Holi, and timeless Braj heritage."
        align="left"
      />

      {/* SEARCH AND CATEGORY FILTER TABS */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-braj-indigo-950/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cultural lore (e.g., Laddu Gopal, Raas Lila, Govardhan, Lathmar Holi, Peda)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-braj-cream-300 bg-white text-sm text-braj-indigo-950 placeholder:text-braj-indigo-950/40 focus:border-braj-saffron-500 focus:outline-hidden shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-braj-indigo-950/50 hover:text-braj-indigo-950 p-1 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CULTURAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-braj-saffron-600 text-white shadow-2xs"
                    : "bg-white text-braj-indigo-950 border border-braj-cream-300 hover:border-braj-gold-400"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* STORIES COUNT & SUMMARY */}
      <div className="flex items-center justify-between text-xs text-braj-indigo-950/70 border-b border-braj-cream-200 pb-2">
        <span>
          Showing <strong>{filteredStories.length}</strong> of {CULTURAL_STORIES.length} cultural heritage sections
        </span>
        {selectedCategory !== "all" && (
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="text-braj-saffron-600 hover:underline font-semibold cursor-pointer"
          >
            Show All Sections
          </button>
        )}
      </div>

      {/* STORIES ARTICLES GRID */}
      <div className="space-y-10">
        {filteredStories.map((story) => (
          <article
            key={story.id}
            id={story.id}
            className="rounded-3xl border border-braj-cream-300 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 scroll-mt-24"
          >
            {/* Header Strip */}
            <div className="p-6 sm:p-7 border-b border-braj-cream-200 bg-gradient-to-r from-braj-cream-50/70 via-white to-braj-cream-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-braj-saffron-600 uppercase tracking-wider block">
                  {story.categoryLabel}
                </span>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-braj-indigo-950">
                    {story.title}
                  </h3>
                  <span className="text-sm font-semibold text-braj-saffron-700">
                    ({story.hindiTitle})
                  </span>
                </div>
              </div>

              <StatusBadge variant="gold" size="sm">
                Sacred Braj Heritage
              </StatusBadge>
            </div>

            {/* Content Body Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Narrative Content */}
              <div className="lg:col-span-8 space-y-4">
                <p className="text-sm sm:text-base text-braj-indigo-950/90 font-medium leading-relaxed italic border-l-4 border-braj-saffron-500 pl-4 py-0.5 bg-braj-cream-50/50 rounded-r-lg">
                  &ldquo;{story.excerpt}&rdquo;
                </p>

                <div className="space-y-3 pt-2">
                  {story.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm text-braj-indigo-950/80 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Educational Distinction Banner: Devotional Tradition vs Historical Context */}
                <div className="mt-5 rounded-2xl border border-braj-cream-300 bg-braj-cream-50/40 p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <HeartHandshake className="h-4 w-4 text-braj-saffron-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-braj-indigo-950 block">
                        Devotional Tradition (Bhakti Bhava):
                      </strong>
                      <p className="text-2xs sm:text-xs text-braj-indigo-950/80 leading-relaxed mt-0.5">
                        {story.devotionalTradition}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-braj-cream-200">
                    <History className="h-4 w-4 text-braj-indigo-950/70 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-braj-indigo-950 block">
                        Historical & Scriptural Context:
                      </strong>
                      <p className="text-2xs sm:text-xs text-braj-indigo-950/80 leading-relaxed mt-0.5">
                        {story.historicalContext}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 text-2xs text-braj-indigo-950/60 font-medium">
                    Verified Reference: <em>{story.scripturalSource}</em>
                  </div>
                </div>

                {/* Associated Temples Cross-Navigation */}
                {story.relatedTempleSlugs.length > 0 && (
                  <div className="pt-3">
                    <span className="text-2xs font-bold uppercase tracking-wider text-braj-indigo-950/60 block mb-2">
                      Associated Temples & Sanctums:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {story.relatedTempleSlugs.map((slug) => (
                        <Link
                          key={slug}
                          href={`/temples/${slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-braj-cream-300 text-braj-saffron-700 hover:border-braj-saffron-500 hover:shadow-2xs transition-all"
                        >
                          <MapPin className="h-3 w-3 text-braj-saffron-600" />
                          <span className="capitalize">{slug.replace(/-/g, " ")}</span>
                          <ArrowRight className="h-3 w-3 text-braj-saffron-500" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Visual & Sacred Locations */}
              <div className="lg:col-span-4 space-y-4">
                <div className="relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-braj-cream-300 shadow-2xs group">
                  <Image
                    src={story.imageUrl}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-braj-indigo-950/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold text-white drop-shadow-xs">
                      {story.spiritualEssence}
                    </span>
                  </div>
                </div>

                {/* Key Geographic Spots */}
                <div className="rounded-2xl border border-braj-cream-200 bg-braj-cream-50/50 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-braj-indigo-950 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-braj-saffron-600" />
                    Key Geography in Braj:
                  </h4>
                  <ul className="space-y-1.5">
                    {story.keyLocations.map((loc, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-braj-indigo-950/80 flex items-center gap-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-braj-saffron-500 shrink-0" />
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Read Full Heritage Modal Action */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStoryModal(story)}
                  className="w-full flex items-center justify-center gap-2 text-xs"
                >
                  <BookOpen className="h-3.5 w-3.5 text-braj-saffron-600" />
                  Read Complete Heritage Notes
                </Button>
              </div>
            </div>
          </article>
        ))}

        {filteredStories.length === 0 && (
          <div className="rounded-3xl border border-braj-cream-300 bg-white p-12 text-center space-y-3">
            <Scroll className="h-10 w-10 text-braj-indigo-950/40 mx-auto" />
            <h3 className="text-lg font-bold text-braj-indigo-950">
              No Cultural Articles Found
            </h3>
            <p className="text-xs sm:text-sm text-braj-indigo-950/70 max-w-md mx-auto">
              We couldn&apos;t find any cultural stories matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or browsing another category.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Reset Search & Filters
            </Button>
          </div>
        )}
      </div>

      {/* FULL HERITAGE ARTICLE MODAL / DIALOG */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 bg-braj-indigo-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-braj-cream-300 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-braj-cream-200 pb-4">
              <div>
                <span className="text-xs font-bold text-braj-saffron-600 uppercase tracking-wider block">
                  {activeStoryModal.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-braj-indigo-950 mt-1">
                  {activeStoryModal.title}
                </h3>
                <p className="text-sm font-semibold text-braj-saffron-700">
                  {activeStoryModal.hindiTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStoryModal(null)}
                className="p-2 rounded-xl text-braj-indigo-950/50 hover:text-braj-indigo-950 hover:bg-braj-cream-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200">
                <span className="text-xs font-bold text-braj-indigo-950 block">Spiritual Essence</span>
                <p className="text-xs sm:text-sm text-braj-indigo-950/80 mt-1 italic">
                  &ldquo;{activeStoryModal.spiritualEssence}&rdquo;
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-braj-indigo-950">Detailed Tradition & Seva Narrative:</h4>
                {activeStoryModal.content.map((p, i) => (
                  <p key={i} className="text-xs sm:text-sm text-braj-indigo-950/80 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="space-y-3 pt-3 border-t border-braj-cream-200">
                <div>
                  <strong className="text-xs font-bold text-braj-indigo-950 block">Devotional Tradition:</strong>
                  <p className="text-xs text-braj-indigo-950/80 mt-0.5">{activeStoryModal.devotionalTradition}</p>
                </div>
                <div>
                  <strong className="text-xs font-bold text-braj-indigo-950 block">Historical Context:</strong>
                  <p className="text-xs text-braj-indigo-950/80 mt-0.5">{activeStoryModal.historicalContext}</p>
                </div>
                <div>
                  <strong className="text-xs font-bold text-braj-indigo-950 block">Scriptural Verification:</strong>
                  <p className="text-xs text-braj-indigo-950/80 mt-0.5">{activeStoryModal.scripturalSource}</p>
                </div>
              </div>

              {activeStoryModal.relatedTempleSlugs.length > 0 && (
                <div className="pt-3 border-t border-braj-cream-200">
                  <span className="text-xs font-bold text-braj-indigo-950 block mb-2">Visit Associated Temples:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeStoryModal.relatedTempleSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/temples/${slug}`}
                        onClick={() => setActiveStoryModal(null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-braj-cream-100 text-braj-saffron-700 hover:bg-braj-saffron-50 transition-colors"
                      >
                        <MapPin className="h-3 w-3 text-braj-saffron-600" />
                        <span className="capitalize">{slug.replace(/-/g, " ")}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-braj-cream-200 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveStoryModal(null)}
              >
                Close Article
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
