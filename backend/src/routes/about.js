const express = require('express');
const router = express.Router();
const About = require('../models/About');

router.get('/', async (_, res) => {
  try {
    const doc = await About.findOne();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const doc = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
