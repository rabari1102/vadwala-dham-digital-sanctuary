const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['superadmin', 'admin', 'editor'], default: 'admin' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastLogin: { type: Date }
}, { timestamps: true });

// Hash password with bcrypt before save
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password using bcrypt
adminSchema.methods.comparePassword = async function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
