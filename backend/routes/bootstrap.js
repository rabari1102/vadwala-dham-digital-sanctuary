const express = require('express');
const Settings = require('../models/Settings');
const Contact = require('../models/Contact');
const Announcement = require('../models/Announcement');
const Banner = require('../models/Banner');
const Festival = require('../models/Festival');
const { findGuruSummaries } = require('../utils/guruSummary');

const router = express.Router();

// Aggregated endpoints: one round trip instead of 3–4 separate API calls per page load.

// ── GET /api/bootstrap/site — data every public page needs (header, footer, announcement bar) ──
router.get('/site', async (req, res) => {
  try {
    const [settings, contact, announcements] = await Promise.all([
      Settings.findOne().select('-__v').lean(),
      Contact.findOne().select('-__v').lean(),
      Announcement.find({ isActive: true, status: 'published' }).sort('order').select('-__v').lean(),
    ]);
    res.json({ settings: settings || {}, contact: contact || {}, announcements });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/bootstrap/home — everything the home page renders ──
router.get('/home', async (req, res) => {
  try {
    const [banners, festivals, gurus] = await Promise.all([
      Banner.find({ status: 'published' }).sort('order').select('-__v').lean(),
      Festival.find({ status: 'published' }).sort('order').select('-__v').lean(),
      findGuruSummaries({ status: 'published' }),
    ]);
    res.json({ banners, festivals, gurus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
