const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { generateToken, requireAuth, requireSuperAdmin } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    if (admin.status !== 'active') {
      return res.status(403).json({ error: 'Account inactive' });
    }
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin);
    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, avatar: admin.avatar }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/register', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already exists' });
    const admin = new Admin({ name, email, password, role: role || 'admin' });
    await admin.save();
    res.status(201).json({
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    if (!admin) return res.status(404).json({ error: 'Not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id, { name, phone, avatar }, { new: true }
    ).select('-password');
    res.json(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    const admin = await Admin.findById(req.admin.id);
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) return res.status(401).json({ error: 'Current password incorrect' });
    admin.password = newPassword;
    await admin.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', requireAuth, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort('-createdAt');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
