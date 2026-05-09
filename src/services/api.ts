const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, options);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// --- Type definitions ---
export interface HeroSlide {
  _id: string;
  imageUrl: string;
  tagline: string;
  taglineEn?: string;
  order: number;
}

export interface Announcement {
  _id: string;
  text: string;
  order: number;
}

export interface AboutData {
  _id: string;
  historyParagraphs: string[];
  facts: { icon: string; titleGuj: string; text: string; order: number }[];
  gates: { icon: string; name: string; nameGuj: string }[];
  fiveDeitiesGuj: string;
}

export interface AcharyaData {
  _id: string;
  nameGuj: string;
  name: string;
  order: number;
  current?: boolean;
  since?: string;
}

export interface ServiceData {
  _id: string;
  icon: string;
  titleGuj: string;
  title: string;
  descGuj: string;
  desc: string;
  order: number;
}

export interface FestivalData {
  _id: string;
  icon: string;
  nameGuj: string;
  name: string;
  date: string;
  dateEn?: string;
  isUpcoming?: boolean;
  order: number;
}

export interface GalleryItem {
  _id: string;
  imageUrl: string;
  cat: string;
  catEn?: string;
  tag: string;
  order: number;
}

export interface ContactData {
  _id: string;
  addressGuj: string;
  addressEn?: string;
  phones: string[];
  email: string;
  website?: string;
  darshanjMorning: string;
  darshanEvening: string;
  mapEmbedUrl: string;
  socialLinks: { icon: string; label: string; url: string }[];
}

export interface DonationData {
  _id: string;
  qrImageUrl: string;
  purposes: { label: string; icon: string }[];
  fcraEligible?: boolean;
  phones: string[];
}

export interface DhajaEntry {
  _id?: string;
  name: string;
  nameGuj?: string;
  village: string;
  date: string;
  samvat?: string;
  dedication?: string;
}

export interface SiteContentData {
  _id: string;
  key: string;
  title: string;
  body: string;
  imageUrl?: string;
  order: number;
}

export const api = {
  getHero: () => apiFetch<HeroSlide[]>('/hero'),
  getAnnouncements: () => apiFetch<Announcement[]>('/announcements'),
  getAbout: () => apiFetch<AboutData>('/about'),
  getAcharyas: () => apiFetch<AcharyaData[]>('/acharyas'),
  getServices: () => apiFetch<ServiceData[]>('/services'),
  getFestivals: () => apiFetch<FestivalData[]>('/festivals'),
  getGallery: (tag?: string) => apiFetch<GalleryItem[]>(`/gallery${tag && tag !== 'all' ? `?tag=${tag}` : ''}`),
  getContact: () => apiFetch<ContactData>('/contact'),
  getDonation: () => apiFetch<DonationData>('/donation'),
  getSiteContent: () => apiFetch<SiteContentData[]>('/content'),
  getDhajaChadava: (date?: string) => apiFetch<DhajaEntry[]>(`/dhaja-chadava${date ? `?date=${date}` : ''}`),
  addDhajaChadava: (data: unknown) => apiFetch('/dhaja-chadava', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }),
  adminLogin: (username: string, password: string) =>
    apiFetch<{ token: string }>('/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }),
};
