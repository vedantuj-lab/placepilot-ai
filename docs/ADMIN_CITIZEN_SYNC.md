# PlacePilot AI — Admin-to-Citizen Database Synchronization

**Database Engine**: Supabase PostgreSQL (`burqjmoxkkvbnyvgiobq.supabase.co`)  
**Realtime Broadcasting**: Enabled on `schemes`, `scholarships`, `eligibility_rules`, `scheme_documents`.

---

## Synchronization Workflow
1. **Admin Workspace Action**:
   - Officer adds or updates a scheme/scholarship in Admin Workspace.
   - Record is upserted to `schemes` table with status `PUBLISHED`.
2. **Citizen Workspace Sync**:
   - Supabase Realtime subscription broadcasts change event to connected citizen clients.
   - Scheme Explorer and Scholarship Portal automatically refetch and render the updated catalogue.
