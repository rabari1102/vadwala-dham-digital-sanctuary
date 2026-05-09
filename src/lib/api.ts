import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from memory if present
axiosInstance.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// In-memory token store (not localStorage for security)
let _adminToken: string | null = null;

export function setAdminToken(token: string | null) {
  _adminToken = token;
}

export function getAdminToken(): string | null {
  return _adminToken;
}

export function isAdminLoggedIn(): boolean {
  return _adminToken !== null;
}

export default axiosInstance;
