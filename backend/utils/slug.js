const crypto = require('crypto');
const slugify = require('slugify');

/**
 * Slugs are generated on the server so admins never have to type technical identifiers.
 * Gujarati titles don't transliterate, so those fall back to "<prefix>-<random>".
 */
function toSlug(text) {
  return slugify(String(text || ''), { lower: true, strict: true, trim: true }).slice(0, 60);
}

async function uniqueSlug(Model, text, prefix, excludeId) {
  const base = toSlug(text) || `${prefix}-${crypto.randomBytes(3).toString('hex')}`;
  let candidate = base;
  let n = 2;
  const exclude = excludeId ? { _id: { $ne: excludeId } } : {};
  while (await Model.exists({ slug: candidate, ...exclude })) {
    candidate = `${base}-${n}`;
    n += 1;
  }
  return candidate;
}

/** Fill in `data.slug` when the model has a slug and none was provided. */
async function ensureSlug(Model, data) {
  if (!Model.schema.path('slug')) return data;
  if (data.slug && String(data.slug).trim()) return data;
  const prefix = Model.modelName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  data.slug = await uniqueSlug(Model, data.title || data.name || data.short_title || data.full_name, prefix);
  return data;
}

module.exports = { toSlug, uniqueSlug, ensureSlug };
