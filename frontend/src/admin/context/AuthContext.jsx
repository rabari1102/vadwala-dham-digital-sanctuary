import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL as API } from '../../config/api';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  // Only show the loading state when there is a stored token to verify
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('admin_token')));

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) return;
    axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setAdmin(r.data))
      .catch(() => localStorage.removeItem('admin_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem('admin_token', res.data.token);
    setAdmin(res.data.admin);
    return res.data;
  };

  const logout = () => { localStorage.removeItem('admin_token'); setAdmin(null); };

  return <AuthContext.Provider value={{ admin, login, logout, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
