const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = API_URL.replace('/api', '');
  return `${base}${path}`;
}

/**
 * Download a photo with a proper filename.
 * Uses the backend /api/download endpoint which sets Content-Disposition: attachment.
 * @param {string} imageUrl - The full image URL or /uploads/... path
 * @param {string} filename - Desired download filename e.g. "gallery-1.jpg"
 */
export function downloadPhoto(imageUrl, filename) {
  // Extract just the file basename from the URL or path
  const file = imageUrl.split('/').pop();
  const name = filename || file || 'photo.jpg';
  // Build the download URL pointing to backend endpoint
  const downloadUrl = `${API_URL}/download?file=${encodeURIComponent(file)}&name=${encodeURIComponent(name)}`;
  
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function formatDate(dateStr, locale = 'gu-IN') {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function truncate(str, len = 100) {
  if (!str || str.length <= len) return str || '';
  return str.slice(0, len) + '...';
}
