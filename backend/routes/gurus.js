const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');
const Guru = require('../models/Guru');

const router = express.Router();

// Helper to query by slug OR ObjectId for Admin compat
function getGuruQuery(param) {
  if (mongoose.Types.ObjectId.isValid(param)) {
    return { $or: [{ _id: param }, { slug: param }] };
  }
  return { slug: param };
}

// ── GET /api/gurus — List all published gurus (summary view) ──
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const gurus = await Guru.find(filter)
      .sort('order')
      .select('slug full_name short_title role_title community_role key_associated_temple biography_short images order status');

    // Attach primary image to each guru
    const result = gurus.map((g) => {
      const doc = g.toObject();
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
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/gurus/:slug — Full guru detail by slug or ID ──
router.get('/:slug', async (req, res) => {
  try {
    const guru = await Guru.findOne(getGuruQuery(req.params.slug));
    if (!guru) return res.status(404).json({ error: 'Guru not found' });

    // Sort events and images by sort_order
    const doc = guru.toObject();
    if (doc.events) doc.events.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    if (doc.images) doc.images.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

    // Expose primary_image and gallery_images flat fields for the admin panel
    const primary = doc.images?.find((img) => img.is_primary) || doc.images?.[0] || null;
    doc.primary_image = primary ? (primary.storage_key || primary.image_url) : '';

    const gallery = doc.images?.filter((img) => !img.is_primary) || [];
    doc.gallery_images = gallery.map(img => img.storage_key || img.image_url).join('\n');

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── GET /api/gurus/:slug/images — Images only (for lazy-loading gallery) ──
router.get('/:slug/images', async (req, res) => {
  try {
    const guru = await Guru.findOne(getGuruQuery(req.params.slug)).select('images');
    if (!guru) return res.status(404).json({ error: 'Guru not found' });

    const images = (guru.images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/gurus — Create (auth required) ──
router.post('/', requireAuth, async (req, res) => {
  try {
    const { primary_image, gallery_images, ...rest } = req.body;
    const guru = new Guru(rest);
    
    const newImages = [];
    if (primary_image) {
      newImages.push({
        storage_key: primary_image,
        is_primary: true,
        alt_text: guru.full_name
      });
    }
    if (gallery_images) {
      const urls = gallery_images.split('\n').map(u => u.trim()).filter(Boolean);
      urls.forEach((url, i) => {
        newImages.push({
          storage_key: url,
          is_primary: false,
          alt_text: `${guru.full_name} Gallery ${i + 1}`,
          sort_order: i + 1
        });
      });
    }
    guru.images = newImages;

    await guru.save();
    res.status(201).json(guru);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /api/gurus/:slug — Update by slug or ID (auth required) ──
router.put('/:slug', requireAuth, async (req, res) => {
  try {
    const { primary_image, gallery_images, ...rest } = req.body;
    const guru = await Guru.findOne(getGuruQuery(req.params.slug));
    if (!guru) return res.status(404).json({ error: 'Guru not found' });

    // Update base fields
    Object.assign(guru, rest);

    // 1. Process primary_image
    if (primary_image !== undefined) {
      if (!guru.images) guru.images = [];
      const primaryIdx = guru.images.findIndex(img => img.is_primary);
      if (primaryIdx > -1) {
        guru.images[primaryIdx].storage_key = primary_image;
        guru.images[primaryIdx].image_url = '';
      } else if (guru.images.length > 0) {
        guru.images[0].storage_key = primary_image;
        guru.images[0].is_primary = true;
      } else {
        guru.images.push({
          storage_key: primary_image,
          is_primary: true,
          alt_text: guru.full_name
        });
      }
    }

    // 2. Process gallery_images
    if (gallery_images !== undefined) {
      const urls = gallery_images.split('\n').map(u => u.trim()).filter(Boolean);
      // Retain only primary
      const primary = guru.images.find(img => img.is_primary);
      const newImages = [];
      if (primary) {
        newImages.push(primary);
      }
      urls.forEach((url, i) => {
        newImages.push({
          storage_key: url,
          is_primary: false,
          alt_text: `${guru.full_name} Gallery ${i + 1}`,
          sort_order: i + 1
        });
      });
      guru.images = newImages;
    }

    await guru.save();
    res.json(guru);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PATCH /api/gurus/:slug/toggle-status — Toggle published/draft (auth required) ──
router.patch('/:slug/toggle-status', requireAuth, async (req, res) => {
  try {
    const guru = await Guru.findOne(getGuruQuery(req.params.slug));
    if (!guru) return res.status(404).json({ error: 'Guru not found' });

    guru.status = guru.status === 'published' ? 'draft' : 'published';
    await guru.save();
    res.json(guru);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/gurus/:slug — Delete by slug or ID (auth required) ──
router.delete('/:slug', requireAuth, async (req, res) => {
  try {
    const guru = await Guru.findOneAndDelete(getGuruQuery(req.params.slug));
    if (!guru) return res.status(404).json({ error: 'Guru not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
