import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) ||
  '';

const rawPublishableKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  '';

const rawAnonKey =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) ||
  '';

const supabaseUrl = rawUrl.trim().replace(/^['"]|['"]$/g, '');
const supabasePublishableKey = rawPublishableKey.trim().replace(/^['"]|['"]$/g, '');
const supabaseAnonKey = rawAnonKey.trim().replace(/^['"]|['"]$/g, '');
const supabaseKey = supabasePublishableKey || supabaseAnonKey;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseKey.length > 20 &&
  !supabaseUrl.includes('your-project-ref')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

if (typeof window !== 'undefined') {
  if (isSupabaseConfigured) {
    console.info('[Supabase] Initialized successfully with endpoint:', supabaseUrl);
  } else {
    console.warn('[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY/VITE_SUPABASE_ANON_KEY missing or invalid in environment.');
  }
}
