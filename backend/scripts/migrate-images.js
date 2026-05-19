/**
 * Download all images from the old dudhrejvadwala.com CDN
 * and store them locally in backend/uploads/
 * Then update database records to use local paths.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Settings = require('../models/Settings');
const HistorySection = require('../models/HistorySection');
const GalleryItem = require('../models/GalleryItem');
const GaushalaContent = require('../models/GaushalaContent');
const PaymentInfo = require('../models/PaymentInfo');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
const SITE = 'https://dudhrejvadwala.com';

/* Ensure uploads directory exists */
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

/* Download a single file */
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      console.log(`  SKIP (exists): ${path.basename(destPath)}`);
      return resolve(destPath);
    }

    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(destPath);

    const makeRequest = (reqUrl, redirectCount = 0) => {
      if (redirectCount > 5) return reject(new Error(`Too many redirects for ${url}`));

      protocol.get(reqUrl, (res) => {
        // Handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let newUrl = res.headers.location;
          if (!newUrl.startsWith('http')) {
            const urlObj = new URL(reqUrl);
            newUrl = `${urlObj.protocol}//${urlObj.host}${newUrl}`;
          }
          res.resume();
          return makeRequest(newUrl, redirectCount + 1);
        }

        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }

        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`  OK: ${path.basename(destPath)} (${Math.round(file.bytesWritten / 1024)}KB)`);
          resolve(destPath);
        });
      }).on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    };

    makeRequest(url);
  });
}

/* Get all unique CDN URLs used in the seeder */
function getAllImageUrls() {
  const UPLOAD_2025_01 = `${SITE}/wp-content/uploads/2025/01`;
  const UPLOAD_2025_07 = `${SITE}/wp-content/uploads/2025/07`;
  const UPLOAD_2025_08 = `${SITE}/wp-content/uploads/2025/08`;

  const urls = new Set();

  // Core images
  urls.add(`${UPLOAD_2025_01}/Vadwalal-Logo-1024x672.png`);
  urls.add(`${UPLOAD_2025_01}/Dudhrej-QR-622x1024.jpeg`);
  urls.add(`${UPLOAD_2025_07}/vadwala-mandir-dudhrej-surendra-nagar-gujarat-temples-kfrnlzp1vd.webp`);
  urls.add(`${UPLOAD_2025_08}/WhatsApp-Image-2025-08-25-at-10.37.02-AM.jpeg`);
  urls.add(`${UPLOAD_2025_08}/Vadwala_01.jpg`);
  urls.add(`${UPLOAD_2025_08}/WhatsApp-Image-2025-08-25-at-10.43.03-AM.jpeg`);
  urls.add(`${UPLOAD_2025_08}/WhatsApp-Image-2025-08-25-at-4.35.13-PM-768x512.jpeg`);
  urls.add(`${UPLOAD_2025_08}/Guru-Purnima-202433.jpg`);
  urls.add(`${UPLOAD_2025_08}/Holi-Mahotsav-12.jpg`);
  urls.add(`${UPLOAD_2025_08}/Janmashtami-Mahotsav37.jpg`);
  urls.add(`${UPLOAD_2025_08}/Dipavali-Mahotsave14.jpg`);
  urls.add(`${UPLOAD_2025_08}/DJI_0010-Copy.jpg`);

  // Gallery items (Dipavali 1-23, Janmashtami 1-49, Guru-Purnima 1-37, Holi 1-45)
  for (let i = 1; i <= 23; i++) urls.add(`${UPLOAD_2025_08}/Dipavali-Mahotsave${i}.jpg`);
  for (let i = 1; i <= 49; i++) urls.add(`${UPLOAD_2025_08}/Janmashtami-Mahotsav${i}.jpg`);
  for (let i = 1; i <= 37; i++) urls.add(`${UPLOAD_2025_08}/Guru-Purnima-2024${i}.jpg`);
  for (let i = 1; i <= 45; i++) urls.add(`${UPLOAD_2025_08}/Holi-Mahotsav-${i}.jpg`);

  return [...urls];
}

/* Replace CDN URL with local path */
function toLocalPath(cdnUrl) {
  if (!cdnUrl || !cdnUrl.includes('dudhrejvadwala.com')) return cdnUrl;
  const filename = cdnUrl.split('/').pop();
  return `/uploads/${filename}`;
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Image Migration: CDN → Local Uploads');
  console.log('═══════════════════════════════════════\n');

  // Step 1: Download all images
  const urls = getAllImageUrls();
  console.log(`📥 Downloading ${urls.length} images from dudhrejvadwala.com...\n`);

  let downloaded = 0;
  let failed = 0;
  const failedUrls = [];

  for (const url of urls) {
    const filename = url.split('/').pop();
    const destPath = path.join(UPLOAD_DIR, filename);
    try {
      await downloadFile(url, destPath);
      downloaded++;
    } catch (err) {
      console.log(`  FAIL: ${filename} — ${err.message}`);
      failed++;
      failedUrls.push(url);
    }
  }

  console.log(`\n✅ Downloaded: ${downloaded} | ❌ Failed: ${failed}\n`);
  if (failedUrls.length > 0) {
    console.log('Failed URLs:');
    failedUrls.forEach(u => console.log(`  - ${u}`));
    console.log('');
  }

  // Step 2: Update database records
  console.log('📝 Updating database records to use local paths...\n');
  await mongoose.connect(process.env.MONGODB_URI);

  // Update Settings
  const settings = await Settings.findOne();
  if (settings) {
    let changed = false;
    ['logo', 'introImage'].forEach(field => {
      if (settings[field] && settings[field].includes('dudhrejvadwala.com')) {
        settings[field] = toLocalPath(settings[field]);
        changed = true;
      }
    });
    if (settings.qrCode && settings.qrCode.includes('dudhrejvadwala.com')) {
      settings.qrCode = toLocalPath(settings.qrCode);
      changed = true;
    }
    if (changed) {
      await settings.save();
      console.log('  ✅ Settings updated');
    }
  }

  // Update Gallery Items
  const galleryItems = await GalleryItem.find({ image: /dudhrejvadwala\.com/ });
  for (const item of galleryItems) {
    item.image = toLocalPath(item.image);
    await item.save();
  }
  console.log(`  ✅ Gallery items updated: ${galleryItems.length}`);

  // Update History Sections
  const historySections = await HistorySection.find({ image: /dudhrejvadwala\.com/ });
  for (const item of historySections) {
    item.image = toLocalPath(item.image);
    await item.save();
  }
  console.log(`  ✅ History sections updated: ${historySections.length}`);

  // Update Payment Info
  const paymentInfos = await PaymentInfo.find({ qrCode: /dudhrejvadwala\.com/ });
  for (const item of paymentInfos) {
    item.qrCode = toLocalPath(item.qrCode);
    await item.save();
  }
  console.log(`  ✅ Payment info updated: ${paymentInfos.length}`);

  // Update Gaushala Content photos
  const gaushala = await GaushalaContent.findOne();
  if (gaushala && gaushala.photos) {
    gaushala.photos = gaushala.photos.map(p => ({
      ...p.toObject ? p.toObject() : p,
      src: toLocalPath(p.src),
    }));
    if (gaushala.heroImage && gaushala.heroImage.includes('dudhrejvadwala.com')) {
      gaushala.heroImage = toLocalPath(gaushala.heroImage);
    }
    await gaushala.save();
    console.log('  ✅ Gaushala content updated');
  }

  await mongoose.disconnect();

  console.log('\n═══════════════════════════════════════');
  console.log('  Migration Complete!');
  console.log('═══════════════════════════════════════');
  console.log(`  Images stored in: ${UPLOAD_DIR}`);
  console.log('  Database updated to use /uploads/ paths');
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
