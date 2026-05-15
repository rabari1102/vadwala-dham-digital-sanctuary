import { createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { getSettings, getContact, getAnnouncements } from '../api/apiService';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const { data: settings, loading: settingsLoading } = useFetch(() => getSettings(), []);
  const { data: contact, loading: contactLoading } = useFetch(() => getContact(), []);
  const { data: announcements } = useFetch(() => getAnnouncements(), []);

  const value = {
    settings: settings || {},
    contact: contact || {},
    announcements: announcements || [],
    loading: settingsLoading || contactLoading,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSiteSettings() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSiteSettings must be used within SiteProvider');
  return ctx;
}
