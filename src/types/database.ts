export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type GateVerificationStatus =
  | "unverified"
  | "pending_verification"
  | "field_verified"
  | "authority_verified"
  | "flagged"
  | "verified";

export type SourceType =
  | "field_survey"
  | "temple_authority"
  | "official_notification"
  | "user_report"
  | "police_advisory";

export type CrowdLevel = "low" | "moderate" | "heavy" | "very_heavy";

export type ReporterType =
  | "field_volunteer"
  | "temple_trust"
  | "police_dispatch"
  | "pilgrim_report"
  | "sensor";

export type UserRole =
  | "pilgrim"
  | "field_surveyor"
  | "temple_admin"
  | "super_admin";

export interface Database {
  public: {
    Tables: {
      temples: {
        Row: {
          id: string;
          slug: string;
          name: string;
          hindi_name: string;
          city: string;
          city_slug: string;
          category: string;
          description: string;
          cultural_significance: string;
          address: string;
          image_url: string;
          latitude: number | null;
          longitude: number | null;
          location_verified: boolean;
          estimated_visit_duration: string;
          gate_info_status: string;
          entry_fee: string;
          opening_hours: Json;
          gate_details: Json;
          source: string;
          last_verified: string;
          rules: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          hindi_name: string;
          city: string;
          city_slug: string;
          category: string;
          description: string;
          cultural_significance: string;
          address: string;
          image_url: string;
          latitude?: number | null;
          longitude?: number | null;
          location_verified?: boolean;
          estimated_visit_duration?: string;
          gate_info_status?: string;
          entry_fee?: string;
          opening_hours?: Json;
          gate_details?: Json;
          source?: string;
          last_verified?: string;
          rules?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          hindi_name?: string;
          city?: string;
          city_slug?: string;
          category?: string;
          description?: string;
          cultural_significance?: string;
          address?: string;
          image_url?: string;
          latitude?: number | null;
          longitude?: number | null;
          location_verified?: boolean;
          estimated_visit_duration?: string;
          gate_info_status?: string;
          entry_fee?: string;
          opening_hours?: Json;
          gate_details?: Json;
          source?: string;
          last_verified?: string;
          rules?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      verification_sources: {
        Row: {
          id: string;
          name: string;
          source_type: SourceType;
          contact_info: string | null;
          reference_url: string | null;
          notes: string | null;
          verification_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          source_type: SourceType;
          contact_info?: string | null;
          reference_url?: string | null;
          notes?: string | null;
          verification_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          source_type?: SourceType;
          contact_info?: string | null;
          reference_url?: string | null;
          notes?: string | null;
          verification_date?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      temple_gates: {
        Row: {
          id: string;
          temple_id: string;
          gate_number: string;
          gate_name: string;
          gate_type: string;
          public_entry_status: string;
          operational_status: string;
          verification_status: GateVerificationStatus;
          latitude: number | null;
          longitude: number | null;
          coordinates_verified: boolean;
          wheelchair_ramp: boolean;
          step_free: boolean;
          accessibility_details: string | null;
          footwear_proximity: string | null;
          security_check: string | null;
          best_for: string | null;
          warnings: string | null;
          verification_source_id: string | null;
          last_verified: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          temple_id: string;
          gate_number: string;
          gate_name: string;
          gate_type: string;
          public_entry_status: string;
          operational_status: string;
          verification_status?: GateVerificationStatus;
          latitude?: number | null;
          longitude?: number | null;
          coordinates_verified?: boolean;
          wheelchair_ramp?: boolean;
          step_free?: boolean;
          accessibility_details?: string | null;
          footwear_proximity?: string | null;
          security_check?: string | null;
          best_for?: string | null;
          warnings?: string | null;
          verification_source_id?: string | null;
          last_verified?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          temple_id?: string;
          gate_number?: string;
          gate_name?: string;
          gate_type?: string;
          public_entry_status?: string;
          operational_status?: string;
          verification_status?: GateVerificationStatus;
          latitude?: number | null;
          longitude?: number | null;
          coordinates_verified?: boolean;
          wheelchair_ramp?: boolean;
          step_free?: boolean;
          accessibility_details?: string | null;
          footwear_proximity?: string | null;
          security_check?: string | null;
          best_for?: string | null;
          warnings?: string | null;
          verification_source_id?: string | null;
          last_verified?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "temple_gates_temple_id_fkey";
            columns: ["temple_id"];
            isOneToOne: false;
            referencedRelation: "temples";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "temple_gates_verification_source_id_fkey";
            columns: ["verification_source_id"];
            isOneToOne: false;
            referencedRelation: "verification_sources";
            referencedColumns: ["id"];
          }
        ];
      };
      gate_crowd_observations: {
        Row: {
          id: string;
          gate_id: string;
          temple_id: string;
          observation_timestamp: string;
          crowd_level: CrowdLevel;
          estimated_wait_minutes: number | null;
          reporter_type: ReporterType;
          notes: string | null;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          gate_id: string;
          temple_id: string;
          observation_timestamp?: string;
          crowd_level: CrowdLevel;
          estimated_wait_minutes?: number | null;
          reporter_type: ReporterType;
          notes?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          gate_id?: string;
          temple_id?: string;
          observation_timestamp?: string;
          crowd_level?: CrowdLevel;
          estimated_wait_minutes?: number | null;
          reporter_type?: ReporterType;
          notes?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gate_crowd_observations_gate_id_fkey";
            columns: ["gate_id"];
            isOneToOne: false;
            referencedRelation: "temple_gates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "gate_crowd_observations_temple_id_fkey";
            columns: ["temple_id"];
            isOneToOne: false;
            referencedRelation: "temples";
            referencedColumns: ["id"];
          }
        ];
      };
      user_profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      gate_verification_status: GateVerificationStatus;
      source_type: SourceType;
      crowd_level: CrowdLevel;
      reporter_type: ReporterType;
      user_role: UserRole;
    };
    CompositeTypes: Record<string, never>;
  };
}
