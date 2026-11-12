# Testing Strategy & QA Report — PlacePilot AI

**Product:** PlacePilot AI (PS-01: Scheme Saathi)  
**Team:** Tech Dynamites • Shree L.R. Tiwari College of Engineering  

---

## 1. Automated Test Suite

PlacePilot AI includes automated unit tests for core deterministic business logic:

### Test Files
- `src/utils/rulesEngine.test.ts` — Tests deterministic condition evaluation across age, state, category, income, and education levels.
- `src/utils/authValidator.test.ts` — Tests email formatting, password strength requirements, and role assignment.
- `src/utils/formValidator.test.ts` — Tests field-level validation, mandatory field checks, and regex validation.

### Running Automated Tests
```bash
npm run build
npm run lint
```

---

## 2. End-to-End Acceptance Test Workflow

Perform the complete end-to-end citizen journey:

1. **Registration & Login**:
   - Access `/register`. Register a new account.
   - Verify assigned role is strictly `citizen`.
   - Complete the onboarding wizard (`/onboarding`).

2. **Scheme & Scholarship Discovery**:
   - Open Scheme Explorer and Scholarship Portal.
   - Search for `"MahaDBT"` or filter by `"State = Maharashtra"` and `"Category = Education"`.
   - Verify scheme cards display official source verification status badges (`VERIFIED`).

3. **Deterministic Eligibility Evaluation**:
   - Click **Check Eligibility** on *Post-Matric Scholarship for OBC Students (MahaDBT)*.
   - Verify deterministic evaluation output for Vedant Sharma (`Maharashtra`, `OBC`, `₹1,50,000` income):
     - **Verdict**: `ELIGIBLE`.
     - 4/4 conditions satisfied with published government citations.

4. **Document Readiness Studio**:
   - Upload sample certificate in Document Studio.
   - Click **Extract Data (OCR)**. Verify extracted certificate number and Tahsildar authority.
   - Confirm citizen verification status update.

5. **Application Prefill & Human Approval**:
   - Click **Prepare Application**. Verify form fields prefill automatically from profile & OCR.
   - Click **Proceed to Human Approval**.
   - Check both mandatory safety consent boxes.
   - Click **Approve & Handoff to Official Portal**.
   - Verify generation of cryptographic checksum (`AUDIT-APPROVAL-*`).

6. **Official Portal Handoff**:
   - Verify modal opens displaying official government URL (`https://mahadbt.maharashtra.gov.in/`).
   - Confirm safe external redirection.

7. **Tracking & Reminders**:
   - Open Application Tracker. Confirm timeline status updated to `Ready for Official Portal` with `Officially verified` attribution.
   - Add a follow-up reminder in Reminder Planner.

8. **Scheme Saathi AI Assistant**:
   - Ask Scheme Saathi in English, Hindi, or Marathi: *"I am a college student from Maharashtra. My family's annual income is approximately ₹1,50,000. Find scholarships that I may qualify for."*
   - Verify tool execution cards appear (`search_scholarships`, `check_eligibility`, `get_required_documents`).

9. **Admin Workspace**:
   - Switch role to Admin (`Pooja Kulkarni`).
   - Open `/admin`. Verify audit logs, source verification toggles, and catalog management.
   - Attempt accessing `/admin` as regular citizen and verify `AdminAccessDenied` screen appears.
