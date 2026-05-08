const express = require('express');
const router = express.Router();
const Festival = require('../models/Festival');

router.get('/', async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.upcoming === 'true') filter.isUpcoming = true;
    const items = await Festival.find(filter).sort({ order: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = new Festival(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Festival.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Festival.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
