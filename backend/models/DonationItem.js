const mongoose = require('mongoose');

const donationItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

donationItemSchema.index({ status: 1, order: 1 });

module.exports = mongoose.model('DonationItem', donationItemSchema);
