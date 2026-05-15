const mongoose = require('mongoose');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['superadmin', 'admin', 'editor'], default: 'admin' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastLogin: { type: Date }
}, { timestamps: true });

// Simple hash (use bcrypt in production)
adminSchema.pre('save', function() {
  if (!this.isModified('password')) return;
  this.password = crypto.createHash('sha256').update(this.password).digest('hex');
});

adminSchema.methods.comparePassword = function(pwd) {
  return crypto.createHash('sha256').update(pwd).digest('hex') === this.password;
};

module.exports = mongoose.model('Admin', adminSchema);
