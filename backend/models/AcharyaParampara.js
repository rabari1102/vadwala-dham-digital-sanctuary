const mongoose = require('mongoose');

const acharyaParamparaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  periodStart: { type: String, default: '' },
  periodEnd: { type: String, default: '' },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('AcharyaParampara', acharyaParamparaSchema);
