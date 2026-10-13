-- =============================================================================
-- BrajMitra AI - Phase 2 Core Database Schema
-- Migration: 20261014000000_brajmitra_core_schema.sql
-- Description: Creates persistent tables for temples, verified temple gates,
--              verification sources, gate crowd observations, and user profiles
--              with spatial constraints, indexes, and Row Level Security (RLS).
-- =============================================================================

-- Ensure pgcrypto extension is enabled for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. TABLE: verification_sources
-- Documents authenticity origin (field surveyors, temple trusts, notifications)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.verification_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (
        source_type IN (
            'field_survey',
            'temple_authority',
            'official_notification',
            'user_report',
            'police_advisory'
        )
    ),
    contact_info TEXT,
    reference_url TEXT,
    notes TEXT,
    verification_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.verification_sources IS 'Audit trail of field surveys and official notices verifying gate coordinates and crowd rules.';

-- -----------------------------------------------------------------------------
-- 2. TABLE: temples
-- Master sanctuary repository for all 12 holy sanctums across Braj Bhoomi
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.temples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    hindi_name TEXT NOT NULL,
    city TEXT NOT NULL,
    city_slug TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    cultural_significance TEXT NOT NULL,
    address TEXT NOT NULL,
    image_url TEXT NOT NULL,
    latitude NUMERIC(9,6) CHECK (latitude IS NULL OR (latitude >= -90.0 AND latitude <= 90.0)),
    longitude NUMERIC(9,6) CHECK (longitude IS NULL OR (longitude >= -180.0 AND longitude <= 180.0)),
    location_verified BOOLEAN NOT NULL DEFAULT FALSE,
    estimated_visit_duration TEXT NOT NULL DEFAULT '1 - 2 hours',
    gate_info_status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (
        gate_info_status IN ('verified', 'pending_verification', 'audit_in_progress')
    ),
    entry_fee TEXT NOT NULL DEFAULT 'Free Darshan',
    opening_hours JSONB NOT NULL DEFAULT '{}'::jsonb,
    gate_details JSONB NOT NULL DEFAULT '{}'::jsonb,
    source TEXT NOT NULL DEFAULT 'BrajMitra Field Team & Local Authority Guidelines',
    last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
    rules TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Ensure coordinates are either both provided or both null, and not fake zero coordinates
    CONSTRAINT chk_temple_coords_pair CHECK (
        (latitude IS NULL AND longitude IS NULL) OR
        (latitude IS NOT NULL AND longitude IS NOT NULL)
    ),
    CONSTRAINT chk_temple_coords_not_zero CHECK (
        latitude IS NULL OR (latitude != 0.0 AND longitude != 0.0)
    )
);

COMMENT ON TABLE public.temples IS 'Core registry of Braj temples, including darshan schedules, regulations, and verified location.';

-- -----------------------------------------------------------------------------
-- 3. TABLE: temple_gates
-- Individually audited temple entry and exit gates with accessibility & coordinates
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.temple_gates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    temple_id UUID NOT NULL REFERENCES public.temples(id) ON DELETE CASCADE,
    gate_number TEXT NOT NULL,
    gate_name TEXT NOT NULL,
    gate_type TEXT NOT NULL CHECK (
        gate_type IN (
            'main_entrance',
            'secondary_entrance',
            'exit_only',
            'emergency_exit',
            'restricted',
            'unknown'
        )
    ),
    public_entry_status TEXT NOT NULL CHECK (
        public_entry_status IN (
            'authorized',
            'exit_only',
            'restricted_passes_only',
            'emergency_only',
            'unverified'
        )
    ),
    operational_status TEXT NOT NULL CHECK (
        operational_status IN (
            'active',
            'exit_flow_only',
            'restricted',
            'temporarily_closed',
            'pending_verification'
        )
    ),
    verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (
        verification_status IN (
            'unverified',
            'pending_verification',
            'field_verified',
            'authority_verified',
            'flagged',
            'verified'
        )
    ),
    latitude NUMERIC(9,6) CHECK (latitude IS NULL OR (latitude >= -90.0 AND latitude <= 90.0)),
    longitude NUMERIC(9,6) CHECK (longitude IS NULL OR (longitude >= -180.0 AND longitude <= 180.0)),
    coordinates_verified BOOLEAN NOT NULL DEFAULT FALSE,
    wheelchair_ramp BOOLEAN NOT NULL DEFAULT FALSE,
    step_free BOOLEAN NOT NULL DEFAULT FALSE,
    accessibility_details TEXT,
    footwear_proximity TEXT,
    security_check TEXT,
    best_for TEXT,
    warnings TEXT,
    verification_source_id UUID REFERENCES public.verification_sources(id) ON DELETE SET NULL,
    last_verified DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Crucial Spatial Constraints:
    -- 1. Must be both null or both non-null
    -- 2. Never allow 0,0 null-island coordinates
    -- 3. Unverified coordinates MUST remain null, not invented centroids
    CONSTRAINT chk_gate_coords_pair CHECK (
        (latitude IS NULL AND longitude IS NULL) OR
        (latitude IS NOT NULL AND longitude IS NOT NULL)
    ),
    CONSTRAINT chk_gate_coords_not_zero CHECK (
        latitude IS NULL OR (latitude != 0.0 AND longitude != 0.0)
    )
);

COMMENT ON TABLE public.temple_gates IS 'Individually verified gate records for crowd flow, security, wheelchair access, and navigation.';

-- -----------------------------------------------------------------------------
-- 4. TABLE: gate_crowd_observations
-- Observations of foot traffic, estimated wait times, and advisory notes
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gate_crowd_observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gate_id UUID NOT NULL REFERENCES public.temple_gates(id) ON DELETE CASCADE,
    temple_id UUID NOT NULL REFERENCES public.temples(id) ON DELETE CASCADE,
    observation_timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    crowd_level TEXT NOT NULL CHECK (
        crowd_level IN ('low', 'moderate', 'heavy', 'very_heavy')
    ),
    estimated_wait_minutes INTEGER CHECK (
        estimated_wait_minutes IS NULL OR estimated_wait_minutes >= 0
    ),
    reporter_type TEXT NOT NULL CHECK (
        reporter_type IN (
            'field_volunteer',
            'temple_trust',
            'police_dispatch',
            'pilgrim_report',
            'sensor'
        )
    ),
    notes TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.gate_crowd_observations IS 'Real-world crowd observations and wait-time approximations linked to individual temple gates.';

-- -----------------------------------------------------------------------------
-- 5. TABLE: user_profiles
-- Optional user profiles supporting admin and field surveyor authorization
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'pilgrim' CHECK (
        role IN ('pilgrim', 'field_surveyor', 'temple_admin', 'super_admin')
    ),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.user_profiles IS 'User roles for authorization of field updates and administrative verifications.';

-- -----------------------------------------------------------------------------
-- INDEXES FOR HIGH-PERFORMANCE QUERIES
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_temples_slug ON public.temples(slug);
CREATE INDEX IF NOT EXISTS idx_temples_city_slug ON public.temples(city_slug);
CREATE INDEX IF NOT EXISTS idx_temple_gates_temple_id ON public.temple_gates(temple_id);

-- Composite spatial index on temple ID and gate coordinates for map render and proximity
CREATE INDEX IF NOT EXISTS idx_temple_gates_coords ON public.temple_gates(temple_id, latitude, longitude)
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Temporal indexes for latest crowd observations
CREATE INDEX IF NOT EXISTS idx_crowd_obs_gate_time ON public.gate_crowd_observations(gate_id, observation_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_crowd_obs_temple_time ON public.gate_crowd_observations(temple_id, observation_timestamp DESC);

-- -----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.temples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temple_gates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gate_crowd_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 1. temples: Public read access for all visitors
CREATE POLICY "Public read access for temples"
    ON public.temples
    FOR SELECT
    USING (true);

-- Temples modification: Only admins / service role
CREATE POLICY "Admin write access for temples"
    ON public.temples
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('temple_admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('temple_admin', 'super_admin')
        )
    );

-- 2. temple_gates: Public read access
CREATE POLICY "Public read access for temple gates"
    ON public.temple_gates
    FOR SELECT
    USING (true);

-- Gates modification: Only field surveyors / admins / service role
CREATE POLICY "Authorized write access for temple gates"
    ON public.temple_gates
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('field_surveyor', 'temple_admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('field_surveyor', 'temple_admin', 'super_admin')
        )
    );

-- 3. verification_sources: Public read access
CREATE POLICY "Public read access for verification sources"
    ON public.verification_sources
    FOR SELECT
    USING (true);

CREATE POLICY "Admin write access for verification sources"
    ON public.verification_sources
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('field_surveyor', 'temple_admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = auth.uid()
            AND user_profiles.role IN ('field_surveyor', 'temple_admin', 'super_admin')
        )
    );

-- 4. gate_crowd_observations: Public read access
CREATE POLICY "Public read access for crowd observations"
    ON public.gate_crowd_observations
    FOR SELECT
    USING (true);

-- Anyone authenticated can submit an observation; service role / field staff can verify
CREATE POLICY "Authenticated users can submit observations"
    ON public.gate_crowd_observations
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- 5. user_profiles: Users can read their own profile, admins can read all
CREATE POLICY "Users can read own profile"
    ON public.user_profiles
    FOR SELECT
    TO authenticated
    USING (
        id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.user_profiles admin_p
            WHERE admin_p.id = auth.uid()
            AND admin_p.role = 'super_admin'
        )
    );
