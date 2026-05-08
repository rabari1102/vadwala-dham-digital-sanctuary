const express = require('express');
const router = express.Router();
const DhajaChadava = require('../models/DhajaChadava');

// GET — list entries; ?date=today or ?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.date) {
      const dateStr = req.query.date === 'today'
        ? new Date().toISOString().slice(0, 10)
        : req.query.date;
      filter.date = { $regex: `^${dateStr}` };
    }
    const items = await DhajaChadava.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST — add new dhaja entry
router.post('/', async (req, res) => {
  try {
    const entry = new DhajaChadava({
      ...req.body,
      date: req.body.date || new Date().toISOString().slice(0, 10),
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT — update entry
router.put('/:id', async (req, res) => {
  try {
    const entry = await DhajaChadava.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(entry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE — soft delete
router.delete('/:id', async (req, res) => {
  try {
    await DhajaChadava.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
