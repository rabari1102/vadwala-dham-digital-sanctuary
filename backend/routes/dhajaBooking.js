const express = require('express');
const router = express.Router();
const DhajaBooking = require('../models/DhajaBooking');
const { requireAuth } = require('../middleware/auth');

// Public — Submit a dhaja booking request
router.post('/', async (req, res) => {
  try {
    var { fullName, phone } = req.body;
    if (!fullName || !phone) {
      return res.status(400).json({ error: 'Full name and phone number are required' });
    }
    var booking = new DhajaBooking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Dhaja booking request submitted successfully', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin — Get all bookings
router.get('/', requireAuth, async (req, res) => {
  try {
    var filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';
    var bookings = await DhajaBooking.find(filter).sort('-createdAt');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin — Get unread count
router.get('/unread-count', requireAuth, async (req, res) => {
  try {
    var count = await DhajaBooking.countDocuments({ isRead: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin — Get single booking
router.get('/:id', requireAuth, async (req, res) => {
  try {
    var booking = await DhajaBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin — Update status / mark as read
router.put('/:id', requireAuth, async (req, res) => {
  try {
    var booking = await DhajaBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin — Delete booking
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    var booking = await DhajaBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
