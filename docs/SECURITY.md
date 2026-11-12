# Security Architecture & Secret Management — PlacePilot AI

**Product:** PlacePilot AI (PS-01: Scheme Saathi)  
**Team:** Tech Dynamites • Shree L.R. Tiwari College of Engineering  

---

## 1. Secret Isolation & Privileged Key Safeguards

### CRITICAL RULES ENFORCED
- `SUPABASE_SERVICE_ROLE_KEY` is **STRICTLY RESTRICTED TO SERVER-SIDE OPERATIONS** (`server.ts` or Node.js environment variables).
- **NEVER** expose the Service Role key with a `VITE_` prefix.
- **NEVER** import or reference the Service Role key in React client components, browser bundles, or mobile applications.
- **NEVER** commit `.env.local` or secret environment files to version control (`.gitignore` enforces `.env*` exclusion).
- **NEVER** return or log Service Role keys in REST API responses.

---

## 2. Frontend vs Backend Credential Usage

| Environment | Key Used | Privilege Level | Scope |
|---|---|---|---|
| **React Frontend (Vite)** | `VITE_SUPABASE_ANON_KEY` | Public / RLS Enforced | Client-side auth, user queries, document uploads. |
| **Node.js Express Server** | `SUPABASE_SERVICE_ROLE_KEY` | Elevated Privileges | Server-side admin tasks, background workers. |

---

## 3. Database Security & Row Level Security (RLS)

All user-owned database tables (`profiles`, `documents`, `applications`, `reminders`, `saved_schemes`, `approvals`, `memory_items`) enforce Row Level Security:

```sql
-- Profile ownership check
CREATE POLICY "Users can view and update own profile" 
ON public.profiles 
FOR ALL USING (auth.uid() = auth_user_id);

-- Document storage ownership check
CREATE POLICY "Users can access own uploaded documents" 
ON public.documents 
FOR ALL USING (auth.uid() = citizen_id);
```

---

## 4. Human Approval Audit Traceability

All consequential application submission handoffs generate an immutable cryptographic checksum:
- Format: `AUDIT-APPROVAL-[TIMESTAMP]-[CHECKSUM]`
- Audit records store: Citizen ID, IP Hash, Timestamp, Statement of Accuracy.
