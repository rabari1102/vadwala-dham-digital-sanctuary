import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// ── Settings ──
export const getSettings = () => API.get('/settings');

// ── Banners ──
export const getBanners = (params) => API.get('/banners', { params: { status: 'published', sort: 'order', ...params } });

// ── History ──
export const getHistorySections = () => API.get('/history-sections', { params: { status: 'published', sort: 'order' } });

// ── Acharya Parampara ──
export const getAcharyaParampara = () => API.get('/acharya-parampara', { params: { status: 'published', sort: 'order' } });

// ── Gallery ──
export const getGalleryCategories = () => API.get('/gallery-categories', { params: { status: 'published', sort: 'order' } });
export const getGalleryItems = (params) => API.get('/gallery-items', { params: { status: 'published', sort: 'order', ...params } });

// ── Videos ──
export const getVideos = (params) => API.get('/videos', { params: { status: 'published', sort: '-publishDate', ...params } });

// ── Festivals ──
export const getFestivals = (params) => API.get('/festivals', { params: { status: 'published', sort: 'order', ...params } });

// ── Donations ──
export const getDonationItems = () => API.get('/donation-items', { params: { status: 'published', sort: 'order' } });
export const getPaymentInfo = () => API.get('/payment-info', { params: { status: 'published', sort: 'order' } });

// ── Activities ──
export const getActivities = (params) => API.get('/activities', { params: { status: 'published', sort: 'order', ...params } });

// ── Announcements ──
export const getAnnouncements = () => API.get('/announcements', { params: { isActive: true, status: 'published' } });

// ── Contact ──
export const getContact = () => API.get('/contact');
export const submitContactForm = (data) => API.post('/contact/form', data);

// ── SEO ──
export const getSeo = (pageSlug) => API.get('/seo', { params: { pageSlug } });

// ── Gaushala Content ──
export const getGaushalaContent = () => API.get('/gaushala-content', { params: { status: 'published' } });

// ── Dhaja Booking ──
export const submitDhajaBooking = (data) => API.post('/dhaja-bookings', data);

// ── Gurus ──
export const getGurus = () => API.get('/gurus', { params: { status: 'published' } });
export const getGuruBySlug = (slug) => API.get(`/gurus/${slug}`);
export const getGuruImages = (slug) => API.get(`/gurus/${slug}/images`);

// ── Bootstrap (one request per page instead of several) ──
// Falls back to the individual endpoints if the backend has not been redeployed yet.
async function withFallback(primary, fallback) {
  try {
    return (await primary()).data;
  } catch (err) {
    if (err.response?.status === 404) return fallback();
    throw err;
  }
}

export const getSiteBootstrap = () => withFallback(
  () => API.get('/bootstrap/site'),
  async () => {
    const [settings, contact, announcements] = await Promise.all([getSettings(), getContact(), getAnnouncements()]);
    return { settings: settings.data, contact: contact.data, announcements: announcements.data };
  },
);

export const getHomeBootstrap = () => withFallback(
  () => API.get('/bootstrap/home'),
  async () => {
    const [banners, festivals, gurus] = await Promise.all([getBanners(), getFestivals(), getGurus()]);
    return { banners: banners.data, festivals: festivals.data, gurus: gurus.data };
  },
);

export default API;
