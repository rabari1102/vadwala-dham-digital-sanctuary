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

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
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
app.use('/api/events', require('./routes/festivals')); // alias
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/dhaja-chadava', require('./routes/dhajaChadava'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/donation', require('./routes/donation'));
app.use('/api/donations', require('./routes/donation')); // alias
app.use('/api/content', require('./routes/content'));

// Admin routes (login is public; CRUD routes are protected inside)
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

// MongoDB connection
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
