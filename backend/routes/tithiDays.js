const express = require('express');
const mongoose = require('mongoose');
const TithiDay = require('../models/TithiDay');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// ── GET /api/tithi-days/upcoming — Fetch future tithis ──
router.get('/upcoming', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today
    
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100);
    const filter = { dateGregorian: { $gte: today } };

    if (req.query.tithiName) {
      filter.tithiName = String(req.query.tithiName);
    }

    const tithis = await TithiDay.find(filter)
      .sort({ dateGregorian: 1 })
      .limit(limit)
      .select('-__v')
      .lean();
      
    res.json(tithis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/tithi-days — List all entries (for admin table) ──
router.get('/', async (req, res) => {
  try {
    const tithis = await TithiDay.find().sort({ dateGregorian: 1 }).select('-__v').lean();
    res.json(tithis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/tithi-days/:id — Get details ──
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ error: 'Not found' });
    const item = await TithiDay.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/tithi-days — Create (auth required) ──
router.post('/', requireAuth, async (req, res) => {
  try {
    const item = new TithiDay(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /api/tithi-days/:id — Update (auth required) ──
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const item = await TithiDay.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /api/tithi-days/:id — Delete (auth required) ──
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const item = await TithiDay.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
