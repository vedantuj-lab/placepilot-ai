# PlacePilot AI (Scheme Saathi) — System Architecture & Design Document

**Product:** PlacePilot AI  
**Problem Statement:** AgentX PS-01 — Scheme Saathi  
**Team:** Tech Dynamites  
**Institution:** Shree L.R. Tiwari College of Engineering  
**Tagline:** *Your welfare benefits journey, finally connected.*  
**Core Principle:** *RULES DECIDE. AI ASSISTS. HUMANS APPROVE.*

---

## 1. High-Level Architectural Diagram

```
+-----------------------------------------------------------------------------------+
|                                 CITIZEN / USER                                    |
|   (Browser / Mobile Web - Responsive Dark Theme, Emerald Highlights, Multi-lingual) |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                              FRONTEND SPA (Vite + React 19)                       |
|  - Citizen Dashboard & Profile Folio                                              |
|  - Government Scheme & Scholarship Explorer                                       |
|  - Deterministic Eligibility Engine UI                                            |
|  - Document Readiness Studio (PDF/JPG/PNG Upload & OCR View)                      |
|  - Application Form Studio & Handoff Preparation                                  |
|  - Human Approval Safety Checkpoint                                               |
|  - Application Tracker & Reminder Planner                                         |
|  - Scheme Saathi AI Assistant (Voice / Audio / Multi-lingual Chat UI)             |
+-----------------------------------------------------------------------------------+
             |                                       |
             | REST API & Tool Calls                 | Direct Supabase JS SDK
             v                                       v
+-----------------------------------+   +-------------------------------------------+
| BACKEND SERVER (Node.js/Express)  |   | SUPABASE CLOUD PLATFORM                   |
| - Scheme Saathi Orchestrator      |   | - PostgreSQL Database (22 Tables)         |
| - 25 Gemini Tool Implementations  |   | - Auth Engine (Email/Password & OAuth)    |
| - @google/genai SDK Integration   |   | - Row Level Security (RLS) Policies       |
| - Deterministic Rules Engine      |   | - Private Storage Buckets (Document Store)|
| - Human Approval & Audit Logger   |   +-------------------------------------------+
| - Health Check & Metrics          |
+-----------------------------------+
```

---

## 2. Core Architectural Principles

### 1. RULES DECIDE
Eligibility is evaluated deterministically by executing published, structured government conditions (`rulesEngine.ts`) against citizen profile attributes. The AI agent never invents eligibility rules or overrides published norms.

### 2. AI ASSISTS
Gemini Nano / Gemini 3.8 Flash acts as an agentic companion ("Scheme Saathi"), orchestrating searches, extracting OCR data from uploaded certificates, generating personalized document checklists, prefilling forms, and providing multi-lingual guidance in English, Hindi, and Marathi.

### 3. HUMANS APPROVE
Consequential actions—such as application submission handoffs or official data transmissions—strictly require explicit, audited human approval (`HumanApprovalCenter.tsx`). A unique cryptographic checksum (`AUDIT-APPROVAL-*`) is recorded in the immutable audit log.

---

## 3. Data Flow & Handoff Pipeline

1. **Discovery & Filtering**: Citizen explores schemes using state, level, category, and income filters.
2. **Deterministic Evaluation**: Rules engine checks citizen attributes against published criteria, providing condition-by-condition breakdown.
3. **Document Readiness**: Certificates are uploaded, classified, OCR-extracted, and mapped to the required checklist.
4. **Form Prefill**: Fields are prefilled from profile and extracted OCR data, with instant field validation.
5. **Human Approval Checkpoint**: Application summary, attached documents, and digital signature statement are presented to the citizen for explicit confirmation.
6. **Official Portal Handoff**: Upon approval, safe redirection to the verified official government portal (e.g. `mahadbt.maharashtra.gov.in`, `scholarships.gov.in`, `pmkisan.gov.in`) is initiated with last verified source metadata.
7. **Follow-Up & Tracking**: Citizen tracks application status timeline and configures automated reminders.

---

## 4. Security Architecture

- **Row-Level Security (RLS)**: Enforced across all Supabase database tables (`profiles`, `documents`, `applications`, `reminders`, `approvals`).
- **Private Document Storage**: Files are stored in private Supabase Storage buckets accessible only by authorized asset owners.
- **Role-Based Access Control (RBAC)**: Public registrations default strictly to the `citizen` role. `admin` privileges are restricted to authorized backend processes.
- **Audit Traceability**: Immutable audit logs record all approvals, profile updates, source status changes, and authentication events.
