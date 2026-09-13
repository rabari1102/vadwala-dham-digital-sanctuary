const Guru = require('../models/Guru');

const SUMMARY_FIELDS = 'slug full_name short_title role_title community_role key_associated_temple biography_short images order status';

function toGuruSummary(doc) {
  const primary = doc.images?.find((img) => img.is_primary) || doc.images?.[0] || null;
  return {
    _id: doc._id,
    slug: doc.slug,
    full_name: doc.full_name,
    short_title: doc.short_title,
    role_title: doc.role_title,
    community_role: doc.community_role,
    key_associated_temple: doc.key_associated_temple,
    biography_short: doc.biography_short,
    primary_image: primary,
    order: doc.order,
    status: doc.status,
  };
}

async function findGuruSummaries(filter = {}) {
  const gurus = await Guru.find(filter).sort('order').select(SUMMARY_FIELDS).lean();
  return gurus.map(toGuruSummary);
}

module.exports = { toGuruSummary, findGuruSummaries };
