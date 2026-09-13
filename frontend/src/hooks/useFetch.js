import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

/**
 * Tiny stale-while-revalidate data layer shared by every page.
 *
 * - Responses are cached in memory per key, so going back to a page renders instantly.
 * - Concurrent requests for the same key are de-duplicated (one network call).
 * - Keys fetched with { persist: true } are also kept in localStorage so repeat visits
 *   paint real content immediately while fresh data loads in the background.
 */

const STALE_MS = 60 * 1000;
const PERSIST_PREFIX = 'vd-cache:v1:';

const entries = new Map();   // key -> { data, error, updatedAt }
const inflight = new Map();  // key -> Promise
const listeners = new Map(); // key -> Set<() => void>

function readPersisted(key) {
  try {
    const raw = localStorage.getItem(PERSIST_PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getEntry(key, persist) {
  let entry = entries.get(key);
  if (!entry && persist) {
    const saved = readPersisted(key);
    if (saved) {
      // updatedAt 0 marks persisted data as stale so it is revalidated on mount
      entry = { data: saved.data, error: null, updatedAt: 0 };
      entries.set(key, entry);
    }
  }
  return entry;
}

function setEntry(key, entry, persist) {
  entries.set(key, entry);
  if (persist && !entry.error) {
    try {
      localStorage.setItem(PERSIST_PREFIX + key, JSON.stringify({ data: entry.data }));
    } catch { /* storage full or unavailable */ }
  }
  listeners.get(key)?.forEach((notify) => notify());
}

function unwrap(result) {
  // apiService functions return axios responses; bootstrap helpers return plain data
  if (result && typeof result === 'object' && 'data' in result && 'status' in result && 'headers' in result) {
    return result.data;
  }
  return result;
}

export function fetchResource(key, fn, { force = false, persist = false } = {}) {
  const existing = getEntry(key, persist);
  if (inflight.has(key)) return inflight.get(key);
  if (!force && existing && !existing.error && Date.now() - existing.updatedAt < STALE_MS) {
    return Promise.resolve(existing.data);
  }

  const promise = Promise.resolve()
    .then(fn)
    .then((result) => {
      const data = unwrap(result);
      setEntry(key, { data, error: null, updatedAt: Date.now() }, persist);
      return data;
    })
    .catch((err) => {
      const current = entries.get(key);
      const message = err?.response?.data?.error || err?.message || 'Something went wrong';
      setEntry(key, { data: current?.data, error: message, updatedAt: current?.updatedAt || 0 }, false);
      throw err;
    })
    .finally(() => inflight.delete(key));

  inflight.set(key, promise);
  return promise;
}

/**
 * @param {string} key      unique cache key for this request
 * @param {Function} fn     function returning a promise (usually from apiService)
 * @param {{ persist?: boolean, enabled?: boolean }} options
 */
export default function useFetch(key, fn, { persist = false, enabled = true } = {}) {
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });

  const subscribe = useCallback((notify) => {
    let set = listeners.get(key);
    if (!set) {
      set = new Set();
      listeners.set(key, set);
    }
    set.add(notify);
    return () => set.delete(notify);
  }, [key]);

  const entry = useSyncExternalStore(subscribe, () => getEntry(key, persist), () => undefined);

  useEffect(() => {
    if (!enabled) return;
    fetchResource(key, () => fnRef.current(), { persist }).catch(() => {});
  }, [key, enabled, persist]);

  const refresh = useCallback(
    () => fetchResource(key, () => fnRef.current(), { force: true, persist }),
    [key, persist],
  );

  const data = entry?.data;
  return {
    data: data === undefined ? null : data,
    loading: enabled && data === undefined && !entry?.error,
    error: entry?.error || null,
    refresh,
  };
}
