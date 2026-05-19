const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  type: { type: String, enum: ['info', 'warning', 'festival', 'general'], default: 'general' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

announcementSchema.index({ isActive: 1, status: 1 });

module.exports = mongoose.model('Announcement', announcementSchema);
