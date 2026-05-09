const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const ContactMessage = require('../models/ContactMessage');

// GET /api/contact — get contact info
router.get('/', async (_, res) => {
  try {
    const doc = await Contact.findOne();
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/contact — submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }
    const msg = new ContactMessage({ name, email, phone, message });
    await msg.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/contact — update contact info (admin)
router.put('/', async (req, res) => {
  try {
    const doc = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
