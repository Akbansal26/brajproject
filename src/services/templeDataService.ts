import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import {
  TempleDetail,
  getTempleBySlug as getStaticTempleBySlug,
  getAllTemples as getStaticAllTemples,
} from "@/data/temples";
import {
  TempleGateGuide,
  GateRecord,
  getGateGuideByTempleId as getStaticGateGuide,
  getAllGateGuides as getStaticAllGateGuides,
} from "@/data/gates";
import { Database } from "@/types/database";

export interface DataFetchResult<T> {
  data: T;
  isLiveDatabase: boolean;
  sourceLabel: string;
  error?: string;
}

export interface VerificationSourceItem {
  id: string;
  name: string;
  sourceType: string;
  contactInfo: string | null;
  referenceUrl: string | null;
  notes: string | null;
  verificationDate: string;
}

export interface GateCrowdObservationItem {
  id: string;
  gateId: string;
  templeId: string;
  observationTimestamp: string;
  crowdLevel: "low" | "moderate" | "heavy" | "very_heavy";
  estimatedWaitMinutes: number | null;
  reporterType: string;
  notes: string | null;
  isVerified: boolean;
}

/**
 * Maps a Supabase database temple record to the application's TempleDetail interface.
 */
function mapDbTempleToTempleDetail(
  row: Database["public"]["Tables"]["temples"]["Row"]
): TempleDetail {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    hindiName: row.hindi_name,
    city: row.city as TempleDetail["city"],
    citySlug: row.city_slug as TempleDetail["citySlug"],
    category: row.category as TempleDetail["category"],
    description: row.description,
    culturalSignificance: row.cultural_significance,
    address: row.address,
    imageUrl: row.image_url,
    coordinates:
      row.latitude !== null && row.longitude !== null
        ? {
            lat: Number(row.latitude),
            lng: Number(row.longitude),
            verified: row.location_verified,
          }
        : null,
    estimatedVisitDuration: row.estimated_visit_duration,
    gateInfoStatus: row.gate_info_status as TempleDetail["gateInfoStatus"],
    entryFee: row.entry_fee,
    openingHours: (row.opening_hours as unknown as TempleDetail["openingHours"]) || {
      summer: { morning: "05:00 AM - 12:00 PM", evening: "04:00 PM - 09:00 PM" },
      winter: { morning: "05:30 AM - 12:00 PM", evening: "03:30 PM - 08:30 PM" },
      status: "pending_verification",
    },
    gateDetails: (row.gate_details as unknown as TempleDetail["gateDetails"]) || {
      entry: "Gate 1",
      exit: "Gate 2",
      footwear: "Designated counter outside",
      wheelchairAccess: false,
      parking: "Public municipal parking",
      status: "pending_verification",
    },
    source: row.source,
    lastVerified: row.last_verified,
    rules: row.rules || [],
  };
}

/**
 * Maps a Supabase gate row to the application's GateRecord interface.
 */
function mapDbGateToGateRecord(
  row: Database["public"]["Tables"]["temple_gates"]["Row"],
  latestObs?: Database["public"]["Tables"]["gate_crowd_observations"]["Row"]
): GateRecord {
  return {
    id: row.id,
    gateNumber: row.gate_number,
    gateName: row.gate_name,
    gateType: row.gate_type as GateRecord["gateType"],
    publicEntryStatus: row.public_entry_status as GateRecord["publicEntryStatus"],
    operationalStatus: row.operational_status as GateRecord["operationalStatus"],
    verificationStatus: (row.verification_status === "verified" ||
    row.verification_status === "field_verified" ||
    row.verification_status === "authority_verified"
      ? "verified"
      : "pending_verification") as GateRecord["verificationStatus"],
    coordinates:
      row.latitude !== null && row.longitude !== null
        ? {
            lat: Number(row.latitude),
            lng: Number(row.longitude),
            verified: row.coordinates_verified,
          }
        : null,
    accessibility: {
      wheelchairRamp: row.wheelchair_ramp,
      stepFree: row.step_free,
      details: row.accessibility_details || "No accessibility audit remarks recorded.",
      verified: row.coordinates_verified,
    },
    footwearProximity: row.footwear_proximity || "Inquire at temple entrance",
    securityCheck: row.security_check || "Standard physical security check",
    bestFor: row.best_for || "All pilgrims",
    warnings: row.warnings || undefined,
    source: row.verification_source_id ? `Source ID: ${row.verification_source_id}` : "Audited field data",
    lastVerified: row.last_verified,
    crowdObservation: latestObs
      ? {
          available: true,
          level: latestObs.crowd_level,
          estimatedWaitMinutes: latestObs.estimated_wait_minutes ?? undefined,
          observationTime: latestObs.observation_timestamp,
          note: latestObs.notes ?? undefined,
        }
      : {
          available: false,
          note: "No real-time observation reported in the past hour.",
        },
    isDemoRecord: false,
  };
}

/**
 * Retrieve all temples with automatic fallback to static verified records.
 */
export async function getTemples(): Promise<DataFetchResult<TempleDetail[]>> {
  if (!isSupabaseConfigured()) {
    return {
      data: getStaticAllTemples(),
      isLiveDatabase: false,
      sourceLabel: "Local Verified Catalog (Supabase Unconfigured)",
    };
  }

  try {
    const client = getSupabaseBrowserClient();
    if (!client) {
      return {
        data: getStaticAllTemples(),
        isLiveDatabase: false,
        sourceLabel: "Local Verified Catalog (Client Initializing)",
      };
    }

    const { data, error } = await client
      .from("temples")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      return {
        data: getStaticAllTemples(),
        isLiveDatabase: false,
        sourceLabel: "Local Verified Catalog (Database Query Fallback)",
        error: error?.message,
      };
    }

    const mapped = data.map(mapDbTempleToTempleDetail);
    return {
      data: mapped,
      isLiveDatabase: true,
      sourceLabel: "Live Supabase Database",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      data: getStaticAllTemples(),
      isLiveDatabase: false,
      sourceLabel: "Local Verified Catalog (Connection Error)",
      error: msg,
    };
  }
}

/**
 * Retrieve a specific temple by its slug or ID with automatic fallback.
 */
export async function getTempleBySlug(
  slug: string
): Promise<DataFetchResult<TempleDetail | null>> {
  if (!isSupabaseConfigured()) {
    const temple = getStaticTempleBySlug(slug);
    return {
      data: temple || null,
      isLiveDatabase: false,
      sourceLabel: "Local Verified Catalog (Supabase Unconfigured)",
    };
  }

  try {
    const client = getSupabaseBrowserClient();
    if (!client) {
      const temple = getStaticTempleBySlug(slug);
      return {
        data: temple || null,
        isLiveDatabase: false,
        sourceLabel: "Local Verified Catalog",
      };
    }

    const cleanSlug = slug.trim().toLowerCase();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanSlug);

    // Build candidates for known slug variations between DB and static catalog
    const slugCandidates = [cleanSlug];
    if (
      cleanSlug === "dwarkadhish-temple" ||
      cleanSlug === "dwarkadhish-temple-mathura" ||
      cleanSlug === "dwarkadhish-mathura"
    ) {
      slugCandidates.push("dwarkadhish-temple", "dwarkadhish-temple-mathura", "dwarkadhish-mathura");
    } else if (
      cleanSlug === "govardhan-hill-parikrama" ||
      cleanSlug === "govardhan-hill-giriraj"
    ) {
      slugCandidates.push("govardhan-hill-parikrama", "govardhan-hill-giriraj");
    }
    const uniqueSlugs = Array.from(new Set(slugCandidates));

    let query = client.from("temples").select("*");

    if (isUuid) {
      query = query.or(`id.eq.${cleanSlug},slug.eq.${cleanSlug}`);
    } else if (uniqueSlugs.length === 1) {
      query = query.eq("slug", uniqueSlugs[0]);
    } else {
      query = query.in("slug", uniqueSlugs);
    }

    const { data, error } = await query.limit(1).maybeSingle();

    if (error || !data) {
      const temple = getStaticTempleBySlug(slug);
      return {
        data: temple || null,
        isLiveDatabase: false,
        sourceLabel: "Local Verified Catalog (Fallback)",
        error: error?.message,
      };
    }

    return {
      data: mapDbTempleToTempleDetail(data),
      isLiveDatabase: true,
      sourceLabel: "Live Supabase Database",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      data: getStaticTempleBySlug(slug) || null,
      isLiveDatabase: false,
      sourceLabel: "Local Verified Catalog (Error Fallback)",
      error: msg,
    };
  }
}

/**
 * Retrieve gate guides with automatic fallback.
 */
export async function getGateGuides(): Promise<DataFetchResult<TempleGateGuide[]>> {
  if (!isSupabaseConfigured()) {
    return {
      data: getStaticAllGateGuides(),
      isLiveDatabase: false,
      sourceLabel: "Local Verified Guides (Supabase Unconfigured)",
    };
  }

  try {
    const client = getSupabaseBrowserClient();
    if (!client) {
      return {
        data: getStaticAllGateGuides(),
        isLiveDatabase: false,
        sourceLabel: "Local Verified Guides",
      };
    }

    const { data: temples, error: templeErr } = await client
      .from("temples")
      .select("*");

    const { data: gates, error: gateErr } = await client
      .from("temple_gates")
      .select("*");

    const { data: crowdObs } = await client
      .from("gate_crowd_observations")
      .select("*")
      .order("observation_timestamp", { ascending: false });

    if (templeErr || gateErr || !temples || temples.length === 0) {
      return {
        data: getStaticAllGateGuides(),
        isLiveDatabase: false,
        sourceLabel: "Local Verified Guides (Query Fallback)",
        error: templeErr?.message || gateErr?.message,
      };
    }

    // Build guides combining temples and gates
    const guides: TempleGateGuide[] = temples.map((t) => {
      const relatedGates = (gates || [])
        .filter((g) => g.temple_id === t.id)
        .map((g) => {
          const latestObs = crowdObs?.find((obs) => obs.gate_id === g.id);
          return mapDbGateToGateRecord(g, latestObs);
        });

      // Match static fallback metadata for parking and footwear if DB does not have it yet
      const staticGuide = getStaticGateGuide(t.slug) || getStaticGateGuide(t.id);

      return {
        templeId: t.slug,
        templeSlug: t.slug,
        templeName: t.name,
        hindiName: t.hindi_name,
        city: t.city,
        address: t.address,
        totalKnownGatesCount: relatedGates.length > 0 ? relatedGates.length : (staticGuide?.totalKnownGatesCount ?? "unknown"),
        gatesAuditStatus:
          relatedGates.length > 0
            ? "partially_verified"
            : (staticGuide?.gatesAuditStatus ?? "audit_in_progress"),
        overview: t.description,
        oneWayTrafficDirective: staticGuide?.oneWayTrafficDirective,
        gates: relatedGates.length > 0 ? relatedGates : (staticGuide?.gates ?? []),
        parkingInfo: staticGuide?.parkingInfo ?? [],
        footwearLocations: staticGuide?.footwearLocations ?? [],
        safetyTips: staticGuide?.safetyTips ?? [
          "Deposit mobile devices at authorized counters.",
          "Beware of monkeys in heritage lanes.",
        ],
        lastAuditDate: t.last_verified,
        officialAuditSource: t.source,
      };
    });

    return {
      data: guides.length > 0 ? guides : getStaticAllGateGuides(),
      isLiveDatabase: true,
      sourceLabel: "Live Supabase Database",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      data: getStaticAllGateGuides(),
      isLiveDatabase: false,
      sourceLabel: "Local Verified Guides (Error Fallback)",
      error: msg,
    };
  }
}

/**
 * Retrieve verification sources with fallback.
 */
export async function getVerificationSources(): Promise<
  DataFetchResult<VerificationSourceItem[]>
> {
  const staticSources: VerificationSourceItem[] = [
    {
      id: "a0000000-0000-0000-0000-000000000001",
      name: "Mathura-Vrindavan Police Traffic & Security Dispatch",
      sourceType: "official_notification",
      contactInfo: "SSP Office Mathura / Vrindavan Kotwali",
      referenceUrl: "https://mathura.nic.in",
      notes: "Pedestrian corridor and crowd management notifications.",
      verificationDate: "2026-10-01",
    },
    {
      id: "a0000000-0000-0000-0000-000000000002",
      name: "Braj Teerth Vikas Parishad Field Survey",
      sourceType: "field_survey",
      contactInfo: "UP BTVP Civil Lines Mathura",
      referenceUrl: "https://brajfoundation.org",
      notes: "Physical GPS mapping and accessibility audit by ground surveyors.",
      verificationDate: "2026-10-05",
    },
    {
      id: "a0000000-0000-0000-0000-000000000003",
      name: "Shri Krishna Janmasthan Seva Sansthan",
      sourceType: "temple_authority",
      contactInfo: "Janmasthan Office Mathura",
      referenceUrl: "https://mathura.nic.in",
      notes: "Official gate and security protocol for Krishna Janmabhoomi complex.",
      verificationDate: "2026-09-28",
    },
    {
      id: "a0000000-0000-0000-0000-000000000004",
      name: "Shri Banke Bihari Mandir Sevayat Committee",
      sourceType: "temple_authority",
      contactInfo: "Bihari Pura, Vrindavan",
      referenceUrl: null,
      notes: "Heritage entry/exit guidelines and aarti darshan flow.",
      verificationDate: "2026-10-08",
    },
  ];

  if (!isSupabaseConfigured()) {
    return {
      data: staticSources,
      isLiveDatabase: false,
      sourceLabel: "Local Audited Sources (Supabase Unconfigured)",
    };
  }

  try {
    const client = getSupabaseBrowserClient();
    if (!client) {
      return {
        data: staticSources,
        isLiveDatabase: false,
        sourceLabel: "Local Audited Sources",
      };
    }

    const { data, error } = await client
      .from("verification_sources")
      .select("*")
      .order("verification_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return {
        data: staticSources,
        isLiveDatabase: false,
        sourceLabel: "Local Audited Sources (Query Fallback)",
        error: error?.message,
      };
    }

    return {
      data: data.map((d) => ({
        id: d.id,
        name: d.name,
        sourceType: d.source_type,
        contactInfo: d.contact_info,
        referenceUrl: d.reference_url,
        notes: d.notes,
        verificationDate: d.verification_date,
      })),
      isLiveDatabase: true,
      sourceLabel: "Live Supabase Database",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      data: staticSources,
      isLiveDatabase: false,
      sourceLabel: "Local Audited Sources (Error Fallback)",
      error: msg,
    };
  }
}

/**
 * Retrieve crowd observations with fallback.
 */
export async function getCrowdObservations(
  gateId?: string
): Promise<DataFetchResult<GateCrowdObservationItem[]>> {
  if (!isSupabaseConfigured()) {
    return {
      data: [],
      isLiveDatabase: false,
      sourceLabel: "No Live Observations (Supabase Unconfigured)",
    };
  }

  try {
    const client = getSupabaseBrowserClient();
    if (!client) {
      return {
        data: [],
        isLiveDatabase: false,
        sourceLabel: "Client Initializing",
      };
    }

    let query = client
      .from("gate_crowd_observations")
      .select("*")
      .order("observation_timestamp", { ascending: false })
      .limit(20);

    if (gateId) {
      query = query.eq("gate_id", gateId);
    }

    const { data, error } = await query;

    if (error) {
      return {
        data: [],
        isLiveDatabase: false,
        sourceLabel: "Observations Query Fallback",
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        data: [],
        isLiveDatabase: true,
        sourceLabel: "Live Supabase Database (No Observations Recorded)",
      };
    }

    return {
      data: data.map((d) => ({
        id: d.id,
        gateId: d.gate_id,
        templeId: d.temple_id,
        observationTimestamp: d.observation_timestamp,
        crowdLevel: d.crowd_level,
        estimatedWaitMinutes: d.estimated_wait_minutes,
        reporterType: d.reporter_type,
        notes: d.notes,
        isVerified: d.is_verified,
      })),
      isLiveDatabase: true,
      sourceLabel: "Live Supabase Database",
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      data: [],
      isLiveDatabase: false,
      sourceLabel: "Connection Error",
      error: msg,
    };
  }
}
