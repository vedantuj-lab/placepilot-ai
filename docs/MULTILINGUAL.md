# PlacePilot AI — Multilingual System Architecture

**Framework**: `i18next` + `react-i18next`  
**Supported Languages**:
- English (`en`)
- Hindi (`hi` — हिंदी)
- Marathi (`mr` — मराठी)

---

## Translation Dictionaries Structure
- `src/locales/en/common.json`: English UI tokens and notifications.
- `src/locales/hi/common.json`: Devanagari Hindi translations.
- `src/locales/mr/common.json`: Devanagari Marathi translations.

---

## Language Persistence & Sync
- Language selection is saved to `localStorage.getItem('placepilot_language')` for unauthenticated visitors.
- For authenticated citizens and admins, language selection is saved directly into their profile (`profile.language`).
- Selection persists across page refreshes, route changes, and application sessions.
