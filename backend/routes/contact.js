const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const ContactMessage = require('../models/ContactMessage');
const { requireAuth } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    var contact = await Contact.findOne().select('-__v').lean();
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

router.put('/', requireAuth, async (req, res) => {
  try {
    var contact = await Contact.findOne();
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

router.post('/form', async (req, res) => {
  try {
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var message = req.body.message;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    var msg = new ContactMessage({ name: name, phone: phone, email: email, message: message });
    await msg.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/messages', requireAuth, async (req, res) => {
  try {
    var filter = {};
    if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';
    var messages = await ContactMessage.find(filter).sort('-createdAt').lean();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/messages/unread-count', requireAuth, async (req, res) => {
  try {
    var count = await ContactMessage.countDocuments({ isRead: false });
    res.json({ count: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/messages/:id/read', requireAuth, async (req, res) => {
  try {
    var msg = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/messages/:id', requireAuth, async (req, res) => {
  try {
    var msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
