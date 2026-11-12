import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const getEnvVar = (name: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta && import.meta.env && typeof import.meta.env[name] !== 'undefined') {
      return String(import.meta.env[name] || '');
    }
  } catch {
    // import.meta may not be available in some runtimes
  }

  try {
    if (typeof process !== 'undefined' && process && process.env && typeof process.env[name] !== 'undefined') {
      return String(process.env[name] || '');
    }
  } catch {
    // process may not be available in browser
  }

  return '';
};

export const normalizeSupabaseUrl = (url?: string): string => {
  if (!url) return '';
  let trimmed = String(url).trim();
  if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return '';
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed.replace(/\/+$/, '');
};

export const isValidHttpUrl = (urlString?: string): boolean => {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.length > 0;
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = (): boolean => {
  const rawUrl = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('SUPABASE_URL');
  const rawKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY');
  if (!rawUrl || !rawKey) return false;

  const strUrl = String(rawUrl).trim();
  const strKey = String(rawKey).trim();

  if (
    !strUrl ||
    strUrl === 'undefined' ||
    strUrl === 'null' ||
    strUrl.includes('your-project-id.supabase.co') ||
    !strKey ||
    strKey === 'undefined' ||
    strKey === 'null' ||
    strKey.includes('YOUR_SUPABASE_PUBLISHABLE_KEY') ||
    strKey.includes('YOUR_SUPABASE') ||
    strKey.includes('your_supabase_anon_key_here')
  ) {
    return false;
  }

  const normalized = normalizeSupabaseUrl(strUrl);
  return isValidHttpUrl(normalized);
};

const initSupabase = (): SupabaseClient => {
  const fallbackUrl = 'https://placeholder-project.supabase.co';
  const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

  if (isSupabaseConfigured()) {
    try {
      const rawUrl = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('SUPABASE_URL');
      const rawKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY');
      const normalizedUrl = normalizeSupabaseUrl(rawUrl);
      const key = String(rawKey).trim();
      return createClient(normalizedUrl, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    } catch (err) {
      console.warn('Failed to initialize Supabase with configured environment variables, falling back:', err);
    }
  }

  return createClient(fallbackUrl, fallbackKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
};

export const supabase: SupabaseClient = initSupabase();
