const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');

const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
const uploadsDir = isVercel
  ? path.join('/tmp', 'uploads')
  : path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (err) {
    console.error('Failed to create uploads directory:', err.message);
  }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadsDir); },
  filename: function (req, file, cb) {
    var unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    var allowed = /jpeg|jpg|png|gif|webp|svg|mp4|webm/;
    var ext = allowed.test(path.extname(file.originalname).toLowerCase());
    var mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image and video files are allowed'));
  }
});

const Media = require('../models/Media');

router.post('/', requireAuth, upload.single('file'), async function (req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const data = fs.readFileSync(req.file.path);
    await Media.findOneAndUpdate(
      { filename: req.file.filename },
      {
        filename: req.file.filename,
        contentType: req.file.mimetype,
        data: data
      },
      { upsert: true, new: true }
    );
    var url = '/uploads/' + req.file.filename;
    res.json({ url: url, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/multiple', requireAuth, upload.array('files', 20), async function (req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  try {
    const files = [];
    for (const f of req.files) {
      const data = fs.readFileSync(f.path);
      await Media.findOneAndUpdate(
        { filename: f.filename },
        {
          filename: f.filename,
          contentType: f.mimetype,
          data: data
        },
        { upsert: true }
      );
      files.push({ url: '/uploads/' + f.filename, filename: f.filename });
    }
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
