const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  date: { type: Date },
  isUpcoming: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

festivalSchema.index({ status: 1, order: 1 });
festivalSchema.index({ date: -1 });

module.exports = mongoose.model('Festival', festivalSchema);
