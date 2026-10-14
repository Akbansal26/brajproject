import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  DoorOpen,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Car,
  Footprints,
  Compass,
  Database as DatabaseIcon,
} from "lucide-react";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageBreadcrumb } from "@/components/ui/PageBreadcrumb";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import {
  getAllTemples,
  getRelatedTemples,
} from "@/data/temples";
import {
  getTempleBySlug as fetchTempleBySlug,
  getGatesForTemple,
} from "@/services/templeDataService";

interface TemplePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const staticSlugs = getAllTemples().map((temple) => ({
    slug: temple.slug,
  }));
  const dbSlugs = [
    { slug: "dwarkadhish-temple" },
    { slug: "govardhan-hill-parikrama" },
  ];
  return [...staticSlugs, ...dbSlugs];
}

export default async function TempleDetailPage({ params }: TemplePageProps) {
  const { slug } = await params;
  const result = await fetchTempleBySlug(slug);
  const temple = result.data;

  if (!temple) {
    notFound();
  }

  const gatesResult = await getGatesForTemple(temple.slug);
  const gates = gatesResult.data;

  const relatedTemples = getRelatedTemples(temple.slug, temple.city, 3);

  return (
    <PageContainer paddingY="lg" className="space-y-10">
      {/* Breadcrumb Trail */}
      <PageBreadcrumb
        items={[
          { label: "Braj Bhoomi", href: "/" },
          { label: "Sacred Temple Directory", href: "/temples" },
          { label: temple.name },
        ]}
      />

      {/* Database Integration Status Strip */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 rounded-2xl bg-braj-cream-100/70 border border-braj-cream-300 text-xs">
        <div className="flex items-center gap-2">
          <DatabaseIcon className={`w-4 h-4 ${result.isLiveDatabase ? "text-emerald-600" : "text-amber-600"}`} />
          <span className="font-semibold text-braj-indigo-950">
            Source: <span className="font-normal">{result.sourceLabel}</span>
          </span>
          {result.error && (
            <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Notice: {result.error}
            </span>
          )}
        </div>
        <StatusBadge
          variant={result.isLiveDatabase ? "success" : "neutral"}
          size="sm"
          dot
        >
          {result.isLiveDatabase ? "Supabase Live Connected" : "Local Development Fallback"}
        </StatusBadge>
      </div>

      {/* Main Shrine Profile Hero Banner */}
      <div className="rounded-3xl border border-braj-cream-300 bg-white shadow-xs overflow-hidden">
        <div className="relative h-64 sm:h-96 w-full bg-braj-indigo-950 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={temple.imageUrl}
            alt={`Sanctum and architecture of ${temple.name} (${temple.hindiName}) in ${temple.city}`}
            className="w-full h-full object-cover opacity-85"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-braj-indigo-950 via-braj-indigo-950/40 to-transparent" />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 flex-wrap z-10">
            <div className="flex items-center gap-2">
              <StatusBadge variant="indigo" size="md">
                {temple.city}
              </StatusBadge>
              <StatusBadge variant="gold" size="md">
                {temple.category}
              </StatusBadge>
            </div>

            <StatusBadge
              variant={temple.gateInfoStatus === "verified" ? "success" : "warning"}
              dot
              size="md"
            >
              {temple.gateInfoStatus === "verified"
                ? "Information Verified"
                : "Verification Pending"}
            </StatusBadge>
          </div>

          {/* Bottom Title Bar inside Image */}
          <div className="absolute bottom-6 left-6 right-6 z-10 text-white space-y-1.5">
            <span className="text-xs font-semibold text-braj-saffron-400 uppercase tracking-widest block">
              {temple.city} Dham • Sacred Shrine Guide
            </span>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                {temple.name}
              </h1>
              <span className="text-lg sm:text-2xl font-semibold text-braj-gold-300">
                ({temple.hindiName})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-braj-cream-200 pt-1">
              <MapPin className="w-4 h-4 text-braj-saffron-400 shrink-0" />
              <span>{temple.address}</span>
            </div>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="p-6 bg-braj-cream-50 border-b border-braj-cream-300 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-braj-cream-700 font-medium block">
              Estimated Duration:
            </span>
            <strong className="text-braj-indigo-950 font-bold text-sm block">
              {temple.estimatedVisitDuration}
            </strong>
          </div>

          <div className="space-y-1">
            <span className="text-braj-cream-700 font-medium block">
              Entry Fee:
            </span>
            <strong className="text-braj-indigo-950 font-bold text-sm block">
              {temple.entryFee}
            </strong>
          </div>

          <div className="space-y-1">
            <span className="text-braj-cream-700 font-medium block">
              Data Source:
            </span>
            <span className="text-braj-indigo-950 font-semibold block truncate" title={temple.source}>
              {temple.source}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-braj-cream-700 font-medium block">
              Last Verified:
            </span>
            <strong className="text-braj-gold-800 font-bold block">
              {temple.lastVerified}
            </strong>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Overview & Cultural Significance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-braj-indigo-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-braj-saffron-600" />
                <span>Overview & Description</span>
              </h2>
              <p className="text-sm sm:text-base text-braj-cream-900 leading-relaxed">
                {temple.description}
              </p>

              <div className="pt-2">
                <h3 className="text-base font-bold text-braj-indigo-950 mb-2">
                  Cultural & Spiritual Significance (माहात्म्य)
                </h3>
                <div className="p-4 rounded-2xl bg-braj-gold-50/70 border border-braj-gold-300/60 text-xs sm:text-sm text-braj-gold-950 leading-relaxed">
                  {temple.culturalSignificance}
                </div>
              </div>
            </div>

            {/* Quick Action Side Box */}
            <div className="p-6 rounded-2xl bg-braj-cream-100/60 border border-braj-cream-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-braj-saffron-700 uppercase tracking-wider block">
                  Pilgrim Action Center
                </span>
                <h4 className="font-bold text-base text-braj-indigo-950">
                  Planning to Visit this Shrine?
                </h4>
                <p className="text-xs text-braj-cream-800 leading-relaxed">
                  Add {temple.name} to your automated pilgrimage itinerary or consult AI Mitra for live seasonal crowds and quiet morning windows.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link href="/planner" className="w-full block">
                  <Button variant="primary" size="md" className="w-full text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    <span>Add to Yatra Itinerary</span>
                  </Button>
                </Link>

                <Link href="/assistant" className="w-full block">
                  <Button variant="secondary" size="md" className="w-full text-xs font-semibold">
                    <span>Ask AI Mitra Assistant</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Seasonal Darshan & Aarti Schedules */}
          <div className="space-y-4 pt-6 border-t border-braj-cream-200">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-braj-indigo-950 flex items-center gap-2">
                <Clock className="w-5 h-5 text-braj-gold-600" />
                <span>Verified Darshan & Aarti Schedule</span>
              </h2>
              <StatusBadge
                variant={temple.openingHours.status === "verified" ? "success" : "warning"}
                dot
              >
                {temple.openingHours.status === "verified"
                  ? "Schedule Verified"
                  : "Hours Pending Verification"}
              </StatusBadge>
            </div>

            <p className="text-xs sm:text-sm text-braj-cream-800">
              Temple timings in Braj shift between Summer (Grishma) and Winter (Sheetkaal) to honor the seva schedule and comfort of the Lord.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Summer Timings */}
              <div className="p-5 rounded-2xl bg-braj-saffron-50/60 border border-braj-saffron-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-braj-saffron-900">
                  <Sun className="w-4 h-4 text-braj-saffron-600" />
                  <span>Summer Schedule (चैत्र – आश्विन)</span>
                </div>
                <div className="text-xs sm:text-sm space-y-1.5 text-braj-indigo-950">
                  <div><strong>Morning Darshan:</strong> {temple.openingHours.summer.morning}</div>
                  <div><strong>Evening Darshan:</strong> {temple.openingHours.summer.evening}</div>
                  {temple.openingHours.summer.aarti && (
                    <div className="pt-2 text-xs text-braj-saffron-800 font-medium border-t border-braj-saffron-200">
                      {temple.openingHours.summer.aarti}
                    </div>
                  )}
                </div>
              </div>

              {/* Winter Timings */}
              <div className="p-5 rounded-2xl bg-braj-indigo-50/60 border border-braj-indigo-200 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-braj-indigo-950">
                  <Moon className="w-4 h-4 text-braj-indigo-600" />
                  <span>Winter Schedule (कार्तिक – फाल्गुन)</span>
                </div>
                <div className="text-xs sm:text-sm space-y-1.5 text-braj-indigo-950">
                  <div><strong>Morning Darshan:</strong> {temple.openingHours.winter.morning}</div>
                  <div><strong>Evening Darshan:</strong> {temple.openingHours.winter.evening}</div>
                  {temple.openingHours.winter.aarti && (
                    <div className="pt-2 text-xs text-braj-indigo-800 font-medium border-t border-braj-indigo-200">
                      {temple.openingHours.winter.aarti}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Verified Gate Access & Logistics */}
          <div className="space-y-6 pt-6 border-t border-braj-cream-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-braj-indigo-950 flex items-center gap-2">
                    <DoorOpen className="w-5 h-5 text-braj-saffron-600" />
                    <span>Verified Gate Access & Logistics</span>
                  </h2>
                  <StatusBadge
                    variant={temple.gateDetails.status === "verified" ? "success" : "warning"}
                    dot
                  >
                    {temple.gateDetails.status === "verified"
                      ? "Gate Routing Verified"
                      : "Gates Pending Verification"}
                  </StatusBadge>
                </div>
                <p className="text-xs text-braj-cream-700 mt-1">
                  Demarcated access portals, police pedestrian flow, and crowd routing for {temple.name}.
                </p>
              </div>

              <Link href={`/gate-finder?temple=${temple.slug}`}>
                <Button variant="primary" size="sm" className="text-xs shrink-0 shadow-2xs">
                  <Compass className="w-3.5 h-3.5 mr-1 text-braj-gold-400" />
                  <span>Open in Gate Finder</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            {/* High-Level Arrival Facilities Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-950">
                  <DoorOpen className="w-4 h-4 text-emerald-600" />
                  <span>Entry Gate</span>
                </div>
                <p className="text-xs text-braj-cream-800">{temple.gateDetails.entry}</p>
              </div>

              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-950">
                  <DoorOpen className="w-4 h-4 text-braj-saffron-600" />
                  <span>Exit Gate</span>
                </div>
                <p className="text-xs text-braj-cream-800">{temple.gateDetails.exit}</p>
              </div>

              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-950">
                  <Footprints className="w-4 h-4 text-braj-gold-600" />
                  <span>Footwear Counter</span>
                </div>
                <p className="text-xs text-braj-cream-800">{temple.gateDetails.footwear}</p>
              </div>

              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-950">
                  <Car className="w-4 h-4 text-braj-indigo-600" />
                  <span>Parking Proximity</span>
                </div>
                <p className="text-xs text-braj-cream-800">{temple.gateDetails.parking}</p>
              </div>

              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Wheelchair Accessible</span>
                </div>
                <p className="text-xs text-braj-cream-800">
                  {temple.gateDetails.wheelchairAccess
                    ? "Yes, ramps and ground access provided"
                    : "Limited access due to historic steps and narrow gali"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-braj-cream-50 border border-braj-cream-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-braj-indigo-950">
                  <MapPin className="w-4 h-4 text-braj-saffron-600" />
                  <span>GPS Coordinates</span>
                </div>
                <p className="text-xs text-braj-cream-800 font-mono">
                  {temple.coordinates?.verified
                    ? `${temple.coordinates.lat.toFixed(4)}° N, ${temple.coordinates.lng.toFixed(4)}° E (Verified)`
                    : "Coordinates pending field verification"}
                </p>
              </div>
            </div>

            {/* Individual Verified Gate Cards from Database */}
            {gates.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-braj-cream-800 font-medium">
                  <span className="font-bold text-braj-indigo-950">
                    Surveyed Gate Access Portals ({gates.length})
                  </span>
                  <Link
                    href={`/gate-finder?temple=${temple.slug}`}
                    className="text-braj-saffron-600 hover:text-braj-saffron-700 font-semibold flex items-center gap-1"
                  >
                    <span>View all on live radar map</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gates.map((g) => {
                    const isEntry =
                      g.gateType === "main_entrance" || g.gateType === "secondary_entrance";
                    const isExit = g.gateType === "exit_only";

                    return (
                      <div
                        key={g.id}
                        className="p-4 rounded-2xl border border-braj-cream-300 bg-white shadow-2xs hover:border-braj-gold-400 transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <div className="font-extrabold text-sm text-braj-indigo-950">
                                {g.gateNumber}
                              </div>
                              <div className="font-semibold text-xs text-braj-indigo-900">
                                {g.gateName}
                              </div>
                            </div>
                            <StatusBadge
                              variant={
                                isEntry
                                  ? "success"
                                  : isExit
                                  ? "saffron"
                                  : "indigo"
                              }
                              size="sm"
                            >
                              {isEntry
                                ? "Public Entrance"
                                : isExit
                                ? "Exit Only"
                                : "Restricted"}
                            </StatusBadge>
                          </div>

                          <p className="text-[11px] text-braj-cream-800 leading-relaxed line-clamp-2">
                            {g.bestFor}
                          </p>

                          {/* Accessibility & Crowd Tags */}
                          <div className="flex items-center gap-2 flex-wrap text-[10px] pt-1">
                            {g.accessibility.wheelchairRamp && (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                                Wheelchair Ramp
                              </span>
                            )}
                            {g.accessibility.stepFree && (
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                                Step-Free
                              </span>
                            )}
                            {g.crowdObservation?.available && (
                              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold uppercase">
                                Crowd: {g.crowdObservation.level}
                                {g.crowdObservation.estimatedWaitMinutes !== undefined &&
                                  ` (~${g.crowdObservation.estimatedWaitMinutes}m)`}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-braj-cream-200 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-braj-cream-600">
                            {g.coordinates?.verified ? (
                              <span className="font-mono text-emerald-800">GPS Verified</span>
                            ) : (
                              <span className="italic text-braj-cream-500">GPS Pending</span>
                            )}
                          </span>

                          <Link
                            href={`/gate-finder?temple=${temple.slug}&gate=${g.id}`}
                            className="inline-flex items-center gap-1 font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 text-xs"
                          >
                            <span>Highlight on Map</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Rules & Pilgrim Etiquette */}
          <div className="p-6 rounded-2xl bg-braj-indigo-950 text-white border border-braj-gold-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-braj-saffron-400" />
              <h3 className="font-bold text-base text-white">
                Shrine Etiquette & Pilgrim Advisory
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-braj-cream-200">
              {temple.rules.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-braj-indigo-900/60 border border-braj-gold-500/10">
                  <span className="text-braj-gold-400 font-bold shrink-0">{idx + 1}.</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Destinations Section */}
      {relatedTemples.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-braj-saffron-700 uppercase tracking-wider block">
                Explore More in {temple.city}
              </span>
              <h3 className="text-xl font-bold text-braj-indigo-950 mt-0.5">
                Related Sacred Destinations
              </h3>
            </div>
            <Link
              href="/temples"
              className="text-xs font-semibold text-braj-saffron-600 hover:text-braj-saffron-700 flex items-center gap-1"
            >
              <span>View All Shrines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTemples.map((rel) => (
              <Link
                key={rel.id}
                href={`/temples/${rel.slug}`}
                className="group rounded-2xl border border-braj-cream-300 bg-white p-5 shadow-2xs hover:shadow-md hover:border-braj-gold-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <StatusBadge variant="indigo" size="sm">
                      {rel.city}
                    </StatusBadge>
                    <span className="text-[11px] font-medium text-braj-cream-700">
                      {rel.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-braj-indigo-950 group-hover:text-braj-saffron-600 transition-colors">
                      {rel.name}
                    </h4>
                    <span className="text-xs font-medium text-braj-saffron-700 block mt-0.5">
                      {rel.hindiName}
                    </span>
                  </div>

                  <p className="text-xs text-braj-cream-800 line-clamp-2">
                    {rel.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-braj-cream-200 flex items-center justify-between text-xs font-semibold text-braj-saffron-600 group-hover:text-braj-saffron-700">
                  <span>View Temple Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
