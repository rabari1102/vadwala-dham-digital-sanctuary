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

export const api = {
  getAnnouncements: () => get<{ text: string }[]>('/announcements'),
  getAcharyas: () => get<{ nameGuj: string; name: string; current?: boolean; since?: string }[]>('/acharyas'),
  getServices: () => get<{ icon: string; titleGuj: string; title: string; descGuj: string; desc: string }[]>('/services'),
  getFestivals: () => get<{ icon: string; nameGuj: string; name: string; date: string; dateEn?: string; isUpcoming?: boolean }[]>('/festivals'),
  getContact: () => get<{ addressGuj: string; phones: string[]; email: string; darshanjMorning: string; darshanEvening: string; mapEmbedUrl: string }>('/contact'),
  getDonation: () => get<{ qrImageUrl: string; purposes: { label: string; icon: string }[]; phones: string[] }>('/donation'),
  getDhajaChadava: (date?: string) => get<{ _id: string; name: string; nameGuj?: string; village: string; date: string; samvat?: string; dedication?: string }[]>(`/dhaja-chadava${date ? `?date=${date}` : ''}`),
  addDhajaChadava: (data: unknown) => post('/dhaja-chadava', data),
};
