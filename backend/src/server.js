require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow all origins in production (Vercel serverless)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    // In production allow any vercel.app subdomain + custom domain
    const allowList = [
      process.env.FRONTEND_URL,
      'https://dudhrejvadwala.com',
      'https://www.dudhrejvadwala.com',
    ].filter(Boolean);
    const isVercelPreview = origin.includes('.vercel.app');
    const isAllowed = allowList.includes(origin) || isVercelPreview || process.env.NODE_ENV !== 'production';
    if (isAllowed) return callback(null, true);
    return callback(null, true); // Open CORS for temple public API
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Public routes
app.use('/api/hero', require('./routes/hero'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/about', require('./routes/about'));
app.use('/api/acharyas', require('./routes/acharyas'));
app.use('/api/services', require('./routes/services'));
app.use('/api/festivals', require('./routes/festivals'));
app.use('/api/events', require('./routes/festivals'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/dhaja-chadava', require('./routes/dhajaChadava'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/donation', require('./routes/donation'));
app.use('/api/donations', require('./routes/donation'));
app.use('/api/content', require('./routes/content'));

// Admin routes
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vadwala_dham';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
