const mongoose = require('mongoose');

const dhajaChadavaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameGuj: { type: String },
  village: { type: String, required: true },
  date: { type: String, required: true },
  samvat: { type: String },
  dedication: { type: String },
  contact: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

dhajaChadavaSchema.index({ date: 1 });

module.exports = mongoose.model('DhajaChadava', dhajaChadavaSchema);
