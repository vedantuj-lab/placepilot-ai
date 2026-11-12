# REST API & Gemini Agent Tools Specification — PlacePilot AI

**Product:** PlacePilot AI (PS-01: Scheme Saathi)  
**Team:** Tech Dynamites • Shree L.R. Tiwari College of Engineering  

---

## REST Endpoints Summary

### 1. Scheme Catalogue & Details
- `GET /api/schemes`  
  - Query parameters: `category`, `level`, `state`, `isScholarship`, `search`  
  - Returns filtered array of schemes with official portal links and source verification status.

- `GET /api/schemes/:id`  
  - Returns scheme details, deterministic eligibility rule definitions, and form template schema.

### 2. Deterministic Eligibility Check
- `POST /api/eligibility/check`  
  - Request body: `{ schemeId: string, profile: CitizenProfile }`  
  - Returns: `{ outcome: 'ELIGIBLE' | 'NOT_ELIGIBLE' | 'ADDITIONAL_INFO_REQUIRED' | 'NEEDS_OFFICIAL_VERIFICATION', conditionResults: [...], missingFields: [...] }`

### 3. Scheme Saathi Agentic Chat & Tool Calling
- `POST /api/gemini/chat`  
  - Request body: `{ message: string, profile: CitizenProfile, language: 'en' | 'hi' | 'mr' }`  
  - Executes Gemini agent tool calling (`gemini-3.8-flash`) or deterministic `SchemeSaathiOrchestrator` fallback.  
  - Returns response text, tool execution logs, and action suggestion buttons.

### 4. Document Readiness & Extraction
- `POST /api/documents/extract`  
  - Request body: `{ documentType: string, fileName: string }`  
  - Returns simulated OCR extracted structured fields (certificate number, issuer, candidate name, date).

### 5. Human Approval Recording
- `POST /api/approvals/record`  
  - Request body: `{ applicationId: string, schemeId: string, citizenEmail: string, signatureStatement: string }`  
  - Generates audit checksum (`AUDIT-REC-*`) and logs security audit event.

### 6. Authentication
- `POST /api/auth/login` — Account login.
- `POST /api/auth/register` — Citizen registration (Strictly assigns `role: 'citizen'`).
- `POST /api/auth/forgot-password` — Password recovery link request.
- `POST /api/auth/reset-password` — Password reset.
- `GET /api/auth/me` — Authenticated session lookup.
- `POST /api/auth/logout` — Session termination.

---

## 25 Gemini Backend Agent Tools

| # | Tool Name | Description |
|---|---|---|
| 1 | `get_citizen_profile` | Retrieves current citizen profile details. |
| 2 | `update_citizen_profile` | Updates citizen profile attributes. |
| 3 | `search_all_government_schemes` | Searches full government scheme database. |
| 4 | `search_central_schemes` | Searches Central Government schemes. |
| 5 | `search_state_schemes` | Searches State Government schemes. |
| 6 | `search_scholarships` | Searches post-matric, pre-matric, and merit scholarships. |
| 7 | `get_scheme_details` | Gets detailed scheme criteria and benefits. |
| 8 | `get_scheme_official_sources` | Gets verified official website and application URLs. |
| 9 | `get_official_application_url` | Gets direct verified official portal application link. |
| 10 | `get_scheme_guidelines` | Gets official government guidelines document URL. |
| 11 | `verify_scheme_source` | Verifies source status, HTTPS security, and .gov.in domain validity. |
| 12 | `get_eligibility_rules` | Retrieves published deterministic rule conditions. |
| 13 | `check_eligibility` | Evaluates citizen profile against scheme rules deterministically. |
| 14 | `get_required_documents` | Retrieves list of required government certificates. |
| 15 | `update_document_checklist` | Updates status of document in citizen checklist. |
| 16 | `extract_document_data` | Extracts OCR structured data from uploaded certificate. |
| 17 | `get_application_form` | Gets scheme application form template. |
| 18 | `prefill_application_form` | Prefills form fields from profile and OCR data. |
| 19 | `validate_application_form` | Performs field-level validation and highlights errors. |
| 20 | `request_submission_approval` | Initiates human approval checkpoint review. |
| 21 | `submit_application` | Enforces human approval check and prepares official portal handoff. |
| 22 | `track_application` | Tracks application timeline and status attribution. |
| 23 | `create_followup_reminder` | Creates follow-up reminder with due date and priority. |
| 24 | `get_agent_memory` | Gets long-term agent memory items for citizen. |
| 25 | `save_agent_memory` | Saves long-term agent memory item with citizen consent. |
