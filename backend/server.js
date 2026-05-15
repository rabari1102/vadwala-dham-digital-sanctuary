const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/settings', require('./routes/settings'));
app.use('/api/banners', require('./routes/banners'));
app.use('/api/history-sections', require('./routes/historySections'));
app.use('/api/acharya-parampara', require('./routes/acharyaParampara'));
app.use('/api/gallery-categories', require('./routes/galleryCategories'));
app.use('/api/gallery-items', require('./routes/galleryItems'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/festivals', require('./routes/festivals'));
app.use('/api/donation-items', require('./routes/donationItems'));
app.use('/api/payment-info', require('./routes/paymentInfo'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/seo', require('./routes/seo'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Create default admin if none exists
const Admin = require('./models/Admin');
mongoose.connection.once('open', async () => {
  const count = await Admin.countDocuments();
  if (count === 0) {
    await Admin.create({ name: 'Admin', email: 'admin@vadwala.com', password: 'admin123', role: 'superadmin' });
    console.log('👤 Default admin created: admin@vadwala.com / admin123');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
