const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  shortDescription: { type: String, default: '' },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  icon: { type: String, default: '' },
  category: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
