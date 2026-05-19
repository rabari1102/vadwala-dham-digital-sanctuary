const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'GalleryCategory', required: true },
  title: { type: String, default: '' },
  image: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

galleryItemSchema.index({ status: 1, order: 1 });
galleryItemSchema.index({ categoryId: 1, status: 1 });

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
