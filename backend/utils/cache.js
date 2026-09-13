/**
 * Response caching for public GET endpoints.
 *
 * Two layers:
 *  1. Cache-Control headers so Vercel's CDN (and browsers) serve repeat requests
 *     without invoking the function at all.
 *  2. A small in-memory TTL cache so a warm instance answers without a DB round trip.
 *
 * Authenticated requests (admin panel) always bypass both layers so edits show instantly.
 * Any successful write clears the in-memory cache on the instance that handled it.
 */

const store = new Map();
const MEMORY_TTL_MS = 15 * 1000;
const MAX_ENTRIES = 500;

// Short CDN cache so admin edits appear on the public site within ~30 seconds;
// browsers always revalidate (max-age=0) so nobody keeps an old copy locally.
const PUBLIC_CACHE_HEADER = 'public, max-age=0, s-maxage=30, stale-while-revalidate=60';

function clear() {
  store.clear();
}

function publicCache(req, res, next) {
  if (req.method !== 'GET' || req.headers.authorization) {
    res.set('Cache-Control', 'private, no-store');
    return next();
  }

  const key = req.originalUrl;
  const hit = store.get(key);
  res.vary('Authorization'); // append — never overwrite Vary headers set by other middleware

  if (hit && hit.expires > Date.now()) {
    res.set('Cache-Control', PUBLIC_CACHE_HEADER);
    res.set('X-Cache', 'HIT');
    return res.json(hit.body);
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode === 200) {
      if (store.size >= MAX_ENTRIES) store.delete(store.keys().next().value);
      store.set(key, { body, expires: Date.now() + MEMORY_TTL_MS });
      res.set('Cache-Control', PUBLIC_CACHE_HEADER);
    } else {
      res.set('Cache-Control', 'no-store');
    }
    return originalJson(body);
  };
  next();
}

function invalidateOnWrite(req, res, next) {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return next();
  res.on('finish', () => {
    if (res.statusCode < 400) clear();
  });
  next();
}

module.exports = { publicCache, invalidateOnWrite, clear };
