# PlacePilot AI — Scheme Saathi
### AgentX Hackathon | Problem Statement: PS-01 (Scheme Saathi)
**Team:** Tech Dynamites  
**Institution:** Shree L.R. Tiwari College of Engineering  
**Tagline:** *Your welfare benefits journey, finally connected.*  
**Core Principle:** **RULES DECIDE. AI ASSISTS. HUMANS APPROVE.**

---

## 1. Project Overview
**PlacePilot AI** is an agentic government welfare scheme and scholarship readiness assistant that empowers Indian citizens to navigate government portals, understand deterministic eligibility, prepare required documentation, prefill application drafts, and complete authorized submissions on verified official government portals.

Unlike generic conversational bots that guess eligibility or hallucinate official submissions, PlacePilot AI adheres to a strict separation of concerns:
- **Deterministic Eligibility Engine:** Rules are evaluated mathematically against published government resolutions and gazettes.
- **AI Scheme Saathi Orchestrator:** Powered by Gemini 3.8 Flash, the orchestrator understands citizen intent across English, Hindi (हिंदी), and Marathi (मराठी), plans steps, selects tools, and explains results.
- **Human Approval Center:** No consequential application submission or external handoff happens without explicit, cryptographic citizen authorization.

---

## 2. Problem Statement (AgentX — PS-01)
Millions of eligible Indian citizens miss out on scholarships, agricultural subsidies, healthcare insurance, and welfare benefits due to:
1. **Portal Fragmentation:** Disparate central, state, and departmental portals (MahaDBT, NSP, myScheme, PM-KISAN, UMANG) with varying technical interfaces.
2. **Complex Eligibility Criteria:** Obscure income ceilings, domicile rules, and category clauses often misinterpreted by applicants.
3. **Documentation Hurdles:** Missing or mismatched certificates (e.g. Tehsildar income certificates, caste validity, domicile certificates).
4. **Fear of Fraud & Lack of Transparency:** Unofficial intermediaries and fake submission reference numbers.

---

## 3. Solution: Scheme Readiness Engine
PlacePilot AI provides an end-to-end agentic workflow:
```
UNDERSTAND → PLAN → SEARCH → VERIFY → CHECK → PREPARE → VALIDATE → ASK APPROVAL → HAND OFF → TRACK
```
1. Citizen expresses their goal via text or voice in English, Hindi, or Marathi.
2. AI identifies missing profile attributes and guides completion.
3. System searches nationwide Central and State schemes (focusing on Maharashtra and Central for the hackathon dataset).
4. Deterministic rules engine evaluates published criteria and yields one of 4 outcomes:
   - `ELIGIBLE`
   - `NOT_ELIGIBLE`
   - `ADDITIONAL_INFO_REQUIRED`
   - `NEEDS_OFFICIAL_VERIFICATION`
5. Personalized document checklist is generated.
6. OCR data extraction reads certificates and prefills the application form draft.
7. Validation flags missing fields.
8. Citizen explicitly signs off in the **Human Approval Center**.
9. System securely hands off to verified government portals (`.gov.in` / `.nic.in`) with safe redirection attributes.
10. Follow-up tasks and application progress tracking keep the citizen informed.

---

## 4. Main Features
- **Scheme Explorer:** Filter by Central vs State, Category (14 categories), State/UT, Education Level, and Accepting Applications.
- **Dedicated Scholarship Portal:** Filter by Academic Year (2025-26, 2026-27), Merit-cum-Means, Reserved categories, and Girls' education.
- **Deterministic Rules Bench:** Test any scheme against citizen profile attributes with condition-by-condition comparison and Gazette citation.
- **Document Readiness Studio:** Upload PDF/JPG/PNG scans, preview documents, simulate OCR field extraction, and record citizen verification.
- **Application Form Studio:** Form templates with section grouping, profile auto-fill, and live validation.
- **Human Approval Center:** Mandatory safety checkpoint with citizen affirmation checkboxes and cryptographic audit event checksums.
- **Official Website Redirection Modal:** Domain verification banner ensuring destinations end in `.gov.in` or `.nic.in`.
- **Application Progress Tracker:** 12 supported lifecycle statuses with transparent evidence attribution (`Officially verified`, `PlacePilot-generated`, `Citizen-entered`, `Simulated demo data`).
- **Follow-up & Reminder Planner:** Scheduled alerts for renewal deadlines and Tehsildar office visits.
- **Admin Workspace:** Scheme catalogue management, broken URL monitoring, rules tester, and audit logs.
- **Multilingual AI Assistant:** Supports English, Hindi, and Marathi with Web Speech voice recognition and TTS speech audio read-out.

---

## 5. System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    PlacePilot AI Frontend                   │
│   (React SPA • Tailwind CSS • Lucide Icons • Web Speech)    │
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

## 6. Agent Architecture: Scheme Saathi Orchestrator
A single authoritative agent (`Scheme Saathi Orchestrator`) manages citizen interactions using 25 declared backend tools:
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

## 7. Technology Stack
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Lucide React, Motion.
- **Backend:** Node.js, Express.js (`server.ts`), `@google/genai` TypeScript SDK.
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) policies.
- **AI Models:** `gemini-3.8-flash` via `@google/genai` with server-side User-Agent header.
- **Testing:** Native Node test runner (`node:test`, `node:assert/strict`) via `npx --yes tsx --test`.

---

## 8. Database Design
The schema in `supabase/migrations/20261110_init_placepilot.sql` provisions 22 tables:
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

## 9. Environment Variables
Copy `.env.example` to `.env`:
```bash
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 10. Local Development & Installation
```bash
# Install dependencies
npm install

# Run unit tests
npx --yes tsx --test src/utils/rulesEngine.test.ts src/utils/formValidator.test.ts

# Start full-stack development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 11. Demo Accounts
PlacePilot includes preconfigured development accounts:
1. **Citizen Demo:**
   - **Email:** `citizen.demo@placepilot.local`
   - **Profile:** Vedant Sharma, Undergraduate student from Maharashtra, Annual Income ₹1,50,000, OBC category.
   - Pre-loaded with verified Maharashtra Domicile, Tehsildar Income Certificate, and OBC Caste Certificate.
2. **Admin Demo:**
   - **Email:** `admin.demo@placepilot.local`
   - **Role:** Full access to Admin Workspace, broken URL monitoring, and audit trails.

---

## 12. Core User Journey Demonstration
Follow these steps to demonstrate the full hero workflow:
1. Open the application and click **AI Assistant**.
2. Click the prompt:  
   *"I am a college student from Maharashtra. My family's annual income is approximately ₹1,50,000. Find scholarships that I may qualify for."*
3. The Scheme Saathi Orchestrator executes 4 backend tools in real time.
4. Review the verdict (**ELIGIBLE** for MahaDBT OBC Scholarship).
5. Click **View Detailed Eligibility Breakdown** to view the condition matrix.
6. Click **Document Readiness Studio** to inspect OCR extracted certificate data.
7. Click **Open Application Form Studio** to inspect prefilled fields.
8. Click **Review & Approve** to access the **Human Approval Center**.
9. Check the affirmation declarations and click **Approve & Proceed to Official Portal**.
10. The **Official Government Portal Redirection** modal confirms the verified destination (`https://mahadbt.maharashtra.gov.in/`).

---

## 13. Security and Privacy
- **Client-Side Document Isolation:** Documents and form drafts are stored locally.
- **Zero Sensitive Data Ingestion:** PlacePilot never requests banking PINs, passwords, or net-banking credentials.
- **Safe External Redirects:** External government links enforce `target="_blank" rel="noopener noreferrer"`.
- **Audit Hashes:** Every human approval event creates a unique checksum stored in the audit trail.

---

## 14. Known Limitations & Roadmap
- Live integration with state portals is contingent on authorized state APIs; currently, verified external redirection ensures regulatory compliance.
- Academic year deadlines for 2026-27 will be synchronized as official gazette notifications are published.
