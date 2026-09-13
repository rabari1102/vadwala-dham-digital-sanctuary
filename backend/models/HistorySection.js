const mongoose = require('mongoose');

const historySectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  year: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

historySectionSchema.index({ status: 1, order: 1 });

module.exports = mongoose.model('HistorySection', historySectionSchema);
