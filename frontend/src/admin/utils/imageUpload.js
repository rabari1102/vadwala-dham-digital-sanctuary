import adminApi, { getErrorMessage } from '../hooks/adminApi';

export const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif';

const ACCEPTED = new Set(ACCEPTED_TYPES.split(','));
const COMPRESSIBLE = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_DIMENSION = 2400;
const SKIP_COMPRESSION_BELOW = 1.5 * 1024 * 1024;
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;

/** Returns an error message for files we can't upload, or null when the file is fine. */
export function validateFile(file) {
  if (/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name)) {
    return `"${file.name}" is an iPhone HEIC photo. Please export it as JPG first.`;
  }
  if (!file.type.startsWith('image/')) return `"${file.name}" is not an image.`;
  if (!ACCEPTED.has(file.type)) return `"${file.name}" has an unsupported format (${file.type}).`;
  return null;
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read "${file.name}". The file may be damaged.`));
    };
    img.src = url;
  });
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/**
 * Resize big photos (max 2400px) and re-encode as WebP (JPEG/PNG fallback) before upload.
 * Phone photos go from 4–8 MB to a few hundred KB, which makes uploads fast and keeps storage small.
 */
export async function compressImage(file, { maxDimension = MAX_DIMENSION, quality = 0.85 } = {}) {
  if (!COMPRESSIBLE.has(file.type)) return file;

  const img = await loadImage(file);
  const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth, img.naturalHeight));
  if (scale === 1 && file.size < SKIP_COMPRESSION_BELOW) return file;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

  let blob = await canvasToBlob(canvas, 'image/webp', quality);
  if (!blob || blob.type !== 'image/webp') {
    blob = await canvasToBlob(canvas, file.type === 'image/png' ? 'image/png' : 'image/jpeg', quality);
  }
  if (!blob || blob.size >= file.size) return file;

  const ext = { 'image/webp': 'webp', 'image/png': 'png' }[blob.type] || 'jpg';
  return new File([blob], `${file.name.replace(/\.[^.]+$/, '')}.${ext}`, { type: blob.type, lastModified: Date.now() });
}

/** Validate, compress and upload one image. Resolves with the stored URL. */
export async function uploadImage(file, { onProgress, compress = true } = {}) {
  const error = validateFile(file);
  if (error) throw new Error(error);

  const prepared = compress ? await compressImage(file) : file;
  if (prepared.size > MAX_UPLOAD_BYTES) {
    throw new Error(`"${file.name}" is larger than 15 MB. Please use a smaller photo.`);
  }

  try {
    const res = await adminApi.upload(prepared, { onProgress });
    return res.data.url;
  } catch (err) {
    throw new Error(getErrorMessage(err, `Upload failed for "${file.name}"`), { cause: err });
  }
}

/**
 * Upload many images with limited parallelism. Never rejects: each result is { url } or { error }.
 */
export async function uploadImages(files, { concurrency = 3, onItemProgress, onItemDone } = {}) {
  const results = new Array(files.length);
  let next = 0;

  async function worker() {
    while (next < files.length) {
      const index = next;
      next += 1;
      try {
        const url = await uploadImage(files[index], { onProgress: (p) => onItemProgress?.(index, p) });
        results[index] = { url };
      } catch (err) {
        results[index] = { error: err.message };
      }
      onItemDone?.(index, results[index]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, worker));
  return results;
}
