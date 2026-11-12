-- ==============================================================================
-- PlacePilot AI (PS-01: Scheme Saathi) — PostgreSQL Schema Migration
-- Team: Tech Dynamites • Shree L.R. Tiwari College of Engineering
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    age INT,
    dob DATE,
    gender TEXT,
    state TEXT NOT NULL DEFAULT 'Maharashtra',
    district TEXT,
    pin_code TEXT,
    category TEXT DEFAULT 'General',
    religion TEXT,
    is_disability BOOLEAN DEFAULT FALSE,
    disability_percentage NUMERIC,
    education_level TEXT,
    course_name TEXT,
    institution_name TEXT,
    passing_year INT,
    previous_marks_percentage NUMERIC,
    annual_family_income NUMERIC NOT NULL DEFAULT 0,
    occupation TEXT,
    parent_occupation TEXT,
    land_holding_acres NUMERIC,
    ration_card_type TEXT,
    area_type TEXT DEFAULT 'Urban',
    marital_status TEXT,
    language TEXT DEFAULT 'en',
    consent_given BOOLEAN DEFAULT TRUE,
    role TEXT DEFAULT 'citizen',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Scheme Categories
CREATE TABLE IF NOT EXISTS public.scheme_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_hi TEXT,
    name_mr TEXT,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Schemes Table
CREATE TABLE IF NOT EXISTS public.schemes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    title_hi TEXT,
    title_mr TEXT,
    slug TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    ministry TEXT,
    level TEXT NOT NULL CHECK (level IN ('Central', 'State')),
    state TEXT NOT NULL,
    category_id TEXT REFERENCES public.scheme_categories(id),
    description TEXT NOT NULL,
    description_hi TEXT,
    description_mr TEXT,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    eligibility_summary TEXT NOT NULL,
    application_deadline DATE,
    accepting_applications BOOLEAN DEFAULT TRUE,
    is_scholarship BOOLEAN DEFAULT FALSE,
    academic_year TEXT DEFAULT '2025-26',
    official_source_url TEXT NOT NULL,
    official_application_url TEXT,
    guidelines_url TEXT,
    source_verification_status TEXT DEFAULT 'VERIFIED' CHECK (source_verification_status IN ('VERIFIED', 'PENDING', 'BROKEN')),
    last_verified_date DATE DEFAULT CURRENT_DATE,
    required_documents JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    common_portal_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Scheme Sources (Historical Source Tracking)
CREATE TABLE IF NOT EXISTS public.scheme_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    source_type TEXT NOT NULL,
    url TEXT NOT NULL,
    verification_status TEXT NOT NULL,
    http_status_code INT,
    verified_by TEXT,
    verification_notes TEXT,
    checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Eligibility Rules
CREATE TABLE IF NOT EXISTS public.eligibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    conditions JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Eligibility Results (Evaluation Cache & Audit)
CREATE TABLE IF NOT EXISTS public.eligibility_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    outcome TEXT NOT NULL CHECK (outcome IN ('ELIGIBLE', 'NOT_ELIGIBLE', 'ADDITIONAL_INFO_REQUIRED', 'NEEDS_OFFICIAL_VERIFICATION')),
    summary TEXT NOT NULL,
    condition_results JSONB NOT NULL,
    missing_fields JSONB DEFAULT '[]'::jsonb,
    evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Saved Schemes (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(citizen_id, scheme_id)
);

-- 8. Scheme Documents (Checklist Templates per scheme)
CREATE TABLE IF NOT EXISTS public.scheme_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT TRUE,
    issuing_authority TEXT,
    validity_period_months INT
);

-- 9. Documents Table (Citizen Uploaded Files)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT REFERENCES public.schemes(id) ON DELETE SET NULL,
    document_type TEXT NOT NULL,
    name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size TEXT,
    storage_path TEXT,
    status TEXT NOT NULL DEFAULT 'Uploaded' CHECK (status IN ('Missing', 'Uploaded', 'Processing', 'Extracted', 'Needs Review', 'Verified by Citizen', 'Officially Verified')),
    extracted_data JSONB DEFAULT '{}'::jsonb,
    verified_by_citizen BOOLEAN DEFAULT FALSE,
    consent_granted BOOLEAN DEFAULT TRUE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Document Checklists (Citizen Scheme Checklist Status)
CREATE TABLE IF NOT EXISTS public.document_checklists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    status TEXT DEFAULT 'Missing',
    linked_document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Applications Table (Drafts & Tracking)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    scheme_title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft In Progress',
    status_attribution TEXT NOT NULL DEFAULT 'PlacePilot-generated' CHECK (status_attribution IN ('Citizen-entered', 'PlacePilot-generated', 'Officially verified', 'Simulated demo data')),
    form_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    validation_errors JSONB DEFAULT '[]'::jsonb,
    is_approved_by_human BOOLEAN DEFAULT FALSE,
    official_portal_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ
);

-- 12. Application Forms Templates
CREATE TABLE IF NOT EXISTS public.application_forms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id TEXT NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    version INT DEFAULT 1,
    title TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 13. Application Form Fields
CREATE TABLE IF NOT EXISTS public.application_form_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_id UUID NOT NULL REFERENCES public.application_forms(id) ON DELETE CASCADE,
    section_name TEXT NOT NULL,
    field_name TEXT NOT NULL,
    label TEXT NOT NULL,
    field_type TEXT NOT NULL,
    is_required BOOLEAN DEFAULT TRUE,
    profile_mapping TEXT,
    document_mapping JSONB,
    validation_rules JSONB,
    field_order INT DEFAULT 0
);

-- 14. Application Events (Timeline Audit)
CREATE TABLE IF NOT EXISTS public.application_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    note TEXT NOT NULL,
    source TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Reminders
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date_time TIMESTAMPTZ NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'HIGH' CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Plan Tasks (Step-by-step agent checklist)
CREATE TABLE IF NOT EXISTS public.plan_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    completed_at TIMESTAMPTZ
);

-- 17. Memory Items (Agent long-term memory with user consent)
CREATE TABLE IF NOT EXISTS public.memory_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    memory_key TEXT NOT NULL,
    memory_value JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Approvals (Human Approval Checkpoint Event)
CREATE TABLE IF NOT EXISTS public.approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    citizen_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    approved_by TEXT NOT NULL,
    ip_hash TEXT NOT NULL,
    audit_checksum TEXT NOT NULL UNIQUE,
    statement TEXT NOT NULL,
    approved_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Action Logs
CREATE TABLE IF NOT EXISTS public.action_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    level TEXT DEFAULT 'INFO',
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Agent Sessions
CREATE TABLE IF NOT EXISTS public.agent_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. Agent Tool Logs
CREATE TABLE IF NOT EXISTS public.agent_tool_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.agent_sessions(id) ON DELETE SET NULL,
    tool_name TEXT NOT NULL,
    arguments JSONB,
    result JSONB,
    status TEXT DEFAULT 'success',
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. Admin Audit Logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_entity TEXT,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;

-- Read policies for public scheme catalogue
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public schemes viewable by everyone" ON public.schemes FOR SELECT USING (true);
