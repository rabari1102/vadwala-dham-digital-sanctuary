const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'શ્રી વડવાળા મંદિર દુધરેજધામ' },
  siteNameEn: { type: String, default: 'Shree Vadwala Mandir Dudhrejdham' },
  logo: { type: String, default: '' },
  tagline: { type: String, default: 'ભગવાન ના દર્શન' },
  introTitle: { type: String, default: '' },
  introContent: { type: String, default: '' },
  introImage: { type: String, default: '' },
  donateCtaTitle: { type: String, default: '' },
  donateCtaText: { type: String, default: '' },
  trustNote: { type: String, default: '' },
  verificationContact: { type: String, default: '' },
  liveDarshanUrl: { type: String, default: '' },
  navLinks: [{
    label: String,
    url: String,
    order: Number,
    isActive: { type: Boolean, default: true }
  }],
  footerLinks: [{
    label: String,
    url: String,
    order: Number,
    isActive: { type: Boolean, default: true }
  }],
  socialLinks: [{
    platform: String,
    url: String,
    icon: String,
    isActive: { type: Boolean, default: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
