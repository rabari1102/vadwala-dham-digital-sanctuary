const mongoose = require('mongoose');

const gaushalaContentSchema = new mongoose.Schema({
  /* ── Hero Banner ── */
  heroEyebrow: { type: String, default: 'GAU SEVA' },
  heroTitle: { type: String, default: '' },
  heroSubtitle: { type: String, default: '' },

  /* ── Intro ── */
  introTexts: [{ type: String }],

  /* ── Vision & Inspiration ── */
  visionEyebrow: { type: String, default: '' },
  visionHeading: { type: String, default: '' },
  visionTexts: [{ type: String }],
  quote: { type: String, default: '' },
  quoteCite: { type: String, default: '' },
  values: [{
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
  }],

  /* ── Facilities & Gau Sewa ── */
  facilitiesEyebrow: { type: String, default: '' },
  facilitiesHeading: { type: String, default: '' },
  facilityTexts: [{ type: String }],
  sevaItems: [{
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
  }],

  /* ── Festivals / Events ── */
  eventsEyebrow: { type: String, default: '' },
  eventsHeading: { type: String, default: '' },
  eventTexts: [{ type: String }],
  eventHighlight: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  eventFooterText: { type: String, default: '' },

  /* ── Support / Donation ── */
  supportEyebrow: { type: String, default: '' },
  supportHeading: { type: String, default: '' },
  supportTexts: [{ type: String }],
  supportActions: [{
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
  }],
  ctaTitle: { type: String, default: '' },
  ctaText: { type: String, default: '' },

  /* ── Location ── */
  locationEyebrow: { type: String, default: '' },
  locationHeading: { type: String, default: '' },
  locationTexts: [{ type: String }],
  locationNote: { type: String, default: '' },

  /* ── Gallery ── */
  galleryEyebrow: { type: String, default: '' },
  galleryHeading: { type: String, default: '' },
  gallerySub: { type: String, default: '' },
  photos: [{
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    caption: { type: String, default: '' },
  }],
  videos: [{
    title: { type: String, default: '' },
    embedId: { type: String, default: '' },
  }],

  status: { type: String, enum: ['published', 'draft'], default: 'published' },
}, { timestamps: true });

module.exports = mongoose.model('GaushalaContent', gaushalaContentSchema);
