import { createClient } from '@supabase/supabase-js';

// Default connection keys for the Iffah Cloud Community
const DEFAULT_SUPABASE_URL = 'https://vejzlupklbzzfcoveztz.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_NZC17FaIGYWK6ZsqdETnpA_Rgb2azTR';

// Default / fallback keys from Vite environment variables
const ENV_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const ENV_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

let cachedClient = null;

export function cleanSupabaseUrl(rawUrl) {
  if (!rawUrl) return '';
  return rawUrl.trim()
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/+$/, '');
}

export function getStoredSupabaseConfig() {
  try {
    const stored = localStorage.getItem('iffah_supabase_config');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.url && parsed.key) {
        return {
          url: cleanSupabaseUrl(parsed.url),
          key: parsed.key.trim()
        };
      }
    }
  } catch (e) {
    console.warn('Gagal membaca config Supabase dari localStorage:', e);
  }

  if (ENV_SUPABASE_URL && ENV_SUPABASE_ANON_KEY) {
    return {
      url: cleanSupabaseUrl(ENV_SUPABASE_URL),
      key: ENV_SUPABASE_ANON_KEY.trim(),
      isFromEnv: true
    };
  }

  return { url: cleanSupabaseUrl(ENV_SUPABASE_URL), key: '', isFromEnv: false };
}

export function isSupabaseConfigured() {
  const config = getStoredSupabaseConfig();
  return Boolean(config.url && config.key);
}

export function getSupabase() {
  const config = getStoredSupabaseConfig();
  if (!config.url || !config.key) {
    return null;
  }

  // Jika client sudah dibuat dengan URL yang sama, pakai cache
  if (cachedClient && cachedClient.supabaseUrl === config.url) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    return cachedClient;
  } catch (err) {
    console.error('Gagal menginisialisasi Supabase client:', err);
    return null;
  }
}

export function saveSupabaseConfig(url, key) {
  try {
    if (!url || !key) {
      localStorage.removeItem('iffah_supabase_config');
      cachedClient = null;
      return false;
    }
    const cleanUrl = cleanSupabaseUrl(url);
    const cleanKey = key.trim();
    localStorage.setItem(
      'iffah_supabase_config',
      JSON.stringify({ url: cleanUrl, key: cleanKey })
    );
    cachedClient = null;
    return true;
  } catch (e) {
    console.error('Gagal menyimpan config Supabase:', e);
    return false;
  }
}
