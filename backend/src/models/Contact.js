const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  addressGuj: { type: String, required: true },
  addressEn: { type: String },
  phones: [String],
  email: { type: String },
  website: { type: String },
  darshanjMorning: { type: String },
  darshanEvening: { type: String },
  mapEmbedUrl: { type: String },
  socialLinks: [{
    icon: String,
    label: String,
    url: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
