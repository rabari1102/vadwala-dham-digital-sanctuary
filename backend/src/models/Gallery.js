const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  cat: { type: String, required: true },
  catEn: { type: String },
  tag: { type: String, required: true, enum: ['janmashtami', 'diwali', 'gurupurnima', 'gaushala', 'education', 'temple', 'other'] },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
