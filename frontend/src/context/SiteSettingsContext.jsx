import { createContext, useContext, useMemo } from 'react';
import useFetch from '../hooks/useFetch';
import { getSiteBootstrap } from '../api/apiService';

const SiteContext = createContext(null);
const EMPTY_OBJECT = {};
const EMPTY_LIST = [];

export function SiteProvider({ children }) {
  // One request for settings + contact + announcements, persisted for instant repeat visits
  const { data, loading } = useFetch('site', getSiteBootstrap, { persist: true });

  const value = useMemo(() => ({
    settings: data?.settings || EMPTY_OBJECT,
    contact: data?.contact || EMPTY_OBJECT,
    announcements: data?.announcements || EMPTY_LIST,
    loading,
  }), [data, loading]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSiteSettings() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSiteSettings must be used within SiteProvider');
  return ctx;
}
