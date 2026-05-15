const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  ogImage: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Seo', seoSchema);
