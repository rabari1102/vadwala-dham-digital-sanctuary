const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = API_URL.replace('/api', '');
  return `${base}${path}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('gu-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function truncate(str, len = 100) {
  if (!str || str.length <= len) return str || '';
  return str.slice(0, len) + '...';
}
