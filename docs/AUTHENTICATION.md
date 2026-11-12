# PlacePilot AI — Authentication & Security Architecture

**Two Portals**:
1. **Portal 1 (Citizen Login)**: `/login` (Email/Password & Google OAuth).
2. **Portal 2 (Admin Login)**: `/admin-login` (Email/Password ONLY).

---

## Key Security Controls
- **NO Google OAuth on Admin Login**: Admin permissions require verified email/password credentials and role checks.
- **NO Public Admin Registration**: Public registration strictly assigns `role = 'citizen'`.
- **User-Specific Storage Binding**: `placepilot_user_profile_[USER_ID]` prevents demo fallback data (`Vedant Sharma`) from polluting real user sessions.
- **Row Level Security (RLS)**: PostgreSQL policies restrict citizens to reading published schemes and accessing only their own private documents and applications.
