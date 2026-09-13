/**
 * Single source of truth for the backend address.
 *
 * VITE_API_URL may be set with or without the trailing "/api" (and with or without a final "/");
 * both "https://backend.vercel.app" and "https://backend.vercel.app/api/" work. Without this,
 * a missing "/api" made every request hit e.g. "/history-sections" → "Cannot GET".
 */
function normalizeApiBase(raw) {
  const fallback = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';
  let value = String(raw || '').trim();
  if (!value) return fallback;
  value = value.replace(/\/+$/, '');
  if (!/\/api$/i.test(value)) value += '/api';
  return value;
}

export const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_API_URL);

// Origin used for files served by the backend (e.g. /uploads/...)
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api$/i, '');
