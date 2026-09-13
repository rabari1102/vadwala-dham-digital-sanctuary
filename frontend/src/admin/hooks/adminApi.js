import axios from 'axios';

const API = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

const client = axios.create({ baseURL: API, timeout: 30000 });

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // Admin reads must never be served from a CDN/browser cache of the public site
  if ((config.method || 'get').toLowerCase() === 'get') {
    config.params = { ...config.params, _t: Date.now() };
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || '';
    // Expired / invalid login: send the admin back to the login page instead of failing silently
    if (status === 401 && /token/i.test(message) && localStorage.getItem('admin_token')) {
      localStorage.removeItem('admin_token');
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.assign('/admin/login?expired=1');
      }
    }
    return Promise.reject(error);
  },
);

/** Human-readable error text for toasts. */
export function getErrorMessage(error, fallback = 'Something went wrong') {
  if (!error) return fallback;
  if (error.code === 'ECONNABORTED') return 'The request timed out. Please check your internet connection and try again.';
  if (!error.response) {
    return error.message === 'Network Error' ? 'Network error — could not reach the server.' : (error.message || fallback);
  }
  const { status, data } = error.response;
  if (data?.error) return data.error;
  if (status === 413) return 'The file is too large for the server.';
  if (status === 403) return 'You do not have permission to do this.';
  return `${fallback} (HTTP ${status})`;
}

const adminApi = {
  getAll: (endpoint, params) => client.get(`/${endpoint}`, { params }),
  getOne: (endpoint, id) => client.get(`/${endpoint}/${id}`),
  create: (endpoint, data) => client.post(`/${endpoint}`, data),
  update: (endpoint, id, data) => client.put(`/${endpoint}/${id}`, data),
  remove: (endpoint, id) => client.delete(`/${endpoint}/${id}`),
  toggleStatus: (endpoint, id) => client.patch(`/${endpoint}/${id}/toggle-status`, {}),
  reorder: (endpoint, items) => client.patch(`/${endpoint}/reorder`, { items }),
  bulkCreate: (endpoint, items) => client.post(`/${endpoint}/bulk`, { items }),
  bulkDelete: (endpoint, ids) => client.post(`/${endpoint}/bulk-delete`, { ids }),
  // For singleton endpoints (settings, contact)
  getSingleton: (endpoint) => client.get(`/${endpoint}`),
  updateSingleton: (endpoint, data) => client.put(`/${endpoint}`, data),
  upload: (file, { onProgress, signal } = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    return client.post('/upload', formData, {
      timeout: 180000,
      signal,
      onUploadProgress: (event) => {
        if (onProgress && event.total) onProgress(Math.min(1, event.loaded / event.total));
      },
    });
  },
};

export default adminApi;
