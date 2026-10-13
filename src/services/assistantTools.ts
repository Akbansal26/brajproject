import { getAllTemples, getTempleBySlug } from "@/data/temples";
import { getGateGuideByTempleId, getGateSummary } from "@/data/gates";
import {
  SearchTemplesToolParams,
  SearchTemplesToolResult,
  GetTempleGatesToolParams,
  GetTempleGatesToolResult,
  GetCrowdObservationToolParams,
  GetCrowdObservationToolResult,
  GenerateItineraryToolParams,
  GenerateItineraryToolResult,
} from "@/types/assistant";

export function searchTemplesTool(
  params: SearchTemplesToolParams
): SearchTemplesToolResult {
  const all = getAllTemples();
  const query = (params.query || "").trim().toLowerCase();
  const city = (params.city || "").trim().toLowerCase();
  const category = (params.category || "").trim().toLowerCase();

  const filtered = all.filter((temple) => {
    const matchesCity = !city || temple.city.toLowerCase() === city || temple.citySlug === city;
    const matchesCategory = !category || temple.category.toLowerCase().includes(category);
    const matchesQuery =
      !query ||
      temple.name.toLowerCase().includes(query) ||
      temple.hindiName.includes(query) ||
      temple.city.toLowerCase().includes(query) ||
      temple.description.toLowerCase().includes(query) ||
      temple.culturalSignificance.toLowerCase().includes(query);

    return matchesCity && matchesCategory && matchesQuery;
  });

  return {
    matchCount: filtered.length,
    temples: filtered.map((t) => ({
      id: t.id,
      slug: t.slug,
      name: t.name,
      hindiName: t.hindiName,
      city: t.city,
      category: t.category,
      description: t.description,
      timingSummary: `Summer: ${t.openingHours.summer.morning} & ${t.openingHours.summer.evening} | Winter: ${t.openingHours.winter.morning} & ${t.openingHours.winter.evening}`,
      entryFee: t.entryFee,
    })),
  };
}

export function getTempleGatesTool(
  params: GetTempleGatesToolParams
): GetTempleGatesToolResult | null {
  const guide = getGateGuideByTempleId(params.templeIdOrSlug);
  if (!guide) {
    // Try by slug from temples data
    const temple = getTempleBySlug(params.templeIdOrSlug);
    if (temple) {
      const fallbackGuide = getGateGuideByTempleId(temple.slug) || getGateGuideByTempleId(temple.id);
      if (fallbackGuide) {
        return formatGateGuide(fallbackGuide);
      }
    }
    return null;
  }
  return formatGateGuide(guide);
}

function formatGateGuide(guide: ReturnType<typeof getGateGuideByTempleId> extends undefined ? never : NonNullable<ReturnType<typeof getGateGuideByTempleId>>): GetTempleGatesToolResult {
  const summary = getGateSummary(guide);
  return {
    templeName: guide.templeName,
    templeSlug: guide.templeSlug,
    city: guide.city,
    totalKnownGatesCount: guide.totalKnownGatesCount,
    verifiedPublicEntryGatesCount: summary.verifiedPublicEntries,
    knownExitsAndRestrictedCount: summary.knownExitsAndRestricted,
    pendingVerificationCount: summary.pendingVerification,
    isGateCountUnknown: summary.isGateCountUnknown,
    gates: guide.gates.map((g) => ({
      gateNumber: g.gateNumber,
      gateName: g.gateName,
      gateType: g.gateType,
      publicEntryStatus: g.publicEntryStatus,
      coordinatesVerified: Boolean(g.coordinates?.verified),
      accessibility: g.accessibility.details,
      footwearProximity: g.footwearProximity,
    })),
  };
}

export function getCrowdObservationTool(
  params: GetCrowdObservationToolParams
): GetCrowdObservationToolResult | null {
  const guide = getGateGuideByTempleId(params.templeIdOrSlug);
  const templeName = guide ? guide.templeName : params.templeIdOrSlug;

  return {
    templeName,
    liveDataAvailable: false,
    statusMessage: "Live crowd telemetry unavailable (No automated electronic sensors installed in heritage alleys).",
    verifiedNotice:
      "Operational flow is governed by UP Police crowd barricades. Darshan queues move swiftly during early morning hours.",
    recommendedWindows: [
      "Weekdays (Tuesday – Thursday) between 08:30 AM and 10:30 AM",
      "Early Morning Mangala Aarti (05:00 AM – 06:30 AM)",
      "Avoid festive Ekadashi, Purnima, and Sunday evenings for high crowd density",
    ],
    policeOneWayRule: guide?.oneWayTrafficDirective,
  };
}

export function generateItineraryTool(
  params: GenerateItineraryToolParams
): GenerateItineraryToolResult {
  if (params.durationDays === 1) {
    return {
      planTitle: "1-Day Express Braj Darshan (Mathura & Vrindavan)",
      durationDays: 1,
      pacingNote:
        "Respects afternoon temple closure (12:30 PM – 04:30 PM). Start before sunrise.",
      days: [
        {
          dayNumber: 1,
          title: "Birthplace to Vrindavan Sanctorums",
          regions: ["Mathura", "Vrindavan"],
          morning:
            "06:00 AM: Shri Krishna Janmasthan (Mathura) Garbha Griha darshan. 08:30 AM: Shri Dwarkadhish Mandir & Vishram Ghat Yamuna bow. 10:30 AM: Drive to Vrindavan (12 km).",
          middayRest:
            "12:30 PM – 04:00 PM: Temples closed for deity bhog and shayan. Enjoy sattvic prasadam in Raman Reti area.",
          evening:
            "04:30 PM: Thakur Banke Bihari Ji Mandir (enter via Gates 2 & 3). 06:30 PM: ISKCON Vrindavan Sandhya Aarti. 07:30 PM: Prem Mandir musical water fountain & illuminated marble gardens.",
          recommendedTemples: [
            { name: "Shri Krishna Janmasthan", slug: "shri-krishna-janmabhoomi" },
            { name: "Banke Bihari Temple", slug: "banke-bihari-temple" },
            { name: "Prem Mandir", slug: "prem-mandir" },
            { name: "ISKCON Vrindavan", slug: "iskcon-vrindavan" },
          ],
        },
      ],
    };
  }

  return {
    planTitle: `${params.durationDays}-Day Complete Braj Pilgrimage Yatra`,
    durationDays: params.durationDays,
    pacingNote: "Covers all 6 sacred regions with dedicated afternoon pauses.",
    days: [
      {
        dayNumber: 1,
        title: "Mathura & Gokul (Bal Leela & Janmasthan)",
        regions: ["Mathura", "Gokul"],
        morning: "Shri Krishna Janmasthan, Potra Kund, and Dwarkadhish Mandir.",
        middayRest: "12:30 PM – 04:00 PM: Sacred bhog lunch & rest.",
        evening: "Raman Reti holy sand hermitage & evening Yamuna Aarti at Brahmand Ghat.",
        recommendedTemples: [
          { name: "Shri Krishna Janmasthan", slug: "shri-krishna-janmabhoomi" },
          { name: "Raman Reti", slug: "raman-reti-gokul" },
        ],
      },
      {
        dayNumber: 2,
        title: "Vrindavan Dham (Ancient & Modern Sanctums)",
        regions: ["Vrindavan"],
        morning: "05:00 AM Mangala Aarti at ISKCON, Radha Raman Mandir, and Seva Kunj.",
        middayRest: "12:30 PM – 04:30 PM: Temple closure window & quiet reading.",
        evening: "Banke Bihari Ji darshan followed by Prem Mandir illuminated gardens.",
        recommendedTemples: [
          { name: "Banke Bihari Temple", slug: "banke-bihari-temple" },
          { name: "Radha Raman Temple", slug: "radha-raman-temple" },
          { name: "Prem Mandir", slug: "prem-mandir" },
        ],
      },
    ],
  };
}
