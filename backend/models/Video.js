const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  embedUrl: { type: String, required: true },
  type: { type: String, enum: ['video', 'reel'], default: 'video' },
  category: { type: String, default: '' },
  publishDate: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
