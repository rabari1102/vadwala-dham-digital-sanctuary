const express = require('express');
const mongoose = require('mongoose');
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
    const admins = await Admin.find().select('-password -__v').sort('-createdAt').lean();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── User management (used by the admin "Users" page) ──
const ROLES = ['superadmin', 'admin', 'editor'];
const STATUSES = ['active', 'inactive'];

function toSafeAdmin(admin) {
  const data = admin.toObject ? admin.toObject() : { ...admin };
  delete data.password;
  delete data.__v;
  return data;
}

router.get('/users/:id', requireAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ error: 'User not found' });
    const admin = await Admin.findById(req.params.id).select('-password -__v').lean();
    if (!admin) return res.status(404).json({ error: 'User not found' });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role = 'admin', status = 'active' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    if (String(password).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    if (!ROLES.includes(role) || !STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid role or status' });
    if (await Admin.exists({ email })) return res.status(400).json({ error: 'Email already exists' });
    const admin = await Admin.create({ name, email, password, role, status });
    res.status(201).json(toSafeAdmin(admin));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/users/:id', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ error: 'User not found' });
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'User not found' });

    const { name, email, password, role, status } = req.body;
    const isSelf = String(admin._id) === String(req.admin.id);
    if (role && !ROLES.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    if (status && !STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    if (isSelf && ((role && role !== 'superadmin') || status === 'inactive')) {
      return res.status(400).json({ error: 'You cannot remove your own superadmin access or deactivate yourself' });
    }
    if (email && email !== admin.email && await Admin.exists({ email, _id: { $ne: admin._id } })) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (password && String(password).length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (role) admin.role = role;
    if (status) admin.status = status;
    if (password) admin.password = password; // hashed by the pre-save hook
    await admin.save();
    res.json(toSafeAdmin(admin));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/users/:id', requireAuth, requireSuperAdmin, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({ error: 'User not found' });
    if (String(req.params.id) === String(req.admin.id)) {
      return res.status(400).json({ error: 'You cannot delete your own account' });
    }
    const admin = await Admin.findById(req.params.id).select('role');
    if (!admin) return res.status(404).json({ error: 'User not found' });
    if (admin.role === 'superadmin' && (await Admin.countDocuments({ role: 'superadmin' })) <= 1) {
      return res.status(400).json({ error: 'Cannot delete the last superadmin' });
    }
    await Admin.deleteOne({ _id: admin._id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
