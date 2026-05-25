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

router.post('/', requireAuth, upload.single('file'), function (req, res) {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  var url = '/uploads/' + req.file.filename;
  res.json({ url: url, filename: req.file.filename });
});

router.post('/multiple', requireAuth, upload.array('files', 20), function (req, res) {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  var files = req.files.map(function (f) {
    return { url: '/uploads/' + f.filename, filename: f.filename };
  });
  res.json(files);
});

module.exports = router;
