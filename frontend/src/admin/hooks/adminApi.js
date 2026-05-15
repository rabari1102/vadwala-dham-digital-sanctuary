import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getHeaders() {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const adminApi = {
  getAll: (endpoint, params) => axios.get(`${API}/${endpoint}`, { params, headers: getHeaders() }),
  getOne: (endpoint, id) => axios.get(`${API}/${endpoint}/${id}`, { headers: getHeaders() }),
  create: (endpoint, data) => axios.post(`${API}/${endpoint}`, data, { headers: getHeaders() }),
  update: (endpoint, id, data) => axios.put(`${API}/${endpoint}/${id}`, data, { headers: getHeaders() }),
  remove: (endpoint, id) => axios.delete(`${API}/${endpoint}/${id}`, { headers: getHeaders() }),
  toggleStatus: (endpoint, id) => axios.patch(`${API}/${endpoint}/${id}/toggle-status`, {}, { headers: getHeaders() }),
  reorder: (endpoint, items) => axios.patch(`${API}/${endpoint}/reorder`, { items }, { headers: getHeaders() }),
  // For singleton endpoints (settings, contact)
  getSingleton: (endpoint) => axios.get(`${API}/${endpoint}`, { headers: getHeaders() }),
  updateSingleton: (endpoint, data) => axios.put(`${API}/${endpoint}`, data, { headers: getHeaders() }),
};

export default adminApi;
