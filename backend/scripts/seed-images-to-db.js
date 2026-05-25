/**
 * Script to scan the local backend/uploads/ folder recursively
 * and upload all images and media assets to MongoDB Atlas.
 */
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Media = require('../models/Media');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    default:
      return 'application/octet-stream';
  }
}

// Recursively traverse directory to find files
function getFilesRecursively(dir, rootDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, rootDir));
    } else {
      // Get path relative to the root uploads directory, forcing forward slashes for URL consistency
      const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, relativePath });
    }
  });
  return results;
}

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in backend/.env');
    process.exit(1);
  }

  if (!fs.existsSync(UPLOADS_DIR)) {
    console.error(`Error: Uploads directory not found at ${UPLOADS_DIR}`);
    process.exit(1);
  }

  console.log('Connecting to database...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas.\n');

  console.log('Scanning uploads directory...');
  const files = getFilesRecursively(UPLOADS_DIR);
  console.log(`Found ${files.length} media files to seed.\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const mime = getMimeType(file.fullPath);
    try {
      const data = fs.readFileSync(file.fullPath);
      
      // Upsert to DB
      await Media.findOneAndUpdate(
        { filename: file.relativePath },
        {
          filename: file.relativePath,
          contentType: mime,
          data: data
        },
        { upsert: true, new: true }
      );
      
      successCount++;
      if (successCount % 20 === 0 || i === files.length - 1) {
        console.log(`  Uploaded ${successCount}/${files.length} files...`);
      }
    } catch (err) {
      console.error(`❌ Failed to upload ${file.relativePath}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log('  Media Seeding to Database Complete!');
  console.log('═══════════════════════════════════════');
  console.log(`- Total scanned:   ${files.length}`);
  console.log(`- Seeded to DB:    ${successCount}`);
  console.log(`- Failed uploads:  ${errorCount}`);
  console.log('═══════════════════════════════════════');

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
