const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { requireAuth } = require('../middleware/auth');
const Media = require('../models/Media');

// Files are stored in MongoDB, so keep them in memory instead of writing a temp copy to disk first
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    var allowed = /jpeg|jpg|png|gif|webp|svg|mp4|webm/;
    var ext = allowed.test(path.extname(file.originalname).toLowerCase());
    var mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image and video files are allowed'));
  }
});

function uniqueName(originalname) {
  return Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(originalname).toLowerCase();
}

function toMediaDoc(file) {
  return { filename: uniqueName(file.originalname), contentType: file.mimetype, data: file.buffer };
}

router.post('/', requireAuth, upload.single('file'), async function (req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const doc = toMediaDoc(req.file);
    await Media.create(doc);
    res.json({ url: '/uploads/' + doc.filename, filename: doc.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/multiple', requireAuth, upload.array('files', 20), async function (req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  try {
    const docs = req.files.map(toMediaDoc);
    await Media.insertMany(docs, { ordered: false });
    res.json(docs.map((d) => ({ url: '/uploads/' + d.filename, filename: d.filename })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
