const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();
const { seedPublicContent } = require('./utils/publicContentSeeder');

const app = express();
app.set('trust proxy', 1);

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

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, '');
    if (allowedOrigins.includes(normalizedOrigin)) return callback(null, true);
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded/local images dynamically from MongoDB with disk fallback

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

// Serve media dynamically from MongoDB
const Media = require('./models/Media');
const fs = require('fs');
app.get('/uploads/*splat', async (req, res) => {
  try {
    const filePath = Array.isArray(req.params.splat) 
      ? req.params.splat.join('/') 
      : req.params.splat;
      
    const media = await Media.findOne({ filename: filePath });
    if (media) {
      res.set('Content-Type', media.contentType);
      return res.send(media.data);
    }

    // Fallback: check local disk
    const localPath = path.join(__dirname, 'uploads', filePath);
    if (fs.existsSync(localPath)) {
      return res.sendFile(localPath);
    }

    res.status(404).send('Not Found');
  } catch (err) {
    console.error('Error serving media from DB:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Download endpoint — forces Content-Disposition: attachment so browser saves with correct filename
app.get('/api/download', async (req, res) => {
  const { file, name } = req.query;
  if (!file) return res.status(400).json({ error: 'Missing file parameter' });

  // Security: only allow filenames, no path traversal
  const safeFile = path.basename(file);
  const downloadName = name || safeFile;

  try {
    // 1. Try to find in database (handles flat files and subfolders like gurus/)
    const escapedFile = safeFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const media = await Media.findOne({ filename: { $regex: new RegExp('(^|/)' + escapedFile + '$') } });
    
    if (media) {
      res.set({
        'Content-Type': media.contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(downloadName)}"`
      });
      return res.send(media.data);
    }

    // 2. Fallback to local disk (useful for local dev)
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

// Rate limiting on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

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
const DhajaBooking = require('./models/DhajaBooking');
const GaushalaContent = require('./models/GaushalaContent');
const Guru = require('./models/Guru');
const TithiDay = require('./models/TithiDay');

// ── Import Routers ──
const createCrudRouter = require('./utils/crudRouter');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const settingsRouter = require('./routes/settings');
const uploadRouter = require('./routes/upload');
const dhajaBookingRouter = require('./routes/dhajaBooking');
const guruRouter = require('./routes/gurus');
const tithiDaysRouter = require('./routes/tithiDays');

// ── Mount Routes ──
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/dhaja-bookings', dhajaBookingRouter);
app.use('/api/gurus', guruRouter);
app.use('/api/tithi-days', tithiDaysRouter);

// CRUD routes — GET is public, POST/PUT/DELETE require auth
app.use('/api/banners', createCrudRouter(Banner));
app.use('/api/history-sections', createCrudRouter(HistorySection));
app.use('/api/acharya-parampara', createCrudRouter(AcharyaParampara));
app.use('/api/gallery-categories', createCrudRouter(GalleryCategory));
app.use('/api/gallery-items', createCrudRouter(GalleryItem, { populate: 'categoryId' }));
app.use('/api/videos', createCrudRouter(Video));
app.use('/api/festivals', createCrudRouter(Festival));
app.use('/api/donation-items', createCrudRouter(DonationItem));
app.use('/api/payment-info', createCrudRouter(PaymentInfo));
app.use('/api/activities', createCrudRouter(Activity));
app.use('/api/announcements', createCrudRouter(Announcement));
app.use('/api/seo', createCrudRouter(Seo));
app.use('/api/gaushala-content', createCrudRouter(GaushalaContent));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Root check
app.get('/', (req, res) => {
  res.send('Vadwala Dham Digital Sanctuary API is running.');
});

// ── Database Connection & Server Start ──
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('WARNING: MONGODB_URI is not defined. Database features will not work.');
} else {
  // Connect to MongoDB asynchronously
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      // In serverless, do not call process.exit(1) on connection failure
      // because it will crash the serverless container boot.
      if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
        process.exit(1);
      }
    });
}

// Start listener and seeding ONLY when not running on Vercel / Serverless
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  // Run seeding only once the connection is open
  mongoose.connection.once('open', async () => {
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

      // Seed public content (skip existing)
      await seedPublicContent({ log: console.log });
      console.log('Public content seed complete');
    } catch (seedErr) {
      console.error('Seed error (non-fatal):', seedErr.message);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
