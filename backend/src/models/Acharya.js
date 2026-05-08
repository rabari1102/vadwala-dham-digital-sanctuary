const mongoose = require('mongoose');

const acharyaSchema = new mongoose.Schema({
  nameGuj: { type: String, required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
  current: { type: Boolean, default: false },
  since: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Acharya', acharyaSchema);
