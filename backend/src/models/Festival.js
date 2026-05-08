const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  nameGuj: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  dateEn: { type: String },
  isUpcoming: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Festival', festivalSchema);
