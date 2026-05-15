const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Admin = require('../models/Admin');

// Simple JWT-like token (use jsonwebtoken in production)
function generateToken(admin) {
  const payload = JSON.stringify({ id: admin._id, role: admin.role, ts: Date.now() });
  return Buffer.from(payload).toString('base64');
}

function verifyToken(token) {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString());
  } catch { return null; }
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    if (!admin.comparePassword(password)) return res.status(401).json({ error: 'Invalid credentials' });
    if (admin.status !== 'active') return res.status(403).json({ error: 'Account inactive' });
    admin.lastLogin = new Date();
    await admin.save();
    const token = generateToken(admin);
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, avatar: admin.avatar } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already exists' });
    const admin = new Admin({ name, email, password });
    await admin.save();
    const token = generateToken(admin);
    res.status(201).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const payload = verifyToken(authHeader.replace('Bearer ', ''));
    if (!payload) return res.status(401).json({ error: 'Invalid token' });
    const admin = await Admin.findById(payload.id).select('-password');
    if (!admin) return res.status(404).json({ error: 'Not found' });
    res.json(admin);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/auth/profile
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token' });
    const payload = verifyToken(authHeader.replace('Bearer ', ''));
    if (!payload) return res.status(401).json({ error: 'Invalid token' });
    const { name, phone, avatar } = req.body;
    const admin = await Admin.findByIdAndUpdate(payload.id, { name, phone, avatar }, { new: true }).select('-password');
    res.json(admin);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// GET /api/auth/users — list all admins
router.get('/users', async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort('-createdAt');
    res.json(admins);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
