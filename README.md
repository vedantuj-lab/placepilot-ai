# PlacePilot AI — Scheme Saathi
### AgentX Hackathon | Problem Statement: PS-01 (Scheme Saathi)
**Team:** Tech Dynamites  
**Institution:** Shree L.R. Tiwari College of Engineering  
**Tagline:** *Your welfare benefits journey, finally connected.*  
**Core Principle:** **RULES DECIDE. AI ASSISTS. HUMANS APPROVE.**

[![GitHub Repository](https://img.shields.io/badge/GitHub-placepilot--ai-181717?style=for-the-badge&logo=github)](https://github.com/vedantuj-lab/placepilot-ai)
[![Node.js](https://img.shields.io/badge/Node.js-v22-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 🌐 Live Application & Repository Links
- **GitHub Repository:** [https://github.com/vedantuj-lab/placepilot-ai](https://github.com/vedantuj-lab/placepilot-ai)
- **Local Application Server:** [http://localhost:3000](http://localhost:3000)
- **Portal 1 (Citizen Login):** [http://localhost:3000/login](http://localhost:3000/login)
- **Portal 2 (Admin Login):** [http://localhost:3000/admin-login](http://localhost:3000/admin-login)

---

## 1. Executive Summary
**PlacePilot AI — Scheme Saathi** is a production-grade, agentic government welfare scheme and scholarship readiness platform built for Indian citizens. It empowers citizens to discover Central and State welfare programs, evaluate deterministic eligibility without hallucination, extract document data via OCR, prefill application drafts, and complete authorized handoffs to official government portals (`.gov.in` / `.nic.in`).

Unlike conversational bots that guess eligibility or fake official submissions, PlacePilot AI adheres to a strict three-tier philosophy:
- **Deterministic Rules Engine:** Eligibility is calculated mathematically against published government resolutions and gazettes with zero LLM hallucination risk.
- **AI Scheme Saathi Orchestrator:** Powered by Gemini 3.8 Flash, the orchestrator understands natural language in **English, Hindi (हिंदी), and Marathi (मराठी)**, plans multi-step tasks, invokes backend tools, and explains results.
- **Human Approval Center:** Mandatory safety checkpoint ensuring no consequential application or external redirection occurs without explicit, cryptographic citizen sign-off (`AUDIT-APPROVAL-*`).

---

## 2. Problem Statement Alignment (AgentX — PS-01)
Millions of eligible Indian citizens miss out on scholarships, agricultural subsidies, healthcare insurance, and social pensions due to:
1. **Portal Fragmentation:** Disparate central, state, and departmental portals (MahaDBT, NSP, myScheme, PM-KISAN, UMANG) with varying technical interfaces.
2. **Complex Eligibility Rules:** Obscure income ceilings, domicile rules, and category clauses frequently misinterpreted by applicants.
3. **Documentation Hurdles:** Missing or mismatched certificates (Tehsildar income certificates, caste validity, domicile certificates).
4. **Language & Accessibility Barriers:** Official government jargon presented in non-native languages without voice assistance.

---

## 3. Core Solution Architecture & Feature Matrix

### 🌐 Complete Multilingual i18n Architecture (`i18next` + `react-i18next`)
- **Languages Supported**:
  - 🇬🇧 **English** (`en`)
  - 🇮🇳 **Hindi** (`hi` — हिंदी)
  - 🚩 **Marathi** (`mr` — मराठी)
- **Centralized Locale Dictionaries**: Dictionaries in `src/locales/en/common.json`, `src/locales/hi/common.json`, `src/locales/mr/common.json`.
- **Session Persistence**: Language selection persists across page refreshes, route changes, and user sessions in `profile.language` and `localStorage`.
- **UI Coverage**: Header, sidebars, dashboard metrics, search bars, eligibility tables, document studio, application forms, human approval center, chatbot, and voice assistant.

---

### 🎙️ Web Speech API Voice Assistant ($0 / Free)
- **Speech-to-Text Recognition** (`SpeechRecognition` / `webkitSpeechRecognition`):
  - Locales: `en-IN` (English), `hi-IN` (Hindi), `mr-IN` (Marathi).
  - Microphone button in Scheme Saathi Chat input with listening pulse animation. Converts spoken words into editable text before sending.
- **Text-to-Speech Output** (`SpeechSynthesis` API):
  - Speaker button on chatbot response cards to read answers aloud in locale-matching voices.

---

### 🔒 Two Portal Authentication & Strict Role Separation
- **Portal 1 (Citizen Login — `/login`)**: Email/Password, Google OAuth (`prompt: 'select_account'`), Citizen Registration (`/register`), Forgot Password.
- **Portal 2 (Admin Login — `/admin-login`)**: Email/Password ONLY (NO Google OAuth button, NO public admin registration).
- **Workspace Route Guards**: Citizens cannot access `/admin/*`; Admins cannot access `/citizen/*`. Unauthenticated public navigation links (*Home, Citizen Login, Admin Login, Get Started*) are **100% hidden** inside authenticated workspaces.

---

### 👤 Real Google Account Identity & Profile Persistence
- **Metadata Extraction Priority**:
  1. `user_metadata.full_name`
  2. `user_metadata.name`
  3. `user_metadata.given_name`
  4. `user_metadata.preferred_username`
  5. Fallback: `email.split('@')[0]`
- **User-Specific Storage**: Profile records bind to `placepilot_user_profile_[USER_ID]`. Real authenticated users **NEVER** read, inherit, or merge demo fallback data (`Vedant Sharma`).

---

### 🏛️ Persistent Left Desktop Sidebar App Shell
- Permanent left sidebar (`width: 260px`, `position: sticky`, `top: 0`, `height: 100vh`) for Citizen and Admin workspaces.
- Navigating between features (*Schemes, Scholarships, Eligibility, Documents, Applications, Reminders, Assistant*) **NEVER** logs out the user or redirects to public pages!

---

### ⚙️ 7-Tab Interactive Admin Workspace
1. **Analytics & Infrastructure Health:** Realtime SSL pings, system counters, and WebSocket health.
2. **Scheme Catalogue (CRUD):** Live search filter across all 22 schemes with an interactive **`+ Add Scheme`** modal.
3. **Scholarship Portal Management:** Funding allocation and academic year budget tracker (e.g. ₹250 Cr for MahaDBT OBC).
4. **Eligibility Rules Manager:** Deterministic rule threshold controls (e.g. OBC limit: ₹1,50,000; Shahu Maharaj EBC limit: ₹8,00,000).
5. **Source Verification Monitor:** `.gov.in` domain SSL status checks (`VERIFIED`, `PENDING`, `BROKEN`).
6. **Categories & Department Directory:** Directory across Education, Agriculture, Healthcare, Skill Development, Women & Child, and Social Welfare.
7. **Security Audit Logs:** Cryptographic security and human approval audit trails (`AUDIT-APPROVAL-*`).

---

### ⚡ Admin-to-Citizen Database Synchronization
- Shared Supabase PostgreSQL tables (`schemes`, `scholarships`, `eligibility_rules`, `scheme_documents`).
- When Admin adds or updates a scheme in Admin Workspace, Supabase Realtime broadcasts the update event to connected citizen clients, updating the catalogue instantly.

---

## 4. System Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    PlacePilot AI Frontend                   │
│ (React 19 • i18next • Tailwind CSS • Web Speech API • Vite) │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST / JSON
┌──────────────────────────────▼──────────────────────────────┐
│                  Express.js Full-Stack Server               │
│                     (Port 3000 / Vite Dev)                  │
├──────────────────────────────┬──────────────────────────────┤
│  Scheme Saathi Orchestrator  │  Deterministic Rules Engine  │
│      (25 Real AI Tools)      │  (Zero Hallucination Logic)  │
├──────────────────────────────┼──────────────────────────────┤
│   @google/genai (Server)     │   Application Form Studio    │
│     (gemini-3.8-flash)       │      & Form Validator        │
└──────────────┬───────────────┴──────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────┐┌──────────────▼───────────────┐
│     Google Gemini API       ││   PostgreSQL / Supabase      │
│ (Conversational AI Engine)  ││ (22 Normalized Schema Tables)│
└─────────────────────────────┘└──────────────────────────────┘
```

---

## 5. Agent Architecture: 25 Gemini Backend Tools
The `Scheme Saathi Orchestrator` manages citizen interactions using 25 declared backend tools:
1. `get_citizen_profile`
2. `update_citizen_profile`
3. `search_all_government_schemes`
4. `search_central_schemes`
5. `search_state_schemes`
6. `search_scholarships`
7. `get_scheme_details`
8. `get_scheme_official_sources`
9. `get_official_application_url`
10. `get_scheme_guidelines`
11. `verify_scheme_source`
12. `get_eligibility_rules`
13. `check_eligibility`
14. `get_required_documents`
15. `update_document_checklist`
16. `extract_document_data`
17. `get_application_form`
18. `prefill_application_form`
19. `validate_application_form`
20. `request_submission_approval`
21. `submit_application`
22. `track_application`
23. `create_followup_reminder`
24. `get_agent_memory`
25. `save_agent_memory`

---

## 6. Technology Stack
- **Frontend:** React 19, Vite 8, TypeScript, i18next, react-i18next, Tailwind CSS, Lucide React, Motion.
- **Backend:** Node.js, Express.js (`server.ts`), `@google/genai` TypeScript SDK.
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) policies and Google OAuth.
- **AI Models:** `gemini-3.8-flash` via `@google/genai` with server-side User-Agent header.

---

## 7. Database Design (22 PostgreSQL Tables)
Provisioned in `supabase/migrations/20261110_init_placepilot.sql`:
1. `profiles`: Citizen personal, academic, and financial welfare attributes.
2. `schemes`: Central and State schemes catalogue.
3. `scheme_sources`: Verification history, response codes, and audit stamps.
4. `scheme_categories`: 14 categorized domains.
5. `eligibility_rules`: Structured rule conditions.
6. `eligibility_results`: Cached deterministic evaluations.
7. `saved_schemes`: User bookmarked schemes.
8. `scheme_documents`: Required document checklist templates.
9. `documents`: Uploaded citizen files with OCR extraction payloads.
10. `document_checklists`: Real-time checklist status per scheme.
11. `applications`: Drafts, prefilled data, and lifecycle status.
12. `application_forms`: Scheme-specific form definitions.
13. `application_form_fields`: Section fields and mappings.
14. `application_events`: Immutable status timeline history.
15. `reminders`: Follow-up alerts with priority and due date.
16. `plan_tasks`: Step-by-step citizen roadmap.
17. `memory_items`: User-approved long-term agent memories.
18. `approvals`: Cryptographic human approval records.
19. `action_logs`: System audit trail.
20. `agent_sessions`: AI assistant multi-turn conversations.
21. `agent_tool_logs`: Execution logs of the 25 backend tools.
22. `admin_audit_logs`: Administrative actions log.

---

## 8. Environment Variables Setup (`.env.local`)
Copy `.env.example` to `.env.local`:
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=https://burqjmoxkkvbnyvgiobq.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

---

## 9. Local Installation & Development
```bash
# Clone repository
git clone https://github.com/vedantuj-lab/placepilot-ai.git
cd placepilot-ai

# Install dependencies
npm install --legacy-peer-deps

# Run TypeScript compilation check
npx tsc --noEmit

# Build production bundle
npm run build

# Start local server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 10. Demo Accounts (1-Click Test Access)
PlacePilot AI includes preconfigured 1-click test accounts:
1. **Citizen Portal (`/login`):**
   - **Email:** `citizen.demo@placepilot.local` | **Password:** `Password123!`
   - **Profile:** Vedant Sharma, Undergraduate student from Maharashtra, Annual Income ₹1,50,000, OBC category.
2. **Admin Portal (`/admin-login`):**
   - **Email:** `admin.demo@placepilot.local` | **Password:** `AdminPassword2026!`
   - **Role:** Pooja Kulkarni, Government Officer (DTE Maharashtra). Full access to Admin Workspace, broken URL monitoring, and audit trails.

---

## 11. Security, Privacy & Compliance
- **Client-Side Isolation:** Sensitive documents and form drafts remain locally protected.
- **Zero Sensitive Data Ingestion:** PlacePilot never requests banking PINs, net-banking passwords, or private OTPs.
- **Safe Government Redirection:** Official government links enforce `target="_blank" rel="noopener noreferrer"` with `.gov.in` domain verification pings.
- **Cryptographic Audit Hashes:** Every human approval event generates a unique checksum (`AUDIT-APPROVAL-*`) stored in security audit trails.

---

## 12. Documentation Index (`docs/`)
- [`docs/ARCHITECTURE.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/ARCHITECTURE.md): Full-stack architectural specification.
- [`docs/AUTHENTICATION.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/AUTHENTICATION.md): Two-portal authentication and RLS security model.
- [`docs/MULTILINGUAL.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/MULTILINGUAL.md): i18next multilingual implementation guide.
- [`docs/VOICE_ASSISTANT.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/VOICE_ASSISTANT.md): Web Speech API speech-to-text and text-to-speech engine.
- [`docs/ADMIN_CITIZEN_SYNC.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/ADMIN_CITIZEN_SYNC.md): Supabase Realtime database synchronization model.
- [`docs/SUPABASE_SETUP.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/SUPABASE_SETUP.md): PostgreSQL schema, tables, and seed dataset guide.
- [`docs/TESTING.md`](file:///C:/Users/Vedant/Downloads/placepilot-ai-main/placepilot-ai-main/docs/TESTING.md): Verification matrix and unit testing guide.
