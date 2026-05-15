import { useState, useEffect } from 'react';

/**
 * Custom hook for data fetching with loading/error states.
 * @param {Function} apiFn — an API function that returns a promise (from apiService)
 * @param {*} deps — dependency array for re-fetching
 */
export default function useFetch(apiFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiFn()
      .then(res => {
        if (!cancelled) setData(res.data);
      })
      .catch(err => {
        if (!cancelled) setError(err.message || 'Something went wrong');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, deps);

  return { data, loading, error, setData };
}
