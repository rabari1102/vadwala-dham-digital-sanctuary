const mongoose = require('mongoose');

const galleryCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

galleryCategorySchema.index({ status: 1, order: 1 });

module.exports = mongoose.model('GalleryCategory', galleryCategorySchema);
