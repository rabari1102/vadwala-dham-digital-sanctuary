const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  address: { type: String, default: '' },
  phones: [{ type: String }],
  emails: [{ type: String }],
  website: { type: String, default: '' },
  mapEmbedUrl: { type: String, default: '' },
  socialLinks: [{
    platform: String,
    url: String,
    icon: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
