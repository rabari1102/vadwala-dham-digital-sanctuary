const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET contact info (singleton)
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({
        address: 'શ્રી વડવાળા મંદિર દુધરેજધામ, દુધરેજ, સુરેન્દ્રનગર (ગુજરાત) - 363040',
        phones: ['96879 21008', '98255 68108'],
        emails: ['dudhrejvadwala@gmail.com'],
        website: 'https://dudhrejvadwala.com'
      });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update contact
router.put('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact(req.body);
    } else {
      Object.assign(contact, req.body);
    }
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST contact form submission
router.post('/form', async (req, res) => {
  try {
    // In production, store or email the submission
    const { name, phone, email, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    res.json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
