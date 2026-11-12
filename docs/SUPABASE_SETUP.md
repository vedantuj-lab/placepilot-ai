# Supabase Setup & Migration Guide — PlacePilot AI

**Product:** PlacePilot AI (PS-01: Scheme Saathi)  
**Team:** Tech Dynamites • Shree L.R. Tiwari College of Engineering  

---

## 1. Prerequisites

1. A free or pro account on [Supabase.com](https://supabase.com).
2. A new Supabase Project named `placepilot-ai`.
3. Project API Credentials:
   - `Project URL` (e.g., `https://xyzcompany.supabase.co`)
   - `anon / public key`
   - `service_role key` (Server-side only)

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env` in the root project directory:

```env
# Client Environment (Vite)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Server Environment (Node.js)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Gemini API Integration
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 3. Database Schema Migration

Run the SQL migration script in the Supabase SQL Editor:

1. Open your Supabase Dashboard -> **SQL Editor**.
2. Click **New Query**.
3. Paste the contents of `supabase/migrations/20261110_init_placepilot.sql`.
4. Click **Run** to execute migration.

This creates all 22 required tables, indexes, foreign keys, and Row Level Security (RLS) policies:
- `profiles`
- `scheme_categories`
- `schemes`
- `scheme_sources`
- `eligibility_rules`
- `eligibility_results`
- `saved_schemes`
- `scheme_documents`
- `documents`
- `document_checklists`
- `applications`
- `application_forms`
- `application_form_fields`
- `application_events`
- `reminders`
- `plan_tasks`
- `memory_items`
- `approvals`
- `action_logs`
- `agent_sessions`
- `agent_tool_logs`
- `admin_audit_logs`

---

## 4. Initial Seed Data Population

1. Open Supabase SQL Editor -> **New Query**.
2. Paste the contents of `supabase/seed.sql`.
3. Click **Run** to populate initial verified schemes, categories, demo profiles, documents, applications, and reminders.

---

## 5. Storage Bucket Configuration

1. In your Supabase Dashboard, navigate to **Storage**.
2. Create a new private bucket named `citizen-documents`.
3. Set public access to `FALSE`.
4. Add storage policy allowing authenticated users to upload and read their own objects (`auth.uid() = owner`).

---

## 6. Local Development Mode

If Supabase credentials are not provided in `.env`, PlacePilot AI automatically runs in **Offline / Demo Mode**, persisting state locally via `localStorage` and utilizing simulated authentication accounts (`citizen.demo@placepilot.local` and `admin.demo@placepilot.local`).
