export type MessageRole = "user" | "assistant" | "system";

export type AssistantMode =
  | "development_fallback"
  | "knowledge_base"
  | "tool_execution"
  | "llm_integrated";

export interface VerifiedFact {
  fact: string;
  source: string;
  lastVerified: string;
  verified: boolean;
}

export interface AssistantActionLink {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: "temple" | "gate" | "map" | "calendar" | "culture" | "external";
}

export interface ToolCallExecution {
  toolName: string;
  parameters: Record<string, unknown>;
  summary: string;
}

export interface AssistantResponseMetadata {
  mode: AssistantMode;
  engineName: string;
  disclaimer: string;
  verifiedFacts?: VerifiedFact[];
  sourceInfo?: {
    primaryAuthority: string;
    lastVerifiedDate: string;
    trustNotice: string;
  };
  actionLinks?: AssistantActionLink[];
  toolCallsExecuted?: ToolCallExecution[];
  llmConfigStatus: {
    configured: boolean;
    provider?: string;
    note: string;
  };
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status?: "sending" | "sent" | "error";
  metadata?: AssistantResponseMetadata;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

// Typed tool interfaces for server-side tool calling
export interface SearchTemplesToolParams {
  query?: string;
  city?: string;
  category?: string;
}

export interface SearchTemplesToolResult {
  matchCount: number;
  temples: {
    id: string;
    slug: string;
    name: string;
    hindiName: string;
    city: string;
    category: string;
    description: string;
    timingSummary: string;
    entryFee: string;
  }[];
}

export interface GetTempleGatesToolParams {
  templeIdOrSlug: string;
}

export interface GetTempleGatesToolResult {
  templeName: string;
  templeSlug: string;
  city: string;
  totalKnownGatesCount: number | "unknown";
  verifiedPublicEntryGatesCount: number;
  knownExitsAndRestrictedCount: number;
  pendingVerificationCount: number;
  isGateCountUnknown: boolean;
  gates: {
    gateNumber: string;
    gateName: string;
    gateType: string;
    publicEntryStatus: string;
    coordinatesVerified: boolean;
    accessibility: string;
    footwearProximity: string;
  }[];
}

export interface GetCrowdObservationToolParams {
  templeIdOrSlug: string;
}

export interface GetCrowdObservationToolResult {
  templeName: string;
  liveDataAvailable: false;
  statusMessage: string;
  verifiedNotice: string;
  recommendedWindows: string[];
  policeOneWayRule?: string;
}

export interface GenerateItineraryToolParams {
  durationDays: 1 | 2 | 3;
  pace?: "leisurely" | "moderate" | "extensive";
}

export interface GenerateItineraryToolResult {
  planTitle: string;
  durationDays: number;
  pacingNote: string;
  days: {
    dayNumber: number;
    title: string;
    regions: string[];
    morning: string;
    middayRest: string;
    evening: string;
    recommendedTemples: { name: string; slug: string }[];
  }[];
}

export interface AssistantApiRequest {
  query: string;
  history?: { role: MessageRole; content: string }[];
  sessionId?: string;
}

export interface AssistantApiResponse {
  reply: string;
  metadata: AssistantResponseMetadata;
}
