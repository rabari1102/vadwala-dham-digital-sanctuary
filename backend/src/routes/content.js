const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const SiteContent = require('../models/SiteContent');

const contentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// GET /api/content — return all content as a key:value map
router.get('/', contentLimiter, async (_, res) => {
  try {
    const items = await SiteContent.find();
    const map = {};
    items.forEach((item) => { map[item.key] = item.value; });
    res.json(map);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/content/:key — return a single content item
router.get('/:key', contentLimiter, async (req, res) => {
  try {
    const item = await SiteContent.findOne({ key: req.params.key });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
