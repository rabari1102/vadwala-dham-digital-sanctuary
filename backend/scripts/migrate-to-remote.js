/**
 * Migrate database records in MongoDB Atlas from local /uploads/... paths
 * back to remote CDN URLs pointing to dudhrejvadwala.com (Option A).
 * Guru photos are kept as /uploads/gurus/ since they are tracked in Git.
 */
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Settings = require('../models/Settings');
const Banner = require('../models/Banner');
const HistorySection = require('../models/HistorySection');
const GalleryItem = require('../models/GalleryItem');
const Activity = require('../models/Activity');
const Festival = require('../models/Festival');
const PaymentInfo = require('../models/PaymentInfo');
const GaushalaContent = require('../models/GaushalaContent');

function toRemoteUrl(localPath) {
  if (!localPath) return localPath;
  if (localPath.startsWith('http')) return localPath;
  
  // Keep guru photos local since they are committed to Git
  if (localPath.includes('/gurus/')) {
    return localPath;
  }

  const filename = localPath.split('/').pop();
  if (!filename) return localPath;

  // Map to correct WordPress subfolders on the live site
  if (filename === 'Vadwalal-Logo-1024x672.png' || filename === 'Dudhrej-QR-622x1024.jpeg') {
    return `https://dudhrejvadwala.com/wp-content/uploads/2025/01/${filename}`;
  }
  if (filename === 'vadwala-mandir-dudhrej-surendra-nagar-gujarat-temples-kfrnlzp1vd.webp') {
    return `https://dudhrejvadwala.com/wp-content/uploads/2025/07/${filename}`;
  }
  
  // All other seeded images are in 2025/08
  return `https://dudhrejvadwala.com/wp-content/uploads/2025/08/${filename}`;
}

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI is not defined in backend/.env');
    process.exit(1);
  }

  console.log('Connecting to database...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas.\n');

  let updatedSettings = 0;
  let updatedBanners = 0;
  let updatedHistory = 0;
  let updatedGallery = 0;
  let updatedActivities = 0;
  let updatedFestivals = 0;
  let updatedPayment = 0;
  let updatedGaushala = 0;

  // 1. Settings
  const settings = await Settings.findOne();
  if (settings) {
    let changed = false;
    ['logo', 'introImage', 'qrCode'].forEach((field) => {
      if (settings[field] && settings[field].startsWith('/uploads')) {
        const original = settings[field];
        settings[field] = toRemoteUrl(settings[field]);
        if (original !== settings[field]) changed = true;
      }
    });
    if (changed) {
      await settings.save();
      updatedSettings = 1;
      console.log('✅ Settings updated to remote URLs');
    }
  }

  // 2. Banners
  const banners = await Banner.find({ image: /^\/uploads/ });
  for (const item of banners) {
    const original = item.image;
    item.image = toRemoteUrl(item.image);
    if (original !== item.image) {
      await item.save();
      updatedBanners++;
    }
  }
  if (updatedBanners > 0) console.log(`✅ Banners updated: ${updatedBanners}`);

  // 3. History Sections
  const history = await HistorySection.find({ image: /^\/uploads/ });
  for (const item of history) {
    const original = item.image;
    item.image = toRemoteUrl(item.image);
    if (original !== item.image) {
      await item.save();
      updatedHistory++;
    }
  }
  if (updatedHistory > 0) console.log(`✅ History sections updated: ${updatedHistory}`);

  // 4. Gallery Items
  const gallery = await GalleryItem.find({ image: /^\/uploads/ });
  for (const item of gallery) {
    const original = item.image;
    item.image = toRemoteUrl(item.image);
    if (original !== item.image) {
      await item.save();
      updatedGallery++;
    }
  }
  if (updatedGallery > 0) console.log(`✅ Gallery items updated: ${updatedGallery}`);

  // 5. Activities
  const activities = await Activity.find({ image: /^\/uploads/ });
  for (const item of activities) {
    const original = item.image;
    item.image = toRemoteUrl(item.image);
    if (original !== item.image) {
      await item.save();
      updatedActivities++;
    }
  }
  if (updatedActivities > 0) console.log(`✅ Activities updated: ${updatedActivities}`);

  // 6. Festivals
  const festivals = await Festival.find({ image: /^\/uploads/ });
  for (const item of festivals) {
    const original = item.image;
    item.image = toRemoteUrl(item.image);
    if (original !== item.image) {
      await item.save();
      updatedFestivals++;
    }
  }
  if (updatedFestivals > 0) console.log(`✅ Festivals updated: ${updatedFestivals}`);

  // 7. Payment Info
  const payment = await PaymentInfo.find({ $or: [{ qrImage: /^\/uploads/ }, { qrCode: /^\/uploads/ }] });
  for (const item of payment) {
    let changed = false;
    if (item.qrImage && item.qrImage.startsWith('/uploads')) {
      item.qrImage = toRemoteUrl(item.qrImage);
      changed = true;
    }
    if (item.qrCode && item.qrCode.startsWith('/uploads')) {
      item.qrCode = toRemoteUrl(item.qrCode);
      changed = true;
    }
    if (changed) {
      await item.save();
      updatedPayment++;
    }
  }
  if (updatedPayment > 0) console.log(`✅ Payment info updated: ${updatedPayment}`);

  // 8. Gaushala Content
  const gaushalas = await GaushalaContent.find();
  for (const item of gaushalas) {
    let changed = false;
    if (item.photos && item.photos.length > 0) {
      item.photos = item.photos.map((p) => {
        if (p.src && p.src.startsWith('/uploads')) {
          const originalSrc = p.src;
          const remoteSrc = toRemoteUrl(p.src);
          if (originalSrc !== remoteSrc) {
            changed = true;
            return { ...p.toObject(), src: remoteSrc };
          }
        }
        return p;
      });
    }
    if (item.heroImage && item.heroImage.startsWith('/uploads')) {
      const originalHero = item.heroImage;
      item.heroImage = toRemoteUrl(item.heroImage);
      if (originalHero !== item.heroImage) changed = true;
    }
    if (changed) {
      await item.save();
      updatedGaushala++;
    }
  }
  if (updatedGaushala > 0) console.log(`✅ Gaushala contents updated: ${updatedGaushala}`);

  console.log('\n═══════════════════════════════════════');
  console.log('  Migration to Remote URLs Complete!');
  console.log('═══════════════════════════════════════');
  console.log(`- Settings updated:      ${updatedSettings}`);
  console.log(`- Banners updated:       ${updatedBanners}`);
  console.log(`- History sections:      ${updatedHistory}`);
  console.log(`- Gallery items:         ${updatedGallery}`);
  console.log(`- Activities:            ${updatedActivities}`);
  console.log(`- Festivals:             ${updatedFestivals}`);
  console.log(`- Payment info:          ${updatedPayment}`);
  console.log(`- Gaushala content:      ${updatedGaushala}`);
  console.log('═══════════════════════════════════════');

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
