const mongoose = require('mongoose');

const guruEventSchema = new mongoose.Schema({
  year_or_date: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  sort_order: { type: Number, default: 0 },
}, { _id: true });

const guruImageSchema = new mongoose.Schema({
  image_url: { type: String, default: '' },
  storage_key: { type: String, default: '' },
  alt_text: { type: String, default: '' },
  caption: { type: String, default: '' },
  is_primary: { type: Boolean, default: false },
  sort_order: { type: Number, default: 0 },
}, { _id: true });

const guruSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  full_name: { type: String, required: true },
  role_title: { type: String, default: '' },
  short_title: { type: String, default: '' },
  community_role: { type: String, default: '' },
  key_associated_temple: { type: String, default: 'Shree Vadvala Mandir, Dudhrej Dham' },
  birth_date: { type: String, default: null },
  birthplace: { type: String, default: null },
  biography_short: { type: String, default: '' },
  biography_full: { type: String, default: '' },
  teachings_themes: [{ type: String }],
  notable_quotes: [{ type: String }],
  seo_keywords: [{ type: String }],
  events: [guruEventSchema],
  images: [guruImageSchema],
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

guruSchema.index({ status: 1, order: 1 });

module.exports = mongoose.model('Guru', guruSchema);
