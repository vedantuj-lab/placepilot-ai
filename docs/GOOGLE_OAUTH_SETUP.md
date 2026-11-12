# Google OAuth Setup Guide — PlacePilot AI

**Product:** PlacePilot AI (PS-01: Scheme Saathi)  
**Team:** Tech Dynamites • Shree L.R. Tiwari College of Engineering  

---

## 1. Google Cloud Console Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project named `PlacePilot AI`.
3. Navigate to **APIs & Services** -> **OAuth consent screen**.
   - User Type: **External**.
   - App Name: `PlacePilot AI — Scheme Saathi`.
   - User Support Email: Your developer email.
   - Developer Contact Information: Your email.
   - Authorized Domains: Add `supabase.co`.
4. Navigate to **Credentials** -> **Create Credentials** -> **OAuth client ID**.
   - Application type: **Web application**.
   - Name: `PlacePilot Web Client`.
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://your-project-id.supabase.co`
   - Authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
5. Save and copy your **Client ID** and **Client Secret**.

---

## 2. Supabase OAuth Provider Configuration

1. Log into your [Supabase Dashboard](https://supabase.com).
2. Select your `placepilot-ai` project.
3. Go to **Authentication** -> **Providers** -> **Google**.
4. Enable the **Google** toggle.
5. Paste your Google **Client ID** and **Client Secret**.
6. Set the **Callback URL (for OAuth)**:
   - Copy the Callback URL provided by Supabase (e.g., `https://your-project-id.supabase.co/auth/v1/callback`).
7. Save changes.

---

## 3. Frontend Redirect URL Configuration

In Supabase Dashboard -> **Authentication** -> **URL Configuration**:

- **Site URL**: `http://localhost:3000`
- **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/dashboard`

---

## 4. How Google Auth Operates in PlacePilot AI

When a user clicks **Sign in with Google** on the login or registration page:

```typescript
await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
});
```

1. The browser redirects to Google's sign-in screen.
2. Upon user consent, Google redirects back to Supabase auth handler.
3. Supabase issues a session token and redirects to `/auth/callback`.
4. `src/App.tsx` intercepts the callback session, maps user metadata to a Citizen Profile with role `citizen`, and opens the onboarding view or dashboard.
