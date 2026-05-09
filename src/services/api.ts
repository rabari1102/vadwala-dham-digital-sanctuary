const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function post<T>(path: string, body: unknown): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
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

export const api = {
  // Hero
  getHero: () => get<HeroSlide[]>('/hero'),

  // Announcements
  getAnnouncements: () => get<Announcement[]>('/announcements'),

  // About
  getAbout: () => get<AboutData>('/about'),

  // Acharyas
  getAcharyas: () => get<AcharyaData[]>('/acharyas'),

  // Services
  getServices: () => get<ServiceData[]>('/services'),

  // Festivals
  getFestivals: () => get<FestivalData[]>('/festivals'),

  // Gallery
  getGallery: (tag?: string) => get<GalleryItem[]>(`/gallery${tag && tag !== 'all' ? `?tag=${tag}` : ''}`),

  // Contact
  getContact: () => get<ContactData>('/contact'),

  // Donation
  getDonation: () => get<DonationData>('/donation'),

  // Dhaja Chadava
  getDhajaChadava: (date?: string) => get<DhajaEntry[]>(`/dhaja-chadava${date ? `?date=${date}` : ''}`),
  addDhajaChadava: (data: unknown) => post('/dhaja-chadava', data),
};
