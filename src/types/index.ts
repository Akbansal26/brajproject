export interface Destination {
  id: string;
  name: string;
  hindiName: string;
  slug: string;
  tagline: string;
  description: string;
  distanceFromMathuraKm: number;
  keyTemples: string[];
  significance: string;
  darshanSummary: string;
  imageUrl?: string;
}

export interface Temple {
  id: string;
  name: string;
  hindiName: string;
  destinationSlug: string;
  morningAarti: string;
  eveningAarti: string;
  shringarDarshan: string;
  rules: string[];
}

export interface ParikramaInfo {
  id: string;
  name: string;
  hindiName: string;
  distanceKm: number;
  durationHours: string;
  startPoint: string;
  landmarks: string[];
}

export interface AIMitraPromptOption {
  id: string;
  label: string;
  query: string;
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export type {
  GateType,
  PublicEntryAuthorization,
  OperationalStatus,
  VerificationStatus,
  GateRecord,
  TempleGateGuide,
} from "@/data/gates";
