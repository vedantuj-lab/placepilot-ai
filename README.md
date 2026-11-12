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

## 🌐 Live Repository & Deployment
- **GitHub Repository:** [https://github.com/vedantuj-lab/placepilot-ai](https://github.com/vedantuj-lab/placepilot-ai)
- **Local Application Server:** [http://localhost:3000](http://localhost:3000)
- **Portal 1 (Citizen Login):** [http://localhost:3000/login](http://localhost:3000/login)
- **Portal 2 (Admin Login):** [http://localhost:3000/admin-login](http://localhost:3000/admin-login)

---

## 1. Project Overview
**PlacePilot AI** is an agentic government welfare scheme and scholarship readiness assistant designed for Indian citizens. It guides users to discover relevant schemes, evaluate deterministic eligibility, prepare required documentation, prefill application drafts, and complete authorized handoffs to official government portals.

Unlike generic conversational bots that guess eligibility or hallucinate official submissions, PlacePilot AI adheres to a strict separation of concerns:
- **Deterministic Eligibility Engine:** Rules are evaluated mathematically against published government resolutions and gazettes.
- **AI Scheme Saathi Orchestrator:** Powered by Gemini 3.8 Flash, the orchestrator understands citizen intent across **English, Hindi (हिंदी), and Marathi (मराठी)**, plans steps, selects tools, and explains results.
- **Voice Assistant Interface:** Web Speech API integration (`SpeechRecognition` & `SpeechSynthesis`) for hands-free voice input and response speech playback in `en-IN`, `hi-IN`, and `mr-IN`.
- **Human Approval Center:** No consequential application submission or external handoff happens without explicit, cryptographic citizen authorization.

---

## 2. Problem Statement (AgentX — PS-01)
Millions of eligible Indian citizens miss out on scholarships, agricultural subsidies, healthcare insurance, and welfare benefits due to:
1. **Portal Fragmentation:** Disparate central, state, and departmental portals (MahaDBT, NSP, myScheme, PM-KISAN, UMANG) with varying technical interfaces.
2. **Complex Eligibility Criteria:** Obscure income ceilings, domicile rules, and category clauses often misinterpreted by applicants.
3. **Documentation Hurdles:** Missing or mismatched certificates (e.g. Tehsildar income certificates, caste validity, domicile certificates).
4. **Language Barriers & Accessibility:** Complexity of government jargon in non-native languages.

---

## 3. Key Completed Features & Architecture

### 🌐 Multilingual i18n System (`i18next` + `react-i18next`)
- **Languages Supported**:
  - 🇬🇧 **English** (`en`)
  - 🇮🇳 **Hindi** (`hi` — हिंदी)
  - 🚩 **Marathi** (`mr` — मराठी)
- **Centralized Locale Dictionaries**: Dictionaries in `src/locales/en/common.json`, `src/locales/hi/common.json`, `src/locales/mr/common.json`.
- **Persistence**: Selected language saves to `profile.language` and `localStorage`, persisting across route navigation, page refreshes, and app sessions.

### 🎙️ Web Speech API Voice Assistant ($0 / Free)
- **Speech Recognition** (`SpeechRecognition` / `webkitSpeechRecognition`):
  - Supports `en-IN`, `hi-IN`, `mr-IN` based on active language choice.
  - Microphone button in Scheme Saathi Chat input with visual listening pulse indicator.
- **Text-to-Speech** (`SpeechSynthesis` API):
  - Speaker button on chatbot response cards to read answers aloud in matching locale voices.

### 🔒 Two Portal Authentication & Role Protection
- **Portal 1 (Citizen Login — `/login`)**: Email/Password, Google OAuth (`prompt: 'select_account'`), Citizen Registration (`/register`), Forgot Password.
- **Portal 2 (Admin Login — `/admin-login`)**: Email/Password ONLY (NO Google OAuth button, NO public admin registration).
- **Workspace Isolation**: Citizens cannot access `/admin/*`; Admins cannot access `/citizen/*`. Public navigation links (*Home, Citizen Login, Admin Login, Get Started*) are **100% hidden** inside authenticated workspaces.

### 👤 Real Google Account Identity
- Extracts real Google metadata (`full_name` > `name` > `given_name` > `email.split('@')[0]`) and photo avatar URLs.
- Binds profiles to user-specific storage keys (`placepilot_user_profile_[USER_ID]`). Real authenticated accounts **NEVER** fall back to or display demo data (`Vedant Sharma`).

### 🏛️ Persistent Desktop Sidebar App Shell
- Permanent left sidebar (`width: 260px`, `position: sticky`, `top: 0`, `height: 100vh`) for Citizen and Admin workspaces.
- Navigating between features (*Schemes, Scholarships, Eligibility, Documents, Applications, Reminders, Assistant*) **NEVER** logs out the user or redirects to public pages.

### ⚙️ 7-Tab Interactive Admin Workspace
1. **Analytics & Infrastructure Health:** Realtime SSL pings and system counters.
2. **Scheme Catalogue (CRUD):** Live search filter across all 22 Central & State schemes with a **`+ Add Scheme`** modal.
3. **Scholarship Portal Management:** Funding allocation and academic year budget tracker (e.g. ₹250 Cr for MahaDBT OBC).
4. **Eligibility Rules Manager:** Deterministic rule threshold controls (e.g., OBC limit: ₹1,50,000; Shahu Maharaj EBC limit: ₹8,00,000).
5. **Source Verification Monitor:** `.gov.in` domain SSL status checks (`VERIFIED`, `PENDING`, `BROKEN`).
6. **Categories & Department Directory:** Scheme category directory.
7. **Security Audit Logs:** Cryptographic security and human approval audit trails.

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

## 5. Technology Stack
- **Frontend:** React 19, Vite 8, TypeScript, i18next, react-i18next, Tailwind CSS, Lucide React, Motion.
- **Backend:** Node.js, Express.js (`server.ts`), `@google/genai` TypeScript SDK.
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) policies and Google OAuth.
- **AI Models:** `gemini-3.8-flash` via `@google/genai` with server-side User-Agent header.

---

## 6. Environment Variables (`.env.local`)
Copy `.env.example` to `.env.local`:
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=https://burqjmoxkkvbnyvgiobq.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

---

## 7. Local Installation & Running
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

## 8. Demo Testing Accounts (1-Click Login)
PlacePilot AI includes preconfigured 1-click test accounts:
1. **Citizen Portal (`/login`):**
   - **Email:** `citizen.demo@placepilot.local` | **Password:** `Password123!`
   - **Profile:** Vedant Sharma, Undergraduate student from Maharashtra, Annual Income ₹1,50,000, OBC category.
2. **Admin Portal (`/admin-login`):**
   - **Email:** `admin.demo@placepilot.local` | **Password:** `AdminPassword2026!`
   - **Role:** Pooja Kulkarni, Government Officer (DTE Maharashtra). Full access to Admin Workspace, broken URL monitoring, and audit trails.

---

## 9. Security and Privacy
- **Client-Side Document Isolation:** Documents and form drafts are stored locally.
- **Zero Sensitive Data Ingestion:** PlacePilot never requests banking PINs or passwords.
- **Safe External Redirects:** External government links enforce `target="_blank" rel="noopener noreferrer"`.
- **Cryptographic Audit Hashes:** Every human approval event creates a unique checksum (`AUDIT-APPROVAL-*`) stored in audit trails.
