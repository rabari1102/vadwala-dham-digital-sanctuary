const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');
const ASSET_BASE = API_URL.replace(/\/api\/?$/, '');

const CLOUDINARY_UPLOAD = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/;
const CLOUDINARY_TRANSFORM = /^([a-z]{1,3}_[^/]*\/)+/;

/**
 * Resolve an image path to a URL.
 * Cloudinary images are served as auto-format (WebP/AVIF), auto-quality and — when a
 * width is given — resized server-side, which cuts image bytes by 80–95%.
 * @param {string} path  Cloudinary URL, absolute URL, or /uploads/... path
 * @param {number} [width] rendered width in CSS px (pass roughly 2x for sharp retina)
 */
export function getImageUrl(path, width) {
  if (!path || typeof path !== 'string') return '';

  const match = path.match(CLOUDINARY_UPLOAD);
  if (match) {
    const rest = match[2];
    if (CLOUDINARY_TRANSFORM.test(rest)) return path; // already transformed
    const transform = width ? `f_auto,q_auto,c_limit,w_${width}` : 'f_auto,q_auto';
    return `${match[1]}${transform}/${rest}`;
  }

  if (path.startsWith('http')) return path;
  return `${ASSET_BASE}${path}`;
}

/**
 * Download a photo with a proper filename.
 * - Cloudinary: uses the fl_attachment flag so the CDN sends it as a download (original quality).
 * - Backend uploads: uses /api/download which sets Content-Disposition: attachment.
 * - Other external URLs: opened in a new tab (cross-origin downloads are blocked by browsers).
 */
export function downloadPhoto(imageUrl, filename) {
  if (!imageUrl) return;
  const file = imageUrl.split('?')[0].split('/').pop() || 'photo.jpg';
  const name = filename || file;

  let href;
  const match = imageUrl.match(CLOUDINARY_UPLOAD);
  if (match) {
    const rest = match[2].replace(CLOUDINARY_TRANSFORM, '');
    const safeBase = name
      .replace(/\.[a-z0-9]+$/i, '')
      .replace(/[^A-Za-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'photo';
    href = `${match[1]}fl_attachment:${safeBase}/${rest}`;
  } else if (imageUrl.startsWith('http') && !(ASSET_BASE && imageUrl.startsWith(ASSET_BASE))) {
    window.open(imageUrl, '_blank', 'noopener');
    return;
  } else {
    href = `${API_URL}/download?file=${encodeURIComponent(file)}&name=${encodeURIComponent(name)}`;
  }

  const a = document.createElement('a');
  a.href = href;
  a.download = name;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
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
