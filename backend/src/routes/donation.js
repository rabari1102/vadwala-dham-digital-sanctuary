const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

router.get('/', async (_, res) => {
  try {
    const doc = await Donation.findOne();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const doc = await Donation.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
