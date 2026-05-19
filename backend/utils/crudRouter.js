const express = require('express');
const { requireAuth } = require('../middleware/auth');

function createCrudRouter(Model, options) {
  options = options || {};
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const q = req.query;
      const filter = {};
      if (q.status) filter.status = q.status;
      if (q.type) filter.type = q.type;
      if (q.categoryId) filter.categoryId = q.categoryId;
      if (q.isUpcoming !== undefined) filter.isUpcoming = q.isUpcoming === 'true';
      if (q.featured !== undefined) filter.isFeatured = q.featured === 'true';
      if (q.isActive !== undefined) filter.isActive = q.isActive === 'true';
      if (q.pageSlug) filter.pageSlug = q.pageSlug;
      var query = Model.find(filter);
      if (q.sort) query = query.sort(q.sort);
      else query = query.sort('order');
      if (q.limit) query = query.limit(parseInt(q.limit));
      if (options.populate) query = query.populate(options.populate);
      var items = await query;
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      var query = Model.findById(req.params.id);
      if (options.populate) query = query.populate(options.populate);
      var item = await query;
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post('/', requireAuth, async (req, res) => {
    try {
      var item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put('/:id', requireAuth, async (req, res) => {
    try {
      var item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', requireAuth, async (req, res) => {
    try {
      var item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.patch('/:id/toggle-status', requireAuth, async (req, res) => {
    try {
      var item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      item.status = item.status === 'published' ? 'draft' : 'published';
      await item.save();
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.patch('/reorder', requireAuth, async (req, res) => {
    try {
      var list = req.body.items;
      if (!list || !Array.isArray(list)) {
        return res.status(400).json({ error: 'items array required' });
      }
      var ops = [];
      for (var idx = 0; idx < list.length; idx++) {
        ops.push(Model.findByIdAndUpdate(list[idx].id, { order: list[idx].order }));
      }
      await Promise.all(ops);
      res.json({ message: 'Reordered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createCrudRouter;
