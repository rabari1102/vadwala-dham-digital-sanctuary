require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/hero', require('./routes/hero'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/about', require('./routes/about'));
app.use('/api/acharyas', require('./routes/acharyas'));
app.use('/api/services', require('./routes/services'));
app.use('/api/festivals', require('./routes/festivals'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/dhaja-chadava', require('./routes/dhajaChadava'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/donation', require('./routes/donation'));

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
