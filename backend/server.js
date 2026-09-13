const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { connectDB } = require('./utils/db');
const { publicCache, invalidateOnWrite } = require('./utils/cache');

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');

const isServerless = Boolean(process.env.VERCEL);
const isProduction = process.env.NODE_ENV === 'production';

// ── Security Middleware ──
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS — allow frontend origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
].filter(Boolean).map(url => url.replace(/\/$/, ''));

// Public, token-less reads (site content) are readable from any origin. Their CORS header is
// the same for everyone ("*"), so CDN-cached responses are correct for every website. Before,
// the cached response carried the first requester's origin and browsers blocked everyone else.
// The API uses bearer tokens (not cookies), so "*" does not expose anything private.
const publicCors = cors({ origin: '*', maxAge: 86400 });

// Admin requests (with a token) and all writes are limited to the known frontends.
const strictCors = cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin) || !isProduction) return callback(null, true);
    callback(null, false); // no CORS headers → the browser blocks it; no 500 error
  },
  maxAge: 86400, // let browsers cache preflight responses for a day
});

app.use((req, res, next) => {
  const isPublicRead = (req.method === 'GET' || req.method === 'HEAD') && !req.headers.authorization;
  return isPublicRead ? publicCors(req, res, next) : strictCors(req, res, next);
});

// Request logger — in production only log slow or failed requests to keep logs useful
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!isProduction || duration > 800 || res.statusCode >= 500) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Body parsing (file uploads use multipart via multer, so JSON bodies stay small)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Mongo injection sanitization
function sanitizeMongoKeys(value) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach(sanitizeMongoKeys);
    return;
  }
  Object.keys(value).forEach((key) => {
    if (key.startsWith('$') || key.includes('.')) {
      delete value[key];
      return;
    }
    sanitizeMongoKeys(value[key]);
  });
}

app.use((req, res, next) => {
  sanitizeMongoKeys(req.body);
  sanitizeMongoKeys(req.params);
  sanitizeMongoKeys(req.query);
  next();
});

// Ensure a (reused) DB connection before any handler that touches MongoDB
async function requireDB(req, res, next) {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(503).json({ error: 'Database temporarily unavailable. Please retry.' });
  }
}

// Serve media stored in MongoDB (legacy uploads) with disk fallback
const Media = require('./models/Media');
const MEDIA_CACHE_HEADER = 'public, max-age=604800, s-maxage=31536000, stale-while-revalidate=86400';

app.get('/uploads/*splat', requireDB, async (req, res) => {
  try {
    const filePath = Array.isArray(req.params.splat)
      ? req.params.splat.join('/')
      : req.params.splat;

    const media = await Media.findOne({ filename: filePath }).select('contentType data').lean();
    if (media) {
      res.set('Content-Type', media.contentType);
      res.set('Cache-Control', MEDIA_CACHE_HEADER);
      return res.send(Buffer.from(media.data.buffer || media.data));
    }

    const localPath = path.join(__dirname, 'uploads', path.normalize(filePath).replace(/^(\.\.[/\\])+/, ''));
    if (fs.existsSync(localPath)) {
      return res.sendFile(localPath, { maxAge: '7d' });
    }

    res.status(404).send('Not Found');
  } catch (err) {
    console.error('Error serving media from DB:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Download endpoint — forces Content-Disposition: attachment so browser saves with correct filename
app.get('/api/download', requireDB, async (req, res) => {
  const { file, name } = req.query;
  if (!file) return res.status(400).json({ error: 'Missing file parameter' });

  // Security: only allow filenames, no path traversal
  const safeFile = path.basename(String(file));
  const downloadName = String(name || safeFile);

  try {
    const escapedFile = safeFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const media = await Media.findOne({ filename: { $regex: new RegExp('(^|/)' + escapedFile + '$') } })
      .select('contentType data')
      .lean();

    if (media) {
      res.set({
        'Content-Type': media.contentType,
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
        'Cache-Control': MEDIA_CACHE_HEADER,
      });
      return res.send(Buffer.from(media.data.buffer || media.data));
    }

    const filePath = path.join(__dirname, 'uploads', safeFile);
    if (fs.existsSync(filePath)) {
      return res.download(filePath, downloadName);
    }

    return res.status(404).json({ error: 'File not found' });
  } catch (err) {
    console.error('Download error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rate limiting on login attempts only (failed attempts count; successful logins don't)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 300,
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check (before DB middleware so it answers even when the DB is down)
app.get('/api/health', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    region: process.env.VERCEL_REGION || 'local',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api', apiLimiter, requireDB, invalidateOnWrite);

// ── Import Models ──
const Banner = require('./models/Banner');
const HistorySection = require('./models/HistorySection');
const AcharyaParampara = require('./models/AcharyaParampara');
const GalleryCategory = require('./models/GalleryCategory');
const GalleryItem = require('./models/GalleryItem');
const Video = require('./models/Video');
const Festival = require('./models/Festival');
const DonationItem = require('./models/DonationItem');
const PaymentInfo = require('./models/PaymentInfo');
const Activity = require('./models/Activity');
const Announcement = require('./models/Announcement');
const Seo = require('./models/Seo');
const GaushalaContent = require('./models/GaushalaContent');

// ── Import Routers ──
const createCrudRouter = require('./utils/crudRouter');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const settingsRouter = require('./routes/settings');
const uploadRouter = require('./routes/upload');
const dhajaBookingRouter = require('./routes/dhajaBooking');
const guruRouter = require('./routes/gurus');
const tithiDaysRouter = require('./routes/tithiDays');
const bootstrapRouter = require('./routes/bootstrap');

// ── Mount Routes ──
app.use('/api/auth/login', authLimiter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/dhaja-bookings', dhajaBookingRouter);

// Public read endpoints below are cached (CDN + in-memory); authenticated requests bypass the cache
app.use('/api/bootstrap', publicCache, bootstrapRouter);
app.use('/api/settings', publicCache, settingsRouter);
app.use('/api/contact', publicCache, contactRouter);
app.use('/api/gurus', publicCache, guruRouter);
app.use('/api/tithi-days', publicCache, tithiDaysRouter);

// CRUD routes — GET is public, POST/PUT/DELETE require auth
app.use('/api/banners', publicCache, createCrudRouter(Banner));
app.use('/api/history-sections', publicCache, createCrudRouter(HistorySection));
app.use('/api/acharya-parampara', publicCache, createCrudRouter(AcharyaParampara));
app.use('/api/gallery-categories', publicCache, createCrudRouter(GalleryCategory));
app.use('/api/gallery-items', publicCache, createCrudRouter(GalleryItem, { populate: 'categoryId' }));
app.use('/api/videos', publicCache, createCrudRouter(Video));
app.use('/api/festivals', publicCache, createCrudRouter(Festival));
app.use('/api/donation-items', publicCache, createCrudRouter(DonationItem));
app.use('/api/payment-info', publicCache, createCrudRouter(PaymentInfo));
app.use('/api/activities', publicCache, createCrudRouter(Activity));
app.use('/api/announcements', publicCache, createCrudRouter(Announcement));
app.use('/api/seo', publicCache, createCrudRouter(Seo));
app.use('/api/gaushala-content', publicCache, createCrudRouter(GaushalaContent));

// Root check
app.get('/', (req, res) => {
  res.send('Vadwala Dham Digital Sanctuary API is running.');
});

// Unknown API routes return JSON instead of Express's HTML page
app.use('/api', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Central error handler — always JSON with a readable message
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`[error] ${req.method} ${req.originalUrl}:`, err.message);
  if (res.headersSent) return;
  const status = err.status || err.statusCode || 500;
  const message = err.type === 'entity.too.large'
    ? 'Request is too large.'
    : (err.message || 'Internal Server Error');
  res.status(status).json({ error: message });
});

// ── Server Start (local / non-serverless only) ──
if (!isServerless) {
  const PORT = process.env.PORT || 5000;

  connectDB()
    .then(async () => {
      console.log('MongoDB connected successfully');
      try {
        // Seed default admin if none exists
        const Admin = require('./models/Admin');
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
          const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@vadwala.com';
          const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'VadwalaDham2024!';
          await Admin.create({
            name: 'Admin',
            email: defaultEmail,
            password: defaultPassword,
            role: 'superadmin',
            status: 'active',
          });
          console.log(`Default admin created: ${defaultEmail}`);
        }

        // Content seeding overwrites guru records, so it only runs when explicitly requested
        if (process.env.SEED_ON_START === 'true') {
          const { seedPublicContent } = require('./utils/publicContentSeeder');
          await seedPublicContent({ log: console.log });
          console.log('Public content seed complete');
        }
      } catch (seedErr) {
        console.error('Seed error (non-fatal):', seedErr.message);
      }
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
    });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
