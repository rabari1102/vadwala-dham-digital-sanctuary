const express = require('express');

/**
 * Creates a generic CRUD router for any Mongoose model.
 * Supports: GET all (with filters, sort), GET by ID, POST, PUT, DELETE
 */
function createCrudRouter(Model, options = {}) {
  const router = express.Router();

  // GET all — supports ?status=published&sort=order&limit=10&featured=true
  router.get('/', async (req, res) => {
    try {
      const { status, sort, limit, type, categoryId, isUpcoming, featured, isActive, pageSlug } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (type) filter.type = type;
      if (categoryId) filter.categoryId = categoryId;
      if (isUpcoming !== undefined) filter.isUpcoming = isUpcoming === 'true';
      if (featured !== undefined) filter.isFeatured = featured === 'true';
      if (isActive !== undefined) filter.isActive = isActive === 'true';
      if (pageSlug) filter.pageSlug = pageSlug;

      let query = Model.find(filter);
      if (sort) query = query.sort(sort);
      else query = query.sort('order');
      if (limit) query = query.limit(parseInt(limit));

      if (options.populate) query = query.populate(options.populate);

      const items = await query;
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET by ID
  router.get('/:id', async (req, res) => {
    try {
      let query = Model.findById(req.params.id);
      if (options.populate) query = query.populate(options.populate);
      const item = await query;
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create
  router.post('/', async (req, res) => {
    try {
      const item = new Model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PUT update
  router.put('/:id', async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE
  router.delete('/:id', async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PATCH — toggle publish/unpublish
  router.patch('/:id/toggle-status', async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      item.status = item.status === 'published' ? 'draft' : 'published';
      await item.save();
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PATCH — reorder
  router.patch('/reorder', async (req, res) => {
    try {
      const { items } = req.body; // [{ id, order }]
      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ error: 'items array required' });
      }
      const ops = items.map(i => Model.findByIdAndUpdate(i.id, { order: i.order }));
      await Promise.all(ops);
      res.json({ message: 'Reordered successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = createCrudRouter;
