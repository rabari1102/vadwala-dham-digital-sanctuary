const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

// Index for filtering unread messages
contactMessageSchema.index({ isRead: 1, createdAt: -1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
