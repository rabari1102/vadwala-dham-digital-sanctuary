const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Types } = require('mongoose');
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const Festival = require('../models/Festival');
const Gallery = require('../models/Gallery');
const Donation = require('../models/Donation');
const ContactMessage = require('../models/ContactMessage');
const SiteContent = require('../models/SiteContent');
const HeroSlide = require('../models/Hero');
const Announcement = require('../models/Announcement');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}
const SECRET = JWT_SECRET || 'vadwala_dham_dev_secret_key';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD && process.env.NODE_ENV === 'production') {
  throw new Error('ADMIN_PASSWORD environment variable is required in production');
}
const DEFAULT_ADMIN_PASSWORD = ADMIN_PASSWORD || 'admin123';

// Rate limiter for login endpoint — 10 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// General rate limiter for admin API reads — 100 requests per minute
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper: validate MongoDB ObjectId
function isValidObjectId(id) {
  return Types.ObjectId.isValid(id);
}

// POST /api/admin/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // First try to find admin in DB
    let admin = await Admin.findOne({ username });
    if (admin) {
      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    } else {
      // Fallback: allow default admin from env
      if (username !== 'admin' || password !== DEFAULT_ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    const token = jwt.sign({ username }, SECRET, { expiresIn: '8h' });
    res.json({ token, username });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Events ──────────────────────────────────────────────────────────────────
// POST /api/admin/events
router.post('/events', adminLimiter, auth, async (req, res) => {
  try {
    const item = new Festival(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/admin/events/:id
router.put('/events/:id', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const item = await Festival.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/admin/events/:id
router.delete('/events/:id', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    await Festival.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── Gallery ──────────────────────────────────────────────────────────────────
// POST /api/admin/gallery
router.post('/gallery', adminLimiter, auth, async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/admin/gallery/:id
router.delete('/gallery/:id', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── Donations ────────────────────────────────────────────────────────────────
// PUT /api/admin/donations
router.put('/donations', adminLimiter, auth, async (req, res) => {
  try {
    const doc = await Donation.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── Contact Messages ─────────────────────────────────────────────────────────
// GET /api/admin/contact-messages
router.get('/contact-messages', adminLimiter, auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PATCH /api/admin/contact-messages/:id/read
router.patch('/contact-messages/:id/read', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(msg);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── Site Content ─────────────────────────────────────────────────────────────
// PUT /api/admin/content/:key
router.put('/content/:key', adminLimiter, auth, async (req, res) => {
  try {
    const { value, type, label } = req.body;
    const doc = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { value, type: type || 'text', label },
      { new: true, upsert: true }
    );
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── Hero Slides ───────────────────────────────────────────────────────────────
// POST /api/admin/hero
router.post('/hero', adminLimiter, auth, async (req, res) => {
  try {
    const item = new HeroSlide(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/admin/hero/:id
router.put('/hero/:id', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const item = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/admin/hero/:id
router.delete('/hero/:id', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// ── Announcements ─────────────────────────────────────────────────────────────
// POST /api/admin/announcements
router.post('/announcements', adminLimiter, auth, async (req, res) => {
  try {
    const item = new Announcement(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE /api/admin/announcements/:id
router.delete('/announcements/:id', adminLimiter, auth, async (req, res) => {
  if (!isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
