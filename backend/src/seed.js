require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Announcement = require('./models/Announcement');
const Acharya = require('./models/Acharya');
const Service = require('./models/Service');
const Festival = require('./models/Festival');
const About = require('./models/About');
const Contact = require('./models/Contact');
const Donation = require('./models/Donation');
const HeroSlide = require('./models/Hero');
const Gallery = require('./models/Gallery');
const DhajaChadava = require('./models/DhajaChadava');
const Admin = require('./models/Admin');
const SiteContent = require('./models/SiteContent');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vadwala_dham';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // --- Hero Slides ---
  await HeroSlide.deleteMany({});
  await HeroSlide.insertMany([
    { imageUrl: '/gallery/temple-night.jpg', tagline: 'સૌરાષ્ટ્રની દેવભૂમિ', taglineEn: 'The Holy Land of Saurashtra', order: 1 },
    { imageUrl: '/gallery/temple-day.webp', tagline: '૫૦૦ વર્ષ જૂની આધ્યાત્મિક વિભૂતિ', taglineEn: 'A 500-Year-Old Spiritual Legacy', order: 2 },
    { imageUrl: '/gallery/janmashtami-1.jpg', tagline: 'અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી', taglineEn: 'Akhil Bharatiya Rabari Samaj Dharmagurugadi', order: 3 },
  ]);
  console.log('✅ Hero slides seeded');

  // --- Announcements ---
  await Announcement.deleteMany({});
  await Announcement.insertMany([
    { text: '🙏 જય વડવાળા', order: 1 },
    { text: 'Shri Vadwala Dev Ki Jai', order: 2 },
    { text: 'Dudhrej Dham', order: 3 },
    { text: 'અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી', order: 4 },
  ]);
  console.log('✅ Announcements seeded');

  // --- About ---
  await About.deleteMany({});
  await About.create({
    historyParagraphs: [
      'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. તેમાય તેમાંનો પાંચાળ પ્રદેશ જે પાછળથી ઝાલાવાડ તરીકે ઓળખાવા લાગ્યો અને હાલ જેને સુરેન્દ્રનગર જિલ્લો કહેવામાં આવે છે તે પ્રદેશ દેવભૂમિ ગણાતો. પશ્ચિમ ભારતમાં આવેલા આ પ્રદેશમાં પ્રાચીન વર્ધમાનપુરી તરીકે જાણીતું વઢવાણ નગર આવેલું છે. સુરેન્દ્રનગર જિલ્લાના વઢવાણ તાલુકામાં સુરેન્દ્રનગર ગામથી પાંચેક કિલોમીટર દૂધરેજ નામક ગામ આવેલું છે.',
      'આ દૂધરેજ ગામમાં શ્રીમદ્ ભકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણાથી અને તેઓશ્રીના શુભ આશીર્વાદથી શ્રીરામીય વૈષ્ણવોનાં ધર્મધામ સમું શ્રી વટપતિ (વડવાળા-દેવ) ભગવાનનું આશ્રમ સ્થાન આવેલ છે. તેમના આરાધ્ય દેવ અયોધ્યાપતિ ભગવાન શ્રી રામચંદ્રજી છે.',
      'મહા વદ ગિરિ માંથી જન્મ પામેલી ઉન્મત્ત ગંગા (હાલની ઉમઈ નદી)ના ઉત્તર કિનારે આ સુંદર સ્થાન આવેલ છે. નજીકમાં જ આશ્રમને અડીને સુંદર સરોવર આવેલ છે. જેને પયસર કે દુગ્ધસર કહે છે.',
    ],
    facts: [
      { icon: '🏔️', titleGuj: 'દેવભૂમિ — સૌરાષ્ટ્ર', text: 'The land of Saurashtra (Panchal/Zhalavad region, now Surendranagar district) is considered Dev Bhoomi — home of saints, warriors and satis.', order: 1 },
      { icon: '🙏', titleGuj: 'શ્રી વટપતિ (વડવાળા દેવ)', text: 'The presiding deity Shri Vatapati (Vadwala Dev) is widely revered across Gujarat as an avatar of Lord Ramchandraji.', order: 2 },
      { icon: '🏞️', titleGuj: 'ઉમઈ નદી — પયસર સરોવર', text: 'Situated on the northern bank of the Umiya River (ancient Unmatt Ganga), with a beautiful adjacent lake called "Payasar" or "Dugdhasar".', order: 3 },
      { icon: '🌳', titleGuj: 'પ્રાચીન વટવૃક્ષ', text: 'A magnificent ancient banyan tree (Vatavriksha) grown from a twig by the first Acharya Shri Shatpragnya Swamiji stands on the eastern side.', order: 4 },
      { icon: '🕯️', titleGuj: 'આચાર્યશ્રીઓની સમાધિઓ', text: 'The Samadhis (sacred tombs) of all Acharyas from Shatpragnya Swamiji onward are located on the southern side — witnesses to 500+ years of glorious tradition.', order: 5 },
      { icon: '🍽️', titleGuj: 'અન્નક્ષેત્ર — માતા અન્નપૂર્ણા', text: 'The Annakshetra (food hall) houses Mata Annapurna — millions of devotees have received prasad here. Guestrooms/Yatri Nivas available for pilgrims.', order: 6 },
    ],
    gates: [
      { icon: '🦁', name: 'Sinhadvara (Lion Gate)', nameGuj: 'સિંહદ્વાર — પૂર્વ' },
      { icon: '🐂', name: 'Nandidvara', nameGuj: 'નંદીદ્વાર — ઉત્તર' },
      { icon: '🐘', name: 'Hastidvara (Elephant Gate)', nameGuj: 'હસ્તિદ્વાર — દક્ષિણ' },
    ],
    fiveDeitiesGuj: 'મંદિરમાં પાંચ દેવો બિરાજેલા છે (ડાબેથી જમણે): શ્રી દ્વારકાનાથજી, શ્રી વટનાથ, ભગવાન શ્રી રામચંદ્રજી, સ્વામી ષટપ્રજ્ઞદાસજી, ભગવાન શ્રી શંકર',
  });
  console.log('✅ About seeded');

  // --- Acharyas ---
  await Acharya.deleteMany({});
  const acharyaList = [
    { nameGuj: 'નીલકંઠ સ્વામી', name: 'Nilkanth Swami' },
    { nameGuj: 'રઘુનાથ સ્વામી', name: 'Raghunath Swami' },
    { nameGuj: 'યાદવ સ્વામી', name: 'Yadav Swami' },
    { nameGuj: 'ષટપ્રજ્ઞદાસજી', name: 'Shatpragnya Dasji' },
    { nameGuj: 'લબ્ધરામજી', name: 'Labdhramji' },
    { nameGuj: 'રત્નદાસજી', name: 'Ratnadasji' },
    { nameGuj: 'માનદાસજી', name: 'Manadasji' },
    { nameGuj: 'કૃષ્ણદાસજી', name: 'Krishnadasji' },
    { nameGuj: 'ઓધવદાસજી', name: 'Odhavdasji' },
    { nameGuj: 'ગોકુલદાસજી', name: 'Gokuldasji' },
    { nameGuj: 'ભાવદાસજી', name: 'Bhavdasji' },
    { nameGuj: 'ગુલાબદાસજી', name: 'Gulabdasji' },
    { nameGuj: 'કેવળદાસજી', name: 'Kevaldasji' },
    { nameGuj: 'મેઘદાસજી', name: 'Meghadasji' },
    { nameGuj: 'યમુનાદાસજી', name: 'Yamunadasji' },
    { nameGuj: 'ગંગારામજી', name: 'Gangaramji' },
    { nameGuj: 'ગોવિંદરામજી', name: 'Govindramji' },
    { nameGuj: 'રઘુવરદાસજી', name: 'Raghuvardasji' },
    { nameGuj: 'જીવરામદાસજી', name: 'Jivramdasji' },
    { nameGuj: 'ગોમતીદાસજી', name: 'Gomatidasji' },
    { nameGuj: 'કલ્યાણદાસજી', name: 'Kalyandasji' },
    { nameGuj: 'કનીરામદાસજી', name: 'Kaniramdas ji', current: true, since: '૧૯૯૪' },
    { nameGuj: 'વટપતિ મહિમા', name: 'Vatpati Mahima' },
  ];
  await Acharya.insertMany(acharyaList.map((a, i) => ({ ...a, order: i + 1 })));
  console.log('✅ Acharyas seeded');

  // --- Services ---
  await Service.deleteMany({});
  await Service.insertMany([
    { icon: '🍛', titleGuj: 'અન્નક્ષેત્ર : અભિયાગત સેવા', title: 'Annakshetra (Food Hall)', descGuj: 'શ્રી વડવાળા મંદિર દુધરેજધામ માં દરરોજ ૨૪ કલાક અન્નક્ષેત્ર ચલાવવામાં આવે છે. જ્યાં દરરોજના ૧૦૦૦ થી ૧૫૦૦ દર્શનાર્થીઓ તેમજ સાધુ–સંતો ભોજન પ્રસાદ ગ્રહણ કરે છે.', desc: '24-hour free meals served daily to 1,000–1,500 pilgrims, saints and sadhus.', order: 1 },
    { icon: '🐄', titleGuj: 'ગૌશાળા : ઉત્તમ ઓલાદનું રક્ષણ', title: 'Gaushala (Cow Shelter)', descGuj: 'શ્રી વડવાળા મંદિર દ્વારા ઉતમ ઓલાદના રક્ષણ માટે (૧) શ્રી વડવાળા મંદિર ગૌશાળા (૨) શ્રી વટેશ્વર ગૌશાળા – જેગડવા ચલાવવામાં આવે છે.', desc: 'Two Gaushalas for breeding and protection of high-quality indigenous cows.', order: 2 },
    { icon: '📚', titleGuj: 'શૈક્ષણિક કાર્ય', title: 'Educational Institutions', descGuj: 'સદગુરૂ શ્રી ગોમતીદાસબાપુ કુમાર છાત્રાલય, સદગુરૂ શ્રી કલ્યાણદાસબાપુ કન્યા છાત્રાલય તેમજ શ્રી વડવાળા દેવ સરસ્વતી વિધાલય ચલાવવામાં આવે છે.', desc: "Three institutions: Boys' Hostel, Girls' Hostel, and Shri Vadwala Dev Saraswati Vidhyalay.", order: 3 },
    { icon: '🏨', titleGuj: 'ધર્મશાળા — યાત્રિક નિવાસ', title: 'Dharmashala (Pilgrim Rest Houses)', descGuj: 'ભારતના પવિત્ર સ્થળોમાં સેવક સમાજ માટે વિશાળ ધર્મશાળા ચલાવવામાં આવે છે.', desc: 'Comfortable pilgrim rest houses at: Shri Raghuvir Dham — Dakor and Shri Kalyan Gurudham — Junagadh.', order: 4 },
    { icon: '🪔', titleGuj: 'મહાકુંભ અન્નક્ષેત્ર', title: 'Mahakumbh Annakshetra', descGuj: 'બાર બાર વર્ષે આવતા ભારતના પ્રસિધ્ધ મહાકુંભ પર્વમાં અન્નક્ષેત્ર ચલાવવામાં આવે છે.', desc: 'Free food service at: Ujjain | Nashik | Prayagraj (Allahabad) | Haridwar.', order: 5 },
    { icon: '🤝', titleGuj: 'આપાતકાળે સેવા', title: 'Emergency Relief', descGuj: 'આપાતકાળે વસ્ત્રદાન, અન્નદાન વગેરે સેવા કરવામાં આવે છે.', desc: 'During disasters: Vastraadan (Clothing Donation) and Annaadan (Food Donation).', order: 6 },
  ]);
  console.log('✅ Services seeded');

  // --- Festivals ---
  await Festival.deleteMany({});
  await Festival.insertMany([
    { icon: '🎨', nameGuj: 'હોળી મહોત્સવ સ્થાપના દિન', name: 'Holi Mahotsav (Sthapana Din)', date: 'ફાગણ સુદ પુનમ', dateEn: 'Fagan Sud Punam', isUpcoming: true, order: 1 },
    { icon: '🙏', nameGuj: 'ગુરુપુર્ણિમા મહોત્સવ', name: 'Guru Purnima Mahotsav', date: 'અષાઢ સુદ પુનમ', dateEn: 'Ashadh Sud Punam', order: 2 },
    { icon: '🪴', nameGuj: 'જન્માષ્ટમી મહોત્સવ', name: 'Janmashtami Mahotsav', date: 'શ્રાવણ વદ ૮', dateEn: 'Shravan Vad 8', order: 3 },
    { icon: '🪔', nameGuj: 'દિપાવલી પર્વ', name: 'Diwali Parv', date: 'આસો વદ ૧૪', dateEn: 'Aso Vad 14', isUpcoming: true, order: 4 },
  ]);
  console.log('✅ Festivals seeded');

  // --- Gallery ---
  await Gallery.deleteMany({});
  await Gallery.insertMany([
    { imageUrl: '/gallery/janmashtami-1.jpg', cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami', order: 1 },
    { imageUrl: '/gallery/temple-day.webp', cat: 'મંદિર — Temple Architecture', tag: 'temple', order: 2 },
    { imageUrl: '/gallery/diwali-2.jpg', cat: 'દીપાવલી મહોત્સવ', tag: 'diwali', order: 3 },
    { imageUrl: '/gallery/gaushala-1.jpg', cat: 'ગૌશાળા — Gaushala', tag: 'gaushala', order: 4 },
    { imageUrl: '/gallery/janmashtami-6.jpg', cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami', order: 5 },
    { imageUrl: '/gallery/diwali-acharya.jpg', cat: 'દીપાવલી — આચાર્યશ્રી', tag: 'diwali', order: 6 },
    { imageUrl: '/gallery/gaushala-2.jpg', cat: 'ગૌશાળા — જય ગૌમાતા', tag: 'gaushala', order: 7 },
    { imageUrl: '/gallery/education-girls.jpg', cat: 'શૈક્ષણિક — કન્યા છાત્રાલય', tag: 'education', order: 8 },
    { imageUrl: '/gallery/diwali-1.jpg', cat: 'દીપાવલી મહોત્સવ', tag: 'diwali', order: 9 },
    { imageUrl: '/gallery/janmashtami-5.jpg', cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami', order: 10 },
    { imageUrl: '/gallery/guru-purnima.jpg', cat: 'ગુરુ પૂર્ણિમા', tag: 'gurupurnima', order: 11 },
    { imageUrl: '/gallery/education-school.jpg', cat: 'શૈક્ષણિક — વિધાલય', tag: 'education', order: 12 },
    { imageUrl: '/gallery/temple-night.jpg', cat: 'મંદિર — Night View', tag: 'temple', order: 13 },
    { imageUrl: '/gallery/janmashtami-7.jpg', cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami', order: 14 },
    { imageUrl: '/gallery/gaushala-3.jpg', cat: 'ગૌશાળા — Gaushala', tag: 'gaushala', order: 15 },
    { imageUrl: '/gallery/diwali-3.jpg', cat: 'દીપાવલી મહોત્સવ', tag: 'diwali', order: 16 },
    { imageUrl: '/gallery/gaushala-banner.jpg', cat: 'શ્રી વટેશ્વર ગૌશાળા', tag: 'gaushala', order: 17 },
    { imageUrl: '/gallery/janmashtami-4.jpg', cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami', order: 18 },
    { imageUrl: '/gallery/janmashtami-3.jpg', cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami', order: 19 },
  ]);
  console.log('✅ Gallery seeded');

  // --- DhajaChadava ---
  await DhajaChadava.deleteMany({});
  await DhajaChadava.insertMany([
    { name: 'Rameshbhai Rabari', nameGuj: 'રમેશભાઈ રબારી', village: 'ભાયાવદર', date: new Date().toISOString().slice(0, 10), dedication: 'શ્રી વડવાળા દેવના ચરણે ધજા ચઢાવો', samvat: 'વૈ. સુ. ૧' },
    { name: 'Dhirubhai Vankar', nameGuj: 'ધીરુભાઈ વાંકર', village: 'સુરેન્દ્રનગર', date: new Date().toISOString().slice(0, 10), dedication: 'ગુરુ કૃપા', samvat: 'વૈ. સુ. ૧' },
    { name: 'Savitaben Rabari', nameGuj: 'સવિતાબેન રબારી', village: 'ધ્રાંગધ્રા', date: new Date().toISOString().slice(0, 10), dedication: 'જય વડવાળા', samvat: 'વૈ. સુ. ૧' },
    { name: 'Nareshbhai Mer', nameGuj: 'નરેશભાઈ મેર', village: 'ગોંડળ', date: new Date().toISOString().slice(0, 10), dedication: 'ઈશ્વરની ભક્તિ', samvat: 'વૈ. સુ. ૧' },
    { name: 'Jayaben Chaudhary', nameGuj: 'જ્યયા ચૌધરી', village: 'રાજકોટ', date: new Date().toISOString().slice(0, 10), dedication: 'ગૌ-સેવા', samvat: 'વૈ. સુ. ૧' },
    { name: 'Bhaveshbhai Patel', nameGuj: 'ભાવેશભાઈ પટેલ', village: 'અમદાવાદ', date: new Date().toISOString().slice(0, 10), samvat: 'વૈ. સુ. ૧' },
  ]);
  console.log('✅ DhajaChadava seeded');

  // --- Contact ---
  await Contact.deleteMany({});
  await Contact.create({
    addressGuj: 'શ્રી વડવાળા મંદિર દુધરેજધામ, દુધરેજ, સુરેન્દ્રનગર (ગુજરાત) — 363040',
    addressEn: '5 km north of Surendranagar on Dhrangadhra Road',
    phones: ['9687921008', '9825568108'],
    email: 'dudhrejvadwala@gmail.com',
    website: 'https://dudhrejvadwala.com',
    darshanjMorning: '6:00 AM – 12:00 PM',
    darshanEvening: '4:00 PM – 9:00 PM',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680!2d71.71667!3d22.71667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzAwLjAiTiA3McKwNDMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000',
    socialLinks: [
      { icon: '▶️', label: 'YouTube', url: '#' },
      { icon: '📷', label: 'Instagram', url: '#' },
      { icon: '👤', label: 'Facebook', url: '#' },
    ],
  });
  console.log('✅ Contact seeded');

  // --- Donation ---
  await Donation.deleteMany({});
  await Donation.create({
    qrImageUrl: 'https://dudhrejvadwala.com/wp-content/uploads/2025/01/Dudhrej-QR-622x1024.jpeg',
    purposes: [
      { label: 'અન્નક્ષેત્ર', icon: '🍛' },
      { label: 'ગૌશાળા', icon: '🐄' },
      { label: 'શિક્ષણ', icon: '📚' },
      { label: 'મંદિર જાળવણી', icon: '🏛️' },
      { label: 'ઉત્સવ', icon: '🪔' },
    ],
    fcraEligible: true,
    phones: ['9687921008', '9825568108'],
  });
  console.log('✅ Donation seeded');

  // --- Admin User ---
  await Admin.deleteMany({});
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await Admin.create({ username: 'admin', passwordHash });
  console.log('✅ Admin user seeded (username: admin)');

  // --- Site Content ---
  await SiteContent.deleteMany({});
  await SiteContent.insertMany([
    { key: 'hero_title', value: 'શ્રી વડવાળા મંદિર', type: 'text', label: 'Hero Title (Gujarati)' },
    { key: 'hero_subtitle', value: 'દુધરેજધામ', type: 'text', label: 'Hero Subtitle (Gujarati)' },
    { key: 'hero_tagline', value: 'Shri Vadwala Mandir, Dudhrej Dham', type: 'text', label: 'Hero Tagline (English)' },
    { key: 'hero_description', value: 'અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી', type: 'text', label: 'Hero Description' },
    { key: 'about_title', value: 'વડવાળા ધામ — ઐતિહાસિક પરિચય', type: 'text', label: 'About Section Title' },
    { key: 'about_subtitle', value: 'History of Vadwala Dham', type: 'text', label: 'About Section Subtitle' },
    { key: 'festivals_attendance', value: 'જન્માષ્ટમી, દિપાવલી, હોળી–ધુળેટી તેમજ ગુરૂ પૂર્ણિમા જેવા પાવન પ્રસંગોમાં અંદાજીત ૨ થી ૩ લાખ શ્રધ્ધાળુઓ દર્શનાર્થે આવે છે.', type: 'text', label: 'Festival Attendance Note' },
    { key: 'donate_title', value: 'ડોનેશન', type: 'text', label: 'Donation Section Title' },
    { key: 'donate_subtitle', value: 'આપનો સહયોગ આ સેવા ને ટકાવી રાખે છે — Your support sustains these divine services', type: 'text', label: 'Donation Section Subtitle' },
    { key: 'contact_title', value: 'સંપર્ક કરો', type: 'text', label: 'Contact Section Title' },
    { key: 'footer_copyright', value: 'Shri Vadwala Mandir Dudhrej Dham. All Rights Reserved.', type: 'text', label: 'Footer Copyright Text' },
    { key: 'whatsapp_number', value: '919687921008', type: 'text', label: 'WhatsApp Number (with country code)' },
    { key: 'site_name', value: 'શ્રી વડવાળા મંદિર દુધરેજધામ', type: 'text', label: 'Site Name' },
    { key: 'site_name_en', value: 'Shri Vadwala Mandir Dudhrej Dham', type: 'text', label: 'Site Name (English)' },
  ]);
  console.log('✅ Site content seeded');

  console.log('\n🎉 All seed data inserted successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
