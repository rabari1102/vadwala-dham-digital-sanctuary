const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', async (_, res) => {
  try {
    const doc = await Contact.findOne();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const doc = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
