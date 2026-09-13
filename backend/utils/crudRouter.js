const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');

const SORT_PATTERN = /^-?[A-Za-z_]+(\s+-?[A-Za-z_]+)*$/;
const MAX_LIMIT = 500;

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function createCrudRouter(Model, options) {
  options = options || {};
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const q = req.query;
      const filter = {};
      if (q.status) filter.status = String(q.status);
      if (q.type) filter.type = String(q.type);
      if (q.categoryId) {
        if (!isValidId(q.categoryId)) return res.json([]);
        filter.categoryId = q.categoryId;
      }
      if (q.isUpcoming !== undefined) filter.isUpcoming = q.isUpcoming === 'true';
      if (q.featured !== undefined) filter.isFeatured = q.featured === 'true';
      if (q.isActive !== undefined) filter.isActive = q.isActive === 'true';
      if (q.pageSlug) filter.pageSlug = String(q.pageSlug);

      const sort = typeof q.sort === 'string' && SORT_PATTERN.test(q.sort) ? q.sort : 'order';
      let query = Model.find(filter).sort(sort).select('-__v');

      const limit = parseInt(q.limit, 10);
      if (limit > 0) query = query.limit(Math.min(limit, MAX_LIMIT));
      if (options.populate) query = query.populate(options.populate, 'title slug');

      res.json(await query.lean());
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      if (!isValidId(req.params.id)) return res.status(404).json({ error: 'Not found' });
      let query = Model.findById(req.params.id).select('-__v');
      if (options.populate) query = query.populate(options.populate, 'title slug');
      const item = await query.lean();
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/', requireAuth, async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Registered before '/:id' routes so "reorder" is never treated as an id.
  router.patch('/reorder', requireAuth, async (req, res) => {
    try {
      const list = req.body.items;
      if (!list || !Array.isArray(list)) {
        return res.status(400).json({ error: 'items array required' });
      }
      const ops = list
        .filter((entry) => entry && isValidId(entry.id))
        .map((entry) => ({ updateOne: { filter: { _id: entry.id }, update: { order: Number(entry.order) || 0 } } }));
      if (ops.length) await Model.bulkWrite(ops, { ordered: false });
      res.json({ message: 'Reordered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put('/:id', requireAuth, async (req, res) => {
    try {
      if (!isValidId(req.params.id)) return res.status(404).json({ error: 'Not found' });
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean();
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    try {
      if (!isValidId(req.params.id)) return res.status(404).json({ error: 'Not found' });
      const item = await Model.findByIdAndDelete(req.params.id).lean();
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.patch('/:id/toggle-status', requireAuth, async (req, res) => {
    try {
      if (!isValidId(req.params.id)) return res.status(404).json({ error: 'Not found' });
      const current = await Model.findById(req.params.id).select('status').lean();
      if (!current) return res.status(404).json({ error: 'Not found' });
      const status = current.status === 'published' ? 'draft' : 'published';
      const item = await Model.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createCrudRouter;
