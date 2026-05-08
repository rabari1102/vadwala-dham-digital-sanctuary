const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  qrImageUrl: { type: String },
  purposes: [{ label: String, icon: String }],
  note: { type: String },
  fcraEligible: { type: Boolean, default: true },
  phones: [String],
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
