const express = require('express');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const { requireAuth } = require('../middleware/auth');
const Media = require('../models/Media');

const router = express.Router();

const MAX_FILE_MB = 15;
const MAX_FILES = 20;
const EXT_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/svg+xml': '.svg',
  'video/mp4': '.mp4',
  'video/webm': '.webm',
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_MB * 1024 * 1024, files: MAX_FILES },
  fileFilter(req, file, cb) {
    if (EXT_BY_MIME[file.mimetype]) return cb(null, true);
    const isHeic = /hei[cf]/i.test(file.mimetype) || /\.hei[cf]$/i.test(file.originalname);
    const err = new Error(isHeic
      ? `"${file.originalname}" is an iPhone HEIC photo. Please export it as JPG and upload again.`
      : `"${file.originalname}" is not a supported file. Use JPG, PNG, WebP, GIF, SVG, MP4 or WebM.`);
    err.status = 400;
    cb(err);
  },
});

function uniqueName(file) {
  const base = path.basename(file.originalname, path.extname(file.originalname))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'file';
  return `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${base}${EXT_BY_MIME[file.mimetype]}`;
}

// Cloudinary is used when configured (CLOUDINARY_URL or the three CLOUDINARY_* vars);
// otherwise files are stored in MongoDB and served from /uploads.
function cloudinaryConfig() {
  const url = process.env.CLOUDINARY_URL;
  if (url) {
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (match) return { apiKey: match[1], apiSecret: match[2], cloudName: match[3] };
  }
  const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret } = process.env;
  return cloudName && apiKey && apiSecret ? { cloudName, apiKey, apiSecret } : null;
}

async function uploadToCloudinary(file, cfg) {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_FOLDER || 'vadwala-dham';
  const signature = crypto
    .createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${cfg.apiSecret}`)
    .digest('hex');

  const form = new FormData();
  form.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);
  form.append('api_key', cfg.apiKey);
  form.append('timestamp', String(timestamp));
  form.append('folder', folder);
  form.append('signature', signature);

  const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image';
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cfg.cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: form,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error?.message || `Cloudinary upload failed (${res.status})`);
  return body.secure_url;
}

async function storeFile(file) {
  const cfg = cloudinaryConfig();
  if (cfg) {
    const url = await uploadToCloudinary(file, cfg);
    return { url, filename: url.split('/').pop(), storage: 'cloudinary' };
  }
  const filename = uniqueName(file);
  await Media.create({ filename, contentType: file.mimetype, data: file.buffer });
  return { url: '/uploads/' + filename, filename, storage: 'database' };
}

// Run multer but turn its errors (too large, wrong type, too many files) into clear JSON messages
function acceptFiles(middleware) {
  return (req, res, next) => middleware(req, res, (err) => {
    if (!err) return next();
    if (err instanceof multer.MulterError) {
      const messages = {
        LIMIT_FILE_SIZE: `File is too large. Maximum size is ${MAX_FILE_MB} MB.`,
        LIMIT_FILE_COUNT: `Too many files in one request (maximum ${MAX_FILES}).`,
        LIMIT_UNEXPECTED_FILE: `Unexpected upload field or too many files (maximum ${MAX_FILES}).`,
      };
      return res.status(400).json({ error: messages[err.code] || err.message });
    }
    return res.status(err.status || 400).json({ error: err.message });
  });
}

router.post('/', requireAuth, acceptFiles(upload.single('file')), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    res.json(await storeFile(req.file));
  } catch (err) {
    console.error('Upload failed:', err.message);
    res.status(502).json({ error: `Could not store "${req.file.originalname}": ${err.message}` });
  }
});

router.post('/multiple', requireAuth, acceptFiles(upload.array('files', MAX_FILES)), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  // One failed file no longer fails the whole batch
  const results = await Promise.allSettled(req.files.map(storeFile));
  res.json(results.map((result, i) => (result.status === 'fulfilled'
    ? result.value
    : { error: result.reason.message, originalname: req.files[i].originalname })));
});

module.exports = router;
