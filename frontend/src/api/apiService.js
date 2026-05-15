import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
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

export default API;
