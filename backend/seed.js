const mongoose = require('mongoose');
require('dotenv').config();

const Settings = require('./models/Settings');
const Banner = require('./models/Banner');
const HistorySection = require('./models/HistorySection');
const AcharyaParampara = require('./models/AcharyaParampara');
const GalleryCategory = require('./models/GalleryCategory');
const GalleryItem = require('./models/GalleryItem');
const Video = require('./models/Video');
const Festival = require('./models/Festival');
const DonationItem = require('./models/DonationItem');
const PaymentInfo = require('./models/PaymentInfo');
const Activity = require('./models/Activity');
const Announcement = require('./models/Announcement');
const Contact = require('./models/Contact');
const Seo = require('./models/Seo');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for seeding...');

  await Promise.all([
    Settings.deleteMany(), Banner.deleteMany(), HistorySection.deleteMany(),
    AcharyaParampara.deleteMany(), GalleryCategory.deleteMany(), GalleryItem.deleteMany(),
    Video.deleteMany(), Festival.deleteMany(), DonationItem.deleteMany(),
    PaymentInfo.deleteMany(), Activity.deleteMany(), Announcement.deleteMany(),
    Contact.deleteMany(), Seo.deleteMany()
  ]);

  const WP = 'https://dudhrejvadwala.com/wp-content/uploads/2025/08';

  // Settings
  await Settings.create({
    siteName: 'શ્રી વડવાળા મંદિર દુધરેજધામ',
    siteNameEn: 'Shree Vadwala Mandir Dudhrejdham',
    tagline: 'ભગવાન ના દર્શન',
    introTitle: 'શ્રી વડવાળા મંદિર દુધરેજધામ',
    introContent: 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. સુરેન્દ્રનગર જિલ્લાના વઢવાણ તાલુકામાં દૂધરેજ ગામમાં શ્રીમદ્ભકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણાથી શ્રી વટપતિ (વડવાળા-દેવ) ભગવાનનું આશ્રમ સ્થાન આવેલ છે. તેમના આરાધ્ય દેવ અયોધ્યાપતિ ભગવાન શ્રી રામચંદ્રજી છે.',
    introImage: `${WP}/Dipavali-Mahotsave1.jpg`,
    donateCtaTitle: 'દાન – સેવા',
    donateCtaText: 'શ્રી વડવાળા મંદિર દુધરેજધામના વિવિધ સેવા કાર્યોમાં આપનો સહકાર આપો.',
    liveDarshanUrl: 'https://dudhrejvadwala.com/',
    navLinks: [
      { label: 'હોમ', url: '/', order: 1, isActive: true },
      { label: 'ઇતિહાસ', url: '/history', order: 2, isActive: true },
      { label: 'પ્રવૃત્તિઓ', url: '/activities', order: 3, isActive: true },
      { label: 'ગેલેરી', url: '/gallery', order: 4, isActive: true },
      { label: 'વિડીયો', url: '/videos', order: 5, isActive: true },
      { label: 'દાન', url: '/donate', order: 6, isActive: true },
      { label: 'સંપર્ક', url: '/contact', order: 7, isActive: true }
    ],
    socialLinks: [
      { platform: 'YouTube', url: 'https://youtube.com/@dudhrejvadwala', icon: 'Youtube' },
      { platform: 'Instagram', url: 'https://instagram.com/dudhrejvadwala', icon: 'Instagram' },
      { platform: 'Facebook', url: 'https://facebook.com/dudhrejvadwala', icon: 'Facebook' }
    ]
  });

  // Banners - using real gallery images as banners
  await Banner.insertMany([
    { title: 'શ્રી વડવાળા મંદિર દુધરેજધામ', subtitle: 'ભગવાન શ્રી રામચંદ્રજીના પવિત્ર ધામમાં આપનું સ્વાગત છે', image: `${WP}/Dipavali-Mahotsave1.jpg`, ctaText: 'દર્શન કરો', ctaLink: '/gallery', order: 1 },
    { title: 'અન્નક્ષેત્ર : અભિયાગત સેવા', subtitle: 'દરરોજ ૨૪ કલાક અન્નક્ષેત્ર – ૧૦૦૦ થી ૧૫૦૦ દર્શનાર્થીઓ', image: `${WP}/Janmashtami-Mahotsav1.jpg`, ctaText: 'વધુ જાણો', ctaLink: '/activities', order: 2 },
    { title: 'ગૌશાળા : ઉત્તમ ઓલાદનું રક્ષણ', subtitle: 'શ્રી વટેશ્વર ગૌશાળા – ઉત્તમ ગાયોનો ઉછેર અને સેવા', image: `${WP}/Holi-Mahotsav-1.jpg`, ctaText: 'ગૌશાળા જુઓ', ctaLink: '/activities', order: 3 }
  ]);

  // History
  await HistorySection.insertMany([
    { title: 'વડવાળા ધામનો ઇતિહાસ', content: 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. સુરેન્દ્રનગર જિલ્લાના વઢવાણ તાલુકામાં દૂધરેજ ગામમાં શ્રીમદ્ભકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણાથી શ્રી વટપતિ (વડવાળા-દેવ) ભગવાનનું આશ્રમ સ્થાન આવેલ છે.', image: `${WP}/Dipavali-Mahotsave2.jpg`, order: 1 },
    { title: 'મંદિરની ભવ્યતા', content: 'પટાંગણની મધ્યમાં શિલ્પકલાની અત્યંત કમનીય કલાકારીગરીના ધામસમું ભગવાન શ્રી વટપતિ (રામ)નું ભવ્ય મંદિર શોભી રહ્યું છે. આ મંદિરનું બાંધકામ અને અન્ય સુશોભન આશ્ચર્યચકિત કર્યા વિના રહેતા નથી.', image: `${WP}/Dipavali-Mahotsave3.jpg`, order: 2 },
    { title: 'ત્રણ દ્વારો', content: 'શ્રી દૂધરેજ વડવાળા મંદિર પૂર્વાભિમુખ છે. પૂર્વમાં સિંહદ્વાર, ઉત્તરમાં નંદીદ્વાર અને દક્ષિણમાં હસ્તિદ્વાર શોભે છે. આ ત્રણે દ્વાર કલા-કારીગરીના નમૂનારૂપ છે.', image: `${WP}/Guru-Purnima-20241.jpg`, order: 3 },
    { title: 'પાંચ દેવો', content: 'અંદર પ્રવેશતાં પાંચ દેવો બિરાજેલા છે – શ્રી દ્વારકાનાથજી, શ્રી વટનાથ, ભગવાન શ્રી રામચંદ્રજી, સ્વામી ષટપ્રજ્ઞદાસજી અને ભગવાન શ્રી શંકર.', image: `${WP}/Guru-Purnima-20242.jpg`, order: 4 }
  ]);

  // Acharya Parampara
  await AcharyaParampara.insertMany([
    { name: 'નીલકંઠ સ્વામી', order: 1, periodStart: '૧૪૦૪', periodEnd: '૧૪૨૪' },
    { name: 'રઘુનાથ સ્વામી', order: 2, periodStart: '૧૪૨૪', periodEnd: '' },
    { name: 'યાદવ સ્વામી', order: 3, periodStart: '', periodEnd: '' },
    { name: 'ષટપ્રજ્ઞદાસજી', order: 4, periodStart: '૧૫૮૦', periodEnd: '' },
    { name: 'લબ્ધરામજી', order: 5, periodStart: '૧૭૮૫', periodEnd: '' },
    { name: 'રત્નદાસજી', order: 6, periodStart: '', periodEnd: '૧૮૩૦' },
    { name: 'માનદાસજી', order: 7, periodStart: '૧૮૩૦', periodEnd: '' },
    { name: 'ગોમતીદાસજી', order: 8, periodStart: '', periodEnd: '' },
    { name: 'કલ્યાણદાસજી', order: 9, periodStart: '', periodEnd: '' },
    { name: 'કનીરામદાસજી', order: 10, periodStart: '૧૯૯૪', periodEnd: 'વિદ્યમાન' }
  ]);

  // Gallery Categories
  const cats = await GalleryCategory.insertMany([
    { title: 'દીપાવલી મહોત્સવ', slug: 'dipavali', order: 1 },
    { title: 'જન્માષ્ટમી મહોત્સવ', slug: 'janmashtami', order: 2 },
    { title: 'ગુરુ પૂર્ણિમા', slug: 'guru-purnima', order: 3 },
    { title: 'હોળી મહોત્સવ', slug: 'holi', order: 4 }
  ]);

  // Gallery Items - Real images from reference site
  const galleryItems = [];
  // Dipavali - 23 images
  for (let i = 1; i <= 23; i++) {
    galleryItems.push({ categoryId: cats[0]._id, title: `દીપાવલી મહોત્સવ ${i}`, image: `${WP}/Dipavali-Mahotsave${i}.jpg`, order: i });
  }
  // Janmashtami - 25 images
  for (let i = 1; i <= 25; i++) {
    galleryItems.push({ categoryId: cats[1]._id, title: `જન્માષ્ટમી મહોત્સવ ${i}`, image: `${WP}/Janmashtami-Mahotsav${i}.jpg`, order: i });
  }
  // Guru Purnima - 16 images
  for (let i = 1; i <= 16; i++) {
    galleryItems.push({ categoryId: cats[2]._id, title: `ગુરુ પૂર્ણિમા ${i}`, image: `${WP}/Guru-Purnima-2024${i}.jpg`, order: i });
  }
  // Holi - 19 images
  for (let i = 1; i <= 19; i++) {
    galleryItems.push({ categoryId: cats[3]._id, title: `હોળી મહોત્સવ ${i}`, image: `${WP}/Holi-Mahotsav-${i}.jpg`, order: i });
  }
  await GalleryItem.insertMany(galleryItems);
  console.log(`Inserted ${galleryItems.length} gallery items`);

  // Videos
  await Video.insertMany([
    { title: 'દૂધરેજ વડવાળાધામ – વાલો મારો ઠાકર', embedUrl: 'https://www.youtube.com/embed/VIDEO_ID_1', type: 'video', order: 1 },
    { title: 'વાલા ને વધામણા || Vahala Ne Vadhamana', embedUrl: 'https://www.youtube.com/embed/VIDEO_ID_2', type: 'video', order: 2 },
    { title: 'કનિરામ બાપુ પ્રવચન – જન્માષ્ટમી', embedUrl: 'https://www.youtube.com/embed/VIDEO_ID_3', type: 'video', order: 3 }
  ]);

  // Festivals
  await Festival.insertMany([
    { title: 'હોળી મહોત્સવ સ્થાપના દિન', description: 'હોળીનો પવિત્ર ઉત્સવ અને મંદિરનો સ્થાપના દિવસ', image: `${WP}/Holi-Mahotsav-1.jpg`, order: 1 },
    { title: 'ગુરુપૂર્ણિમા મહોત્સવ', description: 'ગુરુજનોનું પૂજન અને સન્માન', image: `${WP}/Guru-Purnima-20241.jpg`, order: 2 },
    { title: 'જન્માષ્ટમી મહોત્સવ', description: 'ભગવાન શ્રી કૃષ્ણના જન્મોત્સવની ભવ્ય ઉજવણી', image: `${WP}/Janmashtami-Mahotsav1.jpg`, order: 3 },
    { title: 'દીપાવલી પર્વ', description: 'પ્રકાશના પર્વની ઉજવણી', image: `${WP}/Dipavali-Mahotsave1.jpg`, order: 4, isUpcoming: true, date: new Date('2026-10-20') }
  ]);

  // Activities
  await Activity.insertMany([
    { title: 'અન્નક્ષેત્ર : અભિયાગત સેવા', slug: 'annakshetra', shortDescription: 'દરરોજ ૨૪ કલાક અન્નક્ષેત્ર', description: 'શ્રી વડવાળા મંદિર દુધરેજધામ માં દરરોજ ૨૪ કલાક અન્નક્ષેત્ર ચલાવવામાં આવે છે. જ્યાં દરરોજના ૧૦૦૦ થી ૧૫૦૦ દર્શનાર્થીઓ તેમજ સાધુ-સંતો ભોજન પ્રસાદ ગ્રહણ કરે છે.', icon: 'Utensils', category: 'seva', isFeatured: true, image: `${WP}/Janmashtami-Mahotsav2.jpg`, order: 1 },
    { title: 'ગૌશાળા : ઉત્તમ ઓલાદનું રક્ષણ', slug: 'gaushala', shortDescription: 'ઉત્તમ ગાયોનો ઉછેર અને સેવા', description: 'શ્રી વડવાળા મંદિર દ્વારા (૧) શ્રી વડવાળા મંદિર ગૌશાળા (૨) શ્રી વટેશ્વર ગૌશાળા – જેગડવા ચલાવવામાં આવે છે.', icon: 'Heart', category: 'seva', isFeatured: true, image: `${WP}/Holi-Mahotsav-2.jpg`, order: 2 },
    { title: 'શૈક્ષણિક કાર્ય', slug: 'education', shortDescription: 'કુમાર છાત્રાલય, કન્યા છાત્રાલય, હાઈસ્કુલ', description: 'શ્રી વડવાળા મંદિર દ્વારા (1) સદ્ગુરૂ શ્રી ગોમતીદાસબાપુ કુમાર છાત્રાલય (2) સદ્ગુરૂ શ્રી કલ્યાણદાસબાપુ કન્યા છાત્રાલય તેમજ શ્રી વડવાળા દેવ સરસ્વતી વિધાલય ચલાવવામાં આવે છે.', icon: 'GraduationCap', category: 'education', isFeatured: true, image: `${WP}/Guru-Purnima-20243.jpg`, order: 3 },
    { title: 'પર્વ ઉજવણી', slug: 'festivals', shortDescription: 'જન્માષ્ટમી, દિપાવલી, હોળી-ધૂળેટી, ગુરૂ પૂર્ણિમા', description: 'પાવન પ્રસંગોમાં અંદાજીત ૨ થી ૩ લાખ શ્રદ્ધાળુઓ દર્શનાર્થે આવે છે. રહેવા તથા જમવાની વ્યવસ્થા મંદિર દ્વારા કરવામાં આવે છે.', icon: 'Sparkles', category: 'festival', isFeatured: true, image: `${WP}/Dipavali-Mahotsave4.jpg`, order: 4 }
  ]);

  // Donation Items
  await DonationItem.insertMany([
    { title: 'અન્નક્ષેત્ર દાન', description: 'અન્નક્ષેત્રના સંચાલન માટે દાન', icon: 'Utensils', order: 1 },
    { title: 'ગૌશાળા દાન', description: 'ગાયોની સેવા અને ઘાસચારા માટે', icon: 'Heart', order: 2 },
    { title: 'શૈક્ષણિક દાન', description: 'વિદ્યાર્થીઓના ભણતર માટે', icon: 'GraduationCap', order: 3 },
    { title: 'મંદિર જીર્ણોદ્ધાર', description: 'મંદિરની જાળવણી અને સમારકામ', icon: 'Building', order: 4 }
  ]);

  // Contact
  await Contact.create({
    address: 'શ્રી વડવાળા મંદિર દુધરેજધામ, દુધરેજ, સુરેન્દ્રનગર (ગુજરાત) - 363040',
    phones: ['96879 21008', '98255 68108'],
    emails: ['dudhrejvadwala@gmail.com'],
    website: 'https://dudhrejvadwala.com',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.5!2d71.68!3d22.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDUwJzI0LjAiTiA3McKwNDAnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000000',
    socialLinks: [
      { platform: 'YouTube', url: 'https://youtube.com/@dudhrejvadwala', icon: 'Youtube' },
      { platform: 'Instagram', url: 'https://instagram.com/dudhrejvadwala', icon: 'Instagram' },
      { platform: 'Facebook', url: 'https://facebook.com/dudhrejvadwala', icon: 'Facebook' }
    ]
  });

  // Announcements
  await Announcement.create({
    title: '🪔 આગામી ઉત્સવ: દીપાવલી મહોત્સવ – ૨૦ ઓક્ટોબર ૨૦૨૬',
    content: 'દીપાવલી પર્વ નિમિત્તે ભવ્ય ઉજવણી. સૌ ભક્તજનોને આમંત્રણ.',
    type: 'festival', isActive: true, order: 1
  });

  // SEO
  await Seo.insertMany([
    { pageSlug: 'home', title: 'શ્રી વડવાળા મંદિર દુધરેજધામ', description: 'સૌરાષ્ટ્રના દૂધરેજ ગામમાં આવેલ શ્રી વડવાળા મંદિરની અધિકૃત વેબસાઈટ' },
    { pageSlug: 'history', title: 'ઇતિહાસ – શ્રી વડવાળા મંદિર', description: 'વડવાળા ધામનો ઇતિહાસ અને આચાર્ય પરંપરા' },
    { pageSlug: 'gallery', title: 'ફોટો ગેલેરી – શ્રી વડવાળા મંદિર', description: 'મંદિરના ઉત્સવો અને દર્શનના ફોટો' },
    { pageSlug: 'videos', title: 'વિડીયો – શ્રી વડવાળા મંદિર', description: 'મંદિરના વિડીયો અને રીલ્સ' },
    { pageSlug: 'donate', title: 'દાન – શ્રી વડવાળા મંદિર', description: 'મંદિરના વિવિધ સેવા કાર્યોમાં દાન' },
    { pageSlug: 'contact', title: 'સંપર્ક – શ્રી વડવાળા મંદિર', description: 'શ્રી વડવાળા મંદિરનો સંપર્ક' },
    { pageSlug: 'activities', title: 'પ્રવૃત્તિઓ – શ્રી વડવાળા મંદિર', description: 'મંદિરની સેવા અને શૈક્ષણિક પ્રવૃત્તિઓ' }
  ]);

  console.log('✅ Seed completed with real images!');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
