const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAuth } = require('../middleware/auth');

var uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
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
