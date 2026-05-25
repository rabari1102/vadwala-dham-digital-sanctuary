const Settings = require('../models/Settings');
const Banner = require('../models/Banner');
const HistorySection = require('../models/HistorySection');
const AcharyaParampara = require('../models/AcharyaParampara');
const GalleryCategory = require('../models/GalleryCategory');
const GalleryItem = require('../models/GalleryItem');
const Video = require('../models/Video');
const Festival = require('../models/Festival');
const DonationItem = require('../models/DonationItem');
const PaymentInfo = require('../models/PaymentInfo');
const Activity = require('../models/Activity');
const Announcement = require('../models/Announcement');
const Contact = require('../models/Contact');
const Seo = require('../models/Seo');
const GaushalaContent = require('../models/GaushalaContent');
const Guru = require('../models/Guru');
const TithiDay = require('../models/TithiDay');

// Local uploads paths (images downloaded from old CDN via scripts/migrate-images.js)
const LOCAL = '/uploads';

const images = {
  logo: `${LOCAL}/Vadwalal-Logo-1024x672.png`,
  qr: `${LOCAL}/Dudhrej-QR-622x1024.jpeg`,
  temple: `${LOCAL}/vadwala-mandir-dudhrej-surendra-nagar-gujarat-temples-kfrnlzp1vd.webp`,
  historyMain: `${LOCAL}/WhatsApp-Image-2025-08-25-at-10.37.02-AM.jpeg`,
  vadwala: `${LOCAL}/Vadwala_01.jpg`,
  gaushala: `${LOCAL}/WhatsApp-Image-2025-08-25-at-10.43.03-AM.jpeg`,
  school: `${LOCAL}/WhatsApp-Image-2025-08-25-at-4.35.13-PM-768x512.jpeg`,
  guru: `${LOCAL}/Guru-Purnima-202433.jpg`,
  holi: `${LOCAL}/Holi-Mahotsav-12.jpg`,
  janmashtami: `${LOCAL}/Janmashtami-Mahotsav37.jpg`,
  dipavali: `${LOCAL}/Dipavali-Mahotsave14.jpg`,
  aerial: `${LOCAL}/DJI_0010-Copy.jpg`,
};

const settingsDefaults = {
  siteName: 'શ્રી વડવાળા મંદિર દુધરેજધામ',
  siteNameEn: 'Shree Vadwala Mandir Dudhrejdham',
  logo: images.logo,
  tagline: 'ભગવાન ના દર્શન',
  introTitle: 'શ્રી વડવાળા મંદિર, દુધરેજધામની સામાજીક, ધાર્મિક અને શૈક્ષણિક પ્રવૃત્તિઓ',
  introContent: 'શ્રી વડવાળા મંદિર દુધરેજધામમાં અન્નક્ષેત્ર, ગૌશાળા, શૈક્ષણિક સેવા અને પર્વ ઉજવણી જેવી પ્રવૃત્તિઓ સતત ચાલે છે. દૈનિક દર્શનાર્થીઓ, સાધુ-સંતો અને સેવક સમાજ માટે આ ધામ શ્રદ્ધા અને સેવાનું કેન્દ્ર છે.',
  introImage: images.temple,
  donateCtaTitle: 'ડોનેશન માટે',
  donateCtaText: 'શ્રી વડવાળા મંદિર દુધરેજધામના અન્નક્ષેત્ર, ગૌશાળા, શિક્ષણ અને મંદિર સેવા કાર્યોમાં આપનો સહયોગ આપો.',
  trustNote: 'દાન કરતાં પહેલાં મંદિરના અધિકૃત સંપર્ક નંબર અથવા ઈમેઈલ દ્વારા વિગતો ચકાસી લેવી.',
  verificationContact: '96879 21008 / 98255 68108',
  liveDarshanUrl: 'https://dudhrejvadwala.com',
  navLinks: [
    { label: 'Home', url: '/', order: 1, isActive: true },
    { label: 'History', url: '/history', order: 2, isActive: true },
    { label: 'Gallery', url: '/gallery', order: 3, isActive: true },
    { label: 'Video', url: '/videos', order: 4, isActive: true },
    { label: 'Donate', url: '/donate', order: 5, isActive: true },
    { label: 'Contact', url: '/contact', order: 6, isActive: true },
  ],
  footerLinks: [
    { label: 'History', url: '/history', order: 1, isActive: true },
    { label: 'Gallery', url: '/gallery', order: 2, isActive: true },
    { label: 'Donate', url: '/donate', order: 3, isActive: true },
    { label: 'Contact', url: '/contact', order: 4, isActive: true },
  ],
  socialLinks: [
    { platform: 'Website', url: 'https://dudhrejvadwala.com', icon: 'Globe', isActive: true },
  ],
};

const banners = [
  {
    title: 'શ્રી વડવાળા મંદિર દુધરેજધામ',
    subtitle: 'ભગવાન ના દર્શન અને સેવાકાર્યનું પવિત્ર કેન્દ્ર',
    image: images.temple,
    ctaText: 'ઇતિહાસ વાંચો',
    ctaLink: '/history',
    order: 1,
  },
  {
    title: 'અન્નક્ષેત્ર : અભિયાગત સેવા',
    subtitle: 'દરરોજ ૨૪ કલાક પ્રસાદ સેવા, દર્શનાર્થીઓ અને સાધુ-સંતો માટે',
    image: `${LOCAL}/Dipavali-Mahotsave7.jpg`,
    ctaText: 'પ્રવૃત્તિઓ જુઓ',
    ctaLink: '/activities',
    order: 2,
  },
  {
    title: 'ગૌશાળા : ઉત્તમ ઓલાદનું રક્ષણ',
    subtitle: 'શ્રી વડવાળા મંદિર ગૌશાળા અને શ્રી વટેશ્વર ગૌશાળાની સેવા',
    image: images.gaushala,
    ctaText: 'સેવા જાણો',
    ctaLink: '/activities',
    order: 3,
  },
];

const historySections = [
  {
    title: 'અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી',
    content: 'શ્રી વડવાળા મંદિર દુધરેજધામ રબારી સમાજની ધર્મગુરુગાદી તરીકે આદરણીય સ્થાન ધરાવે છે. આ ધામ ભક્તિ, પરંપરા, સમાધિ સ્થાન, અન્નક્ષેત્ર અને સમાજસેવાના કાર્યોનું જીવંત કેન્દ્ર છે.',
    image: images.historyMain,
    order: 10,
  },
  {
    title: 'વડવાળા ધામ સંક્ષિપ્ત પરિચય',
    content: 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. સુરેન્દ્રનગર જિલ્લાના વઢવાણ તાલુકામાં સુરેન્દ્રનગરથી આશરે પાંચ કિલોમીટર દૂર દૂધરેજ ગામ આવેલું છે. અહીં શ્રીમદ્ભકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણાથી શ્રી વટપતિ, એટલે કે વડવાળા દેવ ભગવાનનું આશ્રમ સ્થાન આવેલ છે. તેમના આરાધ્ય દેવ અયોધ્યાપતિ ભગવાન શ્રી રામચંદ્રજી છે.',
    image: images.vadwala,
    order: 11,
  },
  {
    title: 'આશ્રમ અને મંદિર પરિસર',
    content: 'ઉન્મત્ત ગંગા, હાલની ઉમઈ નદીના ઉત્તર કિનારે આવેલ આ સુંદર ધામ પાસે દુગ્ધસર સરોવર છે. વિશાળ પટાંગણ, પવિત્ર વટવૃક્ષ અને મંદિર શ્રેણીથી આશ્રમ શોભે છે. પટાંગણની મધ્યમાં ભગવાન શ્રી વટપતિ રામનું ભવ્ય મંદિર છે, જે શિલ્પકલા અને કારીગરીનું સુંદર ઉદાહરણ છે.',
    image: images.temple,
    order: 12,
  },
  {
    title: 'વટવૃક્ષ અને સમાધિ સ્થાન',
    content: 'મંદિરની પૂર્વ તરફ વિશાળ વટવૃક્ષ દર્શન આપે છે. પરંપરા મુજબ આ વટવૃક્ષ આશ્રમના પ્રથમાચાર્ય શ્રી ષટપ્રજ્ઞ સ્વામીજીએ વડના દાતણથી ઉછેરેલું માનવામાં આવે છે. મંદિરની દક્ષિણ બાજુ શ્રી ષટપ્રજ્ઞ સ્વામીજીથી અત્યાર સુધીના આચાર્યશ્રીઓની સમાધિઓ આવેલી છે, જે આશ્રમની ઉજળી પરંપરાની સાક્ષી છે.',
    image: `${LOCAL}/Dipavali-Mahotsave3.jpg`,
    order: 13,
  },
  {
    title: 'ભંડાર, અન્નક્ષેત્ર અને ગૌશાળા',
    content: 'સમાધિસ્થાનની બાજુમાં ભંડાર આવેલ છે, જ્યાં માતા અન્નપૂર્ણા સદેહે વસતાં ગણાય છે. લાખો ભક્તોએ અહીં પ્રસાદ મેળવી ક્ષુધા તૃપ્ત કરી છે. ભંડારની બાજુમાં ગૌશાળા છે, જ્યાં ઉત્તમ ગાયોનો ઉછેર, ઘાસચારો, પાણી અને સેવા કરવામાં આવે છે.',
    image: images.gaushala,
    order: 14,
  },
  {
    title: 'યાત્રિક નિવાસ અને સંત સેવા',
    content: 'ગૌશાળાને અડીને આવેલી ઈમારતમાં યાત્રિકો માટે નિવાસની સગવડ છે. યાત્રાળુઓ માટે પાથરણ-પથારી વગેરે વ્યવસ્થા રાખવામાં આવે છે. સંતો, મહંતો અને સામાન્ય દર્શનાર્થીઓ માટે અહીં રહેવા, ભજનભાવ અને પ્રસાદની સગવડ ઉપલબ્ધ છે.',
    image: `${LOCAL}/D7A0046.jpg`,
    order: 15,
  },
  {
    title: 'ત્રણ પ્રવેશ દ્વાર',
    content: 'શ્રી દૂધરેજ વડવાળા મંદિર પૂર્વાભિમુખ છે. પૂર્વમાં સિંહદ્વાર, ઉત્તરમાં નંદીદ્વાર અને દક્ષિણમાં હસ્તિદ્વાર શોભે છે. આ ત્રણ દ્વારો કલા અને કારીગરીના ઉત્તમ નમૂનાઓ છે અને ભક્તોને ભગવાનના શરણમાં પ્રવેશનો માર્ગ આપે છે.',
    image: images.aerial,
    order: 16,
  },
  {
    title: 'પાંચ દેવોના દર્શન',
    content: 'સિંહદ્વારથી અંદર પ્રવેશતાં વિશાળ ચોક અને ઘૂમટ દર્શન આપે છે. અંદર પ્રવેશ કરતાં ડાબી તરફથી જમણી તરફ શ્રી દ્વારકાનાથજી, શ્રી વટનાથ, ભગવાન શ્રી રામચંદ્રજી, સ્વામી ષટપ્રજ્ઞદાસજી અને ભગવાન શ્રી શંકર એમ પાંચ દેવો બિરાજેલા છે.',
    image: `${LOCAL}/Guru-Purnima-20241.jpg`,
    order: 17,
  },
];

const acharyas = [
  { name: 'નીલકંઠ સ્વામી', order: 1, periodStart: '૧૪૦૪', periodEnd: '૧૪૨૪' },
  { name: 'રઘુનાથ સ્વામી', order: 2, periodStart: '૧૪૨૪', periodEnd: '' },
  { name: 'યાદવ સ્વામી', order: 3, periodStart: '', periodEnd: '' },
  { name: 'ષટપ્રજ્ઞદાસજી', order: 4, periodStart: '૧૫૮૦', periodEnd: '' },
  { name: 'લબ્ધરામજી', order: 5, periodStart: '૧૭૮૫', periodEnd: '' },
  { name: 'રત્નદાસજી', order: 6, periodStart: '', periodEnd: '૧૮૩૦' },
  { name: 'માનદાસજી', order: 7, periodStart: '૧૮૩૦', periodEnd: '' },
  { name: 'કૃષ્ણદાસજી', order: 8, periodStart: '', periodEnd: '' },
  { name: 'ઓધવદાસજી', order: 9, periodStart: '', periodEnd: '૧૮૦૭' },
  { name: 'ગોકુલદાસજી', order: 10, periodStart: '૧૮૦૭', periodEnd: '૧૮૦૭' },
  { name: 'ભાવદાસજી', order: 11, periodStart: '૧૮૦૭', periodEnd: '' },
  { name: 'ગુલાબદાસજી', order: 12, periodStart: '૧૮૧૧', periodEnd: '૧૮૧૩' },
  { name: 'કેવળદાસજી', order: 13, periodStart: '૧૮૧૩', periodEnd: '૧૮૯૮' },
  { name: 'મેઘદાસજી', order: 14, periodStart: '૧૮૨૬', periodEnd: '૧૮૨૭' },
  { name: 'યમુનાદાસજી', order: 15, periodStart: '૧૯૨૭', periodEnd: '૧૮૩૩' },
  { name: 'ગંગારામજી', order: 16, periodStart: '૧૮૩૩', periodEnd: '૧૮૪૭' },
  { name: 'ગોવિંદરામજી', order: 17, periodStart: '', periodEnd: '૧૮૫૪' },
  { name: 'રઘુવરદાસજી', order: 18, periodStart: '૧૮૫૫', periodEnd: '૧૮૮૦' },
  { name: 'જીવરામદાસજી', order: 19, periodStart: '', periodEnd: '' },
  { name: 'ગોમતીદાસજી', order: 20, periodStart: '', periodEnd: '' },
  { name: 'કલ્યાણદાસજી', order: 21, periodStart: '', periodEnd: '' },
  { name: 'કનીરામદાસજી', order: 22, periodStart: '૧૯૯૪', periodEnd: 'વિદ્યમાન' },
];

const galleryCategories = [
  { title: 'દીપાવલી મહોત્સવ', slug: 'dipavali', order: 1 },
  { title: 'જન્માષ્ટમી મહોત્સવ', slug: 'janmashtami', order: 2 },
  { title: 'ગુરુ પૂર્ણિમા', slug: 'guru-purnima', order: 3 },
  { title: 'હોળી મહોત્સવ', slug: 'holi', order: 4 },
];

const activities = [
  {
    title: 'અન્નક્ષેત્ર : અભિયાગત સેવા',
    slug: 'annakshetra',
    shortDescription: 'દરરોજ ૨૪ કલાક અન્નક્ષેત્ર',
    description: 'શ્રી વડવાળા મંદિર દુધરેજધામમાં દરરોજ ૨૪ કલાક અન્નક્ષેત્ર ચલાવવામાં આવે છે. દરરોજ આશરે ૧૦૦૦ થી ૧૫૦૦ દર્શનાર્થીઓ તેમજ સાધુ-સંતો ભોજન પ્રસાદ ગ્રહણ કરે છે.',
    icon: 'Utensils',
    category: 'seva',
    isFeatured: true,
    image: images.temple,
    order: 1,
  },
  {
    title: 'ગૌશાળા : ઉત્તમ ઓલાદનું રક્ષણ',
    slug: 'gaushala',
    shortDescription: 'ગાયોનો ઉછેર અને સેવા',
    description: 'શ્રી વડવાળા મંદિર દુધરેજધામ દ્વારા ઉત્તમ ઓલાદના રક્ષણ માટે શ્રી વડવાળા મંદિર ગૌશાળા અને શ્રી વટેશ્વર ગૌશાળા - જેગડવા ચલાવવામાં આવે છે.',
    icon: 'Heart',
    category: 'seva',
    isFeatured: true,
    image: images.gaushala,
    order: 2,
  },
  {
    title: 'શૈક્ષણિક કાર્ય : કુમાર છાત્રાલય, કન્યા છાત્રાલય, હાઈસ્કુલ',
    slug: 'education',
    shortDescription: 'છાત્રાલય અને વિદ્યાલય સેવા',
    description: 'શ્રી વડવાળા મંદિર દુધરેજધામ દ્વારા સદગુરૂ શ્રી ગોમતીદાસબાપુ કુમાર છાત્રાલય, સદગુરૂ શ્રી કલ્યાણદાસબાપુ કન્યા છાત્રાલય અને શ્રી વડવાળા દેવ સરસ્વતી વિદ્યાલય ચલાવવામાં આવે છે.',
    icon: 'GraduationCap',
    category: 'education',
    isFeatured: true,
    image: images.school,
    order: 3,
  },
  {
    title: 'પર્વ ઉજવણી : જન્માષ્ટમી, દિપાવલી, હોળી-ધૂળેટી અને ગુરુ પૂર્ણિમા',
    slug: 'festivals',
    shortDescription: 'મુખ્ય પર્વોની ભવ્ય ઉજવણી',
    description: 'જન્માષ્ટમી, દિપાવલી, હોળી-ધૂળેટી અને ગુરુ પૂર્ણિમા જેવા પાવન પ્રસંગોમાં અંદાજીત ૨ થી ૩ લાખ શ્રદ્ધાળુઓ દર્શનાર્થે આવે છે. રહેવા તથા જમવાની વ્યવસ્થા મંદિર દ્વારા કરવામાં આવે છે.',
    icon: 'Sparkles',
    category: 'festival',
    isFeatured: true,
    image: images.guru,
    order: 4,
  },
  {
    title: 'ધર્મશાળા સેવા',
    slug: 'dharmshala',
    shortDescription: 'સેવક સમાજ માટે ધર્મશાળા',
    description: 'આ સંસ્થા દ્વારા ભારતના પવિત્ર સ્થળોમાં સેવક સમાજ માટે શ્રી રઘુવિર ધામ - ડાકોર અને શ્રી કલ્યાણ ગુરૂધામ - જુનાગઢ જેવી ધર્મશાળા સેવાઓ ચલાવવામાં આવે છે.',
    icon: 'Home',
    category: 'seva',
    isFeatured: false,
    image: images.vadwala,
    order: 5,
  },
  {
    title: 'મહાકુંભ અને આપાતકાલીન સેવા',
    slug: 'mahakumbh-seva',
    shortDescription: 'અન્નક્ષેત્ર, વસ્ત્રદાન અને અન્નદાન',
    description: 'બાર બાર વર્ષે આવતા મહાકુંભ પર્વમાં ઉજ્જૈન, નાસિક, પ્રયાગરાજ અને હરિદ્વારમાં અન્નક્ષેત્ર સેવા કરવામાં આવે છે. આપાતકાળે વસ્ત્રદાન, અન્નદાન અને અન્ય સેવાકાર્યો કરવામાં આવે છે.',
    icon: 'HandHeart',
    category: 'seva',
    isFeatured: false,
    image: images.holi,
    order: 6,
  },
];

const festivals = [
  { title: 'હોળી મહોત્સવ સ્થાપના દિન', description: 'હોળીનો પવિત્ર ઉત્સવ અને મંદિરનો સ્થાપના દિવસ.', image: images.holi, order: 1 },
  { title: 'ગુરુપૂર્ણિમા મહોત્સવ', description: 'ગુરુજનોનું પૂજન, વંદન અને પરંપરાનો સ્મરણ.', image: images.guru, order: 2 },
  { title: 'જન્માષ્ટમી મહોત્સવ', description: 'જન્માષ્ટમી પર્વની ભવ્ય ઉજવણી અને દર્શન.', image: images.janmashtami, order: 3 },
  { title: 'દિપાવલી પર્વ', description: 'દિપાવલી પર્વ નિમિત્તે ધામમાં ભવ્ય ઉજવણી.', image: images.dipavali, order: 4, isUpcoming: true, date: new Date('2026-11-08') },
  { title: 'આવનાર ઉત્સવ : દિપાવલી', description: 'તિથિ: આસો વદ ૧૪.', image: images.dipavali, order: 5, isUpcoming: true },
  { title: 'આવનાર ઉત્સવ : હોળી મહોત્સવ સ્થાપના દિવસ', description: 'તિથિ: ફાગણ સુદ પુનમ.', image: images.holi, order: 6, isUpcoming: true },
];

const donationItems = [
  { title: 'અન્નક્ષેત્ર દાન', description: 'દૈનિક અન્નક્ષેત્ર અને પ્રસાદ સેવાના સંચાલન માટે દાન.', icon: 'Utensils', order: 1 },
  { title: 'ગૌશાળા દાન', description: 'ગાયોની સેવા, ઘાસચારો અને ગૌશાળા સંભાળ માટે દાન.', icon: 'Heart', order: 2 },
  { title: 'શૈક્ષણિક દાન', description: 'વિદ્યાર્થીઓ, છાત્રાલય અને વિદ્યાલય સેવાઓ માટે દાન.', icon: 'GraduationCap', order: 3 },
  { title: 'મંદિર સેવા', description: 'મંદિર જાળવણી, યાત્રિક સેવા અને ધાર્મિક પ્રવૃત્તિઓ માટે દાન.', icon: 'Building', order: 4 },
];

const paymentInfo = [
  {
    type: 'qr',
    label: 'Dudhrej Vadwala Donation QR',
    details: 'ડોનેશન માટે અધિકૃત QR કોડ સ્કેન કરો. ચુકવણી કરતાં પહેલાં મંદિર સંપર્ક દ્વારા વિગતો ચકાસી લેવી.',
    qrImage: images.qr,
    order: 1,
  },
  {
    type: 'bank',
    label: 'ચકાસણી માટે સંપર્ક',
    details: 'Phone: 96879 21008 / 98255 68108\nEmail: dudhrejvadwala@gmail.com\nWebsite: https://dudhrejvadwala.com',
    order: 2,
  },
];

const contactDefaults = {
  address: 'શ્રી વડવાળા મંદિર દુધરેજધામ દુધરેજ સુરેન્દ્રનગર (ગુજરાત) - 363040',
  phones: ['96879 21008', '98255 68108'],
  emails: ['dudhrejvadwala@gmail.com'],
  website: 'https://dudhrejvadwala.com',
  socialLinks: [{ platform: 'Website', url: 'https://dudhrejvadwala.com', icon: 'Globe', isActive: true }],
};

const seoItems = [
  { pageSlug: 'home', title: 'શ્રી વડવાળા મંદિર દુધરેજધામ', description: 'શ્રી વડવાળા મંદિર દુધરેજધામની અધિકૃત વેબસાઈટ, દર્શન, સેવા, ગેલેરી અને સંપર્ક માહિતી.' },
  { pageSlug: 'history', title: 'ઇતિહાસ - શ્રી વડવાળા મંદિર', description: 'વડવાળા ધામનો ઇતિહાસ, મંદિર પરંપરા અને આચાર્યશ્રી પરંપરા.' },
  { pageSlug: 'gallery', title: 'ફોટો ગેલેરી - શ્રી વડવાળા મંદિર', description: 'દીપાવલી, જન્માષ્ટમી, ગુરુ પૂર્ણિમા અને હોળી મહોત્સવની ફોટો ગેલેરી.' },
  { pageSlug: 'videos', title: 'વિડીયો - શ્રી વડવાળા મંદિર', description: 'શ્રી વડવાળા મંદિર દુધરેજધામના વિડીયો અને દર્શન.' },
  { pageSlug: 'donate', title: 'દાન - શ્રી વડવાળા મંદિર', description: 'શ્રી વડવાળા મંદિરના સેવાકાર્યો માટે દાનની માહિતી.' },
  { pageSlug: 'contact', title: 'સંપર્ક - શ્રી વડવાળા મંદિર', description: 'સરનામું, ફોન, ઈમેઈલ અને સંપર્ક ફોર્મ.' },
  { pageSlug: 'activities', title: 'પ્રવૃત્તિઓ - શ્રી વડવાળા મંદિર', description: 'અન્નક્ષેત્ર, ગૌશાળા, શિક્ષણ અને ધાર્મિક સેવા પ્રવૃત્તિઓ.' },
  { pageSlug: 'gaushala', title: 'શ્રી શીતલ ગૌશાળા - દુધરેજ વડવાળા ધામ', description: 'શ્રી શીતલ ગૌશાળા, ગીર ગાય સેવા, ગૌ રક્ષા અને ગૌ સેવાની પ્રવૃત્તિઓ – દુધરેજ વડવાળા ધામ.' },
  { pageSlug: 'guru-kaniram-bapu', title: 'મહંત શ્રી કનીરામદાસજી બાપુ – શ્રી વડવાળા મંદિર દુધરેજધામ', description: 'પરમ પૂજ્ય મહામંડલેશ્વર શ્રી કનીરામદાસજી બાપુ, રબારી સમાજના ધર્મગુરુ, શ્રી વડવાળા મંદિર દુધરેજધામના મહંત.' },
  { pageSlug: 'guru-mukundram-bapu', title: 'કોઠારી શ્રી મુકુંદરામ બાપુ – શ્રી વડવાળા મંદિર દુધરેજધામ', description: 'કોઠારી શ્રી મુકુંદરામ બાપુ, શ્રી વડવાળા મંદિર દુધરેજધામના કોઠારી અને વહીવટી વડા.' },
];

const gaushalaDefaults = {
  heroEyebrow: 'GAU SEVA',
  heroTitle: 'શ્રી શીતલ ગૌશાળા – દુધરેજ વડવાળા ધામ',
  heroSubtitle: 'Shree Shital Gaushala – Dudhrej Vadvala Dham | Gir Cow Gaushala Surendranagar, Gujarat',
  introTexts: [
    'શ્રી વડવાળા મંદિર દુધરેજધામ (Shri Vadvala Mandir Dudhrejdham) ની પાવન ભૂમિ પર સ્થિત શ્રી શીતલ ગૌશાળા (Shree Shital Gaushala) એ ગૌ માતાની સેવા, રક્ષા અને ઉત્તમ ગીર ગાય (Gir Cow) ની ઓલાદના સંવર્ધન માટે સમર્પિત એક અનોખું સેવાકેન્દ્ર છે. આ ગૌશાળા મહામંડલેશ્વર શ્રી કાનિરામદાસજી બાપુ (Mahamandaleshwar Shree Kaniramdasji Bapu) ના આશીર્વાદ અને માર્ગદર્શનથી સ્થાપવામાં આવી છે.',
    '"શીતલ" નામ બાપુશ્રીની અત્યંત વહાલસોયી ગાયના નામ પરથી રાખવામાં આવ્યું છે, જે ગૌલોક સિધાવી ગયા હતાં. તેમની સ્મૃતિમાં આ ભવ્ય ગૌશાળા ઊભી કરવામાં આવી છે – જ્યાં ગૌ સેવા એ જ નારાયણ સેવા ની ભાવના સાથે દરેક ગાયની સેવા-ચાકરી થાય છે.',
  ],
  visionEyebrow: 'દ્રષ્ટિ અને પ્રેરણા',
  visionHeading: 'અમારું દ્રષ્ટિકોણ અને પ્રેરણા',
  visionTexts: [
    'શ્રી વડવાળા મંદિર દુધરેજધામનો ગૌ સેવા સાથેનો નાતો સદીઓ જૂનો છે. આ ૫૪૫ વર્ષ જૂના પ્રાચીન ધામમાં ગાયોની સેવા સદાય પ્રાથમિકતા રહી છે. મહામંડલેશ્વર શ્રી કાનિરામદાસજી બાપુના ગૌ માતા પ્રત્યેના ગાઢ પ્રેમ અને સમર્પણ ભાવથી આ ગૌશાળાનું નિર્માણ થયું.',
    'તેમની પ્રેરણાથી દુધરેજ ખાતે અગાઉ શ્રી વડવાળા મંદિર ગૌશાળા તેમજ જેગડવા ખાતે શ્રી વટેશ્વર ગૌશાળા (Vateshwar Gaushala) ચાલે છે, જ્યાં ૭૫૦ થી ૮૦૦ જેટલી શુદ્ધ ગીર ગાયોનો ઉછેર થાય છે. હવે શ્રી શીતલ ગૌશાળા આ પરંપરામાં એક નવું ગૌરવ ઉમેરે છે.',
    'ગૌ માતાની સેવા એ જ ભગવાનની સેવા – આ ભાવના સાથે શુદ્ધ ગીર ઓલાદનું જતન, બીમાર-ત્યક્ત ગાયોનો આશ્રય અને સાત્ત્વિક ગૌ ઉત્પાદનોનું સંવર્ધન આ ગૌશાળાનું મુખ્ય લક્ષ્ય છે.',
  ],
  quote: 'ગૌ માતાની સેવા કરવી એ સાક્ષાત નારાયણની સેવા છે. જે ધામમાં ગૌ સેવા થાય, ત્યાં ભગવાન સદાય વિરાજમાન રહે છે.',
  quoteCite: '— શ્રી વડવાળા ધામની ગૌ સેવા પરંપરા',
  values: [
    { icon: 'shield', label: 'ગૌ રક્ષા' },
    { icon: 'spa', label: 'સાત્ત્વિક સેવા' },
    { icon: 'psychiatry', label: 'શુદ્ધતા અને કરુણા' },
    { icon: 'diversity_3', label: 'સમાજ સેવા' },
  ],
  facilitiesEyebrow: 'ગૌ સેવા',
  facilitiesHeading: 'સુવિધાઓ અને ગૌ સેવા',
  facilityTexts: [
    'શ્રી શીતલ ગૌશાળામાં મુખ્યત્વે શુદ્ધ ગીર ગાયોનો ઉછેર કરવામાં આવે છે. આધુનિક અને વિશાળ ગૌશાળા પરિસરમાં ગાયો માટે સ્વચ્છ, હવાઉજાસવાળા છાપરા, કુદરતી વાતાવરણ અને પૂરતી ચરવાની જગ્યા છે.',
    'પ્રશિક્ષિત સેવાદારો અને સાધુ-સંતો દ્વારા દરરોજ ગાયોની સેવા-ચાકરી, ચારો-પાણી, સ્વચ્છતા અને આરોગ્ય ચકાસણી – બધું જ ભક્તિભાવ સાથે થાય છે.',
  ],
  sevaItems: [
    { icon: 'grass', label: 'નિયમિત ચારો અને પાણીની ઉત્તમ વ્યવસ્થા' },
    { icon: 'medical_services', label: 'પ્રશિક્ષિત ડોક્ટર દ્વારા આરોગ્ય ચકાસણી' },
    { icon: 'cleaning_services', label: 'સ્વચ્છ અને હવાઉજાસવાળા આધુનિક છાપરા' },
    { icon: 'pets', label: 'શુદ્ધ ગીર ગાયોના સંવર્ધનનો વિશેષ કાર્યક્રમ' },
    { icon: 'volunteer_activism', label: 'સેવાદારો અને સંતો દ્વારા ભક્તિભાવપૂર્ણ દૈનિક સેવા' },
    { icon: 'nature', label: 'કુદરતી વાતાવરણ અને પૂરતી ચરવાની જગ્યા' },
  ],
  eventsEyebrow: 'ઉત્સવો',
  eventsHeading: 'મહોત્સવો અને શીતલ ગૌશાળા',
  eventTexts: [
    'શ્રી વડવાળા મંદિર દુધરેજધામમાં હોળી મહોત્સવ (સ્થાપના દિન), જન્માષ્ટમી, દિપાવલી અને ગુરુ પૂર્ણિમા જેવા ભવ્ય પર્વો ઉજવાય છે, જ્યાં લાખો ભક્તો દર્શનાર્થે આવે છે. આ પ્રસંગોમાં ગૌ સેવા અને ગૌશાળાની પ્રવૃત્તિઓ વિશેષ રીતે ઉજાગર થાય છે.',
    'માર્ચ ૨૦૨૬ માં હોળી મહોત્સવના પાવન પ્રસંગે શ્રી શીતલ ગૌશાળાનું ભવ્ય લોકાર્પણ કરવામાં આવ્યું. આ મહત્ત્વપૂર્ણ અવસરે પૂજ્ય મોરારી બાપુ (Morari Bapu), અનેક મહામંડલેશ્વરો, સંત-મહાત્માઓ અને લાખો શ્રદ્ધાળુઓની ઉપસ્થિતિમાં ગૌશાળાનું ઉદ્ઘાટન થયું.',
  ],
  eventHighlight: {
    title: 'હોળી મહોત્સવ ૨૦૨૬ – શીતલ ગૌશાળા લોકાર્પણ',
    description: 'પૂજ્ય મોરારી બાપુ, ૨૫૦+ સંત-મહાત્માઓ અને લાખો ભક્તોની ઉપસ્થિતિમાં ભવ્ય ઉદ્ઘાટન',
  },
  eventFooterText: 'ધામમાં ૨૪ કલાક ચાલતું અન્નક્ષેત્ર (Annakshetra) અને ભોજનાલય ભક્તોને પ્રસાદી અને આધ્યાત્મિક પ્રેરણા આપે છે. ગૌશાળા દર્શન સાથે અન્નક્ષેત્રનો લાભ લેવા દૂર-દૂરથી ભક્તો આવે છે.',
  supportEyebrow: 'સહયોગ',
  supportHeading: 'ભક્તો કેવી રીતે સેવામાં જોડાઈ શકે?',
  supportTexts: [
    'ગૌ માતાની સેવામાં દરેક ભક્ત પોતાની શ્રદ્ધા અને શક્તિ મુજબ યોગદાન આપી શકે છે. નાનું-મોટું દરેક દાન ગૌ માતાના ભરણપોષણમાં મહત્ત્વપૂર્ણ ભૂમિકા ભજવે છે.',
    'શ્રી વડવાળા મંદિર દુધરેજધામ ના દર્શન વખતે શ્રી શીતલ ગૌશાળાની મુલાકાત લો અને શુદ્ધ ભાવના સાથે ગૌ સેવા કરો.',
  ],
  supportActions: [
    { icon: 'grass', label: 'ગૌ ચારા માટે દાન' },
    { icon: 'restaurant', label: 'એક દિવસના ગૌ ભોજનનો ખર્ચ ઉઠાવવો' },
    { icon: 'pets', label: 'એક ગાયની સંપૂર્ણ દેખરેખ માટે માસિક સેવા' },
    { icon: 'schedule', label: 'પ્રત્યક્ષ સેવા માટે સમય આપવો' },
    { icon: 'favorite', label: 'વાર્ષિક ગૌ પૂજા કે વિશેષ અવસરે દાન' },
  ],
  ctaTitle: 'ગૌ સેવામાં જોડાઓ',
  ctaText: 'આપનું નાનામાં નાનું યોગદાન પણ ગૌ માતાના જીવનમાં મોટો ફરક લાવી શકે છે. સેવા, દાન કે સ્વયંસેવક તરીકે જોડાવા સંપર્ક કરો.',
  locationEyebrow: 'સ્થળ',
  locationHeading: 'સ્થળ અને મુલાકાત માહિતી',
  locationTexts: [
    'શ્રી શીતલ ગૌશાળા, શ્રી વડવાળા મંદિર દુધરેજધામ, તાલુકા વઢવાણ, જિલ્લો સુરેન્દ્રનગર, ગુજરાત ખાતે આવેલી છે. સુરેન્દ્રનગર શહેરથી મુખ્ય હાઈવે પર સરળતાથી પહોંચી શકાય છે.',
  ],
  locationNote: 'ચોક્કસ દિશાનિર્દેશ, Google Maps લિંક અને સંપર્ક નંબરો વેબસાઈટના સંપર્ક વિભાગમાં ઉપલબ્ધ છે.',
  galleryEyebrow: 'ગેલેરી',
  galleryHeading: 'ફોટો અને વિડિયો ગેલેરી',
  gallerySub: 'શ્રી શીતલ ગૌશાળા અને ગૌ સેવાના દર્શન',
  photos: [
    { src: `${LOCAL}/WhatsApp-Image-2025-08-25-at-10.43.03-AM.jpeg`, alt: 'શ્રી શીતલ ગૌશાળા - Shree Shital Gaushala Dudhrej', caption: 'શ્રી શીતલ ગૌશાળાનું ભવ્ય પ્રવેશદ્વાર' },
    { src: `${LOCAL}/Guru-Purnima-202433.jpg`, alt: 'ગીર ગાયો - Pure Gir cows at Vadvala Mandir Gaushala', caption: 'શુદ્ધ ગીર ગાયો – ગૌશાળાનું ગૌરવ' },
    { src: `${LOCAL}/Holi-Mahotsav-12.jpg`, alt: 'હોળી મહોત્સવ - Holi Mahotsav Dudhrej Dham', caption: 'હોળી મહોત્સવ ૨૦૨૬ – લોકાર્પણ પ્રસંગ' },
    { src: `${LOCAL}/Dipavali-Mahotsave14.jpg`, alt: 'દિપાવલી ઉત્સવ - Diwali celebration Vadwala Mandir', caption: 'દિપાવલી પર્વ – ધામની ભવ્ય ઉજવણી' },
    { src: `${LOCAL}/DJI_0010-Copy.jpg`, alt: 'મંદિર પરિસર aerial - Vadvala Mandir Campus Aerial', caption: 'શ્રી વડવાળા મંદિર – એરિયલ દર્શન' },
    { src: `${LOCAL}/Vadwala_01.jpg`, alt: 'શ્રી વડવાળા મંદિર - Shri Vadwala Mandir Dudhrej', caption: 'શ્રી વડવાળા મંદિર દુધરેજધામ' },
  ],
  videos: [
    { title: 'શ્રી શીતલ ગૌશાળા લોકાર્પણ ઉત્સવ – દુધરેજ વડવાળા ધામ', embedId: 'UwU8bJoaGZQ' },
    { title: 'શ્રી વડવાળા મંદિર દુધરેજધામ – ગૌ સેવા દર્શન', embedId: 'TS-PdeHWWNU' },
    { title: 'વડવાળા ધામ ગૌશાળા – ગીર ગાયોની સેવા', embedId: 'Qysi2j732sI' },
    { title: 'દુધરેજ વડવાળા ધામ – ગૌ માતા દર્શન', embedId: 'J_DDBd8MtV8' },
    { title: 'શ્રી વડવાળા મંદિર – ગૌશાળા અને અન્નક્ષેત્ર', embedId: '9SXTXOuTyJk' },
  ],
  status: 'published',
};

function buildGalleryItems(categoriesBySlug) {
  const specs = [
    { slug: 'dipavali', label: 'દીપાવલી મહોત્સવ', prefix: 'Dipavali-Mahotsave', count: 23 },
    { slug: 'janmashtami', label: 'જન્માષ્ટમી મહોત્સવ', prefix: 'Janmashtami-Mahotsav', count: 49 },
    { slug: 'guru-purnima', label: 'ગુરુ પૂર્ણિમા', prefix: 'Guru-Purnima-2024', count: 37 },
    { slug: 'holi', label: 'હોળી મહોત્સવ', prefix: 'Holi-Mahotsav-', count: 45 },
  ];

  return specs.flatMap((spec) => Array.from({ length: spec.count }, (_, idx) => {
    const num = idx + 1;
    return {
      categoryId: categoriesBySlug[spec.slug]._id,
      title: `${spec.label} ${num}`,
      image: `${LOCAL}/${spec.prefix}${num}.jpg`,
      order: num,
      status: 'published',
    };
  }));
}

async function createIfMissing(Model, filter, doc) {
  const existing = await Model.findOne(filter);
  if (existing) return { item: existing, created: false };
  const item = await Model.create({ ...doc, status: doc.status || 'published' });
  return { item, created: true };
}

function fillMissingFields(target, defaults, fields) {
  let changed = false;
  fields.forEach((field) => {
    const current = target[field];
    const isEmptyArray = Array.isArray(current) && current.length === 0;
    if (current === undefined || current === null || current === '' || isEmptyArray) {
      target[field] = defaults[field];
      changed = true;
    }
  });
  return changed;
}

async function ensureSettings() {
  let settings = await Settings.findOne();
  if (!settings) {
    await Settings.create(settingsDefaults);
    return 1;
  }

  const changed = fillMissingFields(settings, settingsDefaults, [
    'siteName', 'siteNameEn', 'logo', 'tagline', 'introTitle', 'introContent',
    'introImage', 'donateCtaTitle', 'donateCtaText', 'trustNote',
    'verificationContact', 'liveDarshanUrl', 'navLinks', 'footerLinks', 'socialLinks',
  ]);
  if (changed) await settings.save();
  return changed ? 1 : 0;
}

async function ensureContact() {
  let contact = await Contact.findOne();
  if (!contact) {
    await Contact.create(contactDefaults);
    return 1;
  }

  const changed = fillMissingFields(contact, contactDefaults, [
    'address', 'phones', 'emails', 'website', 'socialLinks',
  ]);
  if (changed) await contact.save();
  return changed ? 1 : 0;
}

async function seedPublicContent(options = {}) {
  const log = options.log || (() => {});
  const stats = {};

  stats.settings = await ensureSettings();
  stats.contact = await ensureContact();

  for (const item of banners) {
    const result = await createIfMissing(Banner, { title: item.title }, item);
    stats.banners = (stats.banners || 0) + (result.created ? 1 : 0);
  }

  for (const item of historySections) {
    const result = await createIfMissing(HistorySection, { title: item.title }, item);
    stats.historySections = (stats.historySections || 0) + (result.created ? 1 : 0);
  }

  for (const item of acharyas) {
    const result = await createIfMissing(AcharyaParampara, { name: item.name }, item);
    stats.acharyaParampara = (stats.acharyaParampara || 0) + (result.created ? 1 : 0);
  }

  const categoriesBySlug = {};
  for (const item of galleryCategories) {
    const result = await createIfMissing(GalleryCategory, { slug: item.slug }, item);
    categoriesBySlug[item.slug] = result.item;
    stats.galleryCategories = (stats.galleryCategories || 0) + (result.created ? 1 : 0);
  }

  for (const item of buildGalleryItems(categoriesBySlug)) {
    const result = await createIfMissing(GalleryItem, { title: item.title, categoryId: item.categoryId }, item);
    stats.galleryItems = (stats.galleryItems || 0) + (result.created ? 1 : 0);
  }

  for (const item of activities) {
    const result = await createIfMissing(Activity, { slug: item.slug }, item);
    stats.activities = (stats.activities || 0) + (result.created ? 1 : 0);
  }

  for (const item of festivals) {
    const result = await createIfMissing(Festival, { title: item.title }, item);
    stats.festivals = (stats.festivals || 0) + (result.created ? 1 : 0);
  }

  for (const item of donationItems) {
    const result = await createIfMissing(DonationItem, { title: item.title }, item);
    stats.donationItems = (stats.donationItems || 0) + (result.created ? 1 : 0);
  }

  for (const item of paymentInfo) {
    const result = await createIfMissing(PaymentInfo, { label: item.label }, item);
    stats.paymentInfo = (stats.paymentInfo || 0) + (result.created ? 1 : 0);
  }

  // Seed real YouTube videos
  const videoSeeds = [
    { title: 'શ્રી શીતલ ગૌશાળા લોકાર્પણ ઉત્સવ – દુધરેજ વડવાળા ધામ', embedUrl: 'https://www.youtube.com/embed/UwU8bJoaGZQ', thumbnail: 'https://img.youtube.com/vi/UwU8bJoaGZQ/hqdefault.jpg', type: 'video', order: 1 },
    { title: 'શ્રી વડવાળા મંદિર દુધરેજધામ – ગૌ સેવા દર્શન', embedUrl: 'https://www.youtube.com/embed/TS-PdeHWWNU', thumbnail: 'https://img.youtube.com/vi/TS-PdeHWWNU/hqdefault.jpg', type: 'video', order: 2 },
    { title: 'વડવાળા ધામ ગૌશાળા – ગીર ગાયોની સેવા', embedUrl: 'https://www.youtube.com/embed/Qysi2j732sI', thumbnail: 'https://img.youtube.com/vi/Qysi2j732sI/hqdefault.jpg', type: 'video', order: 3 },
    { title: 'દુધરેજ વડવાળા ધામ – ગૌ માતા દર્શન', embedUrl: 'https://www.youtube.com/embed/J_DDBd8MtV8', thumbnail: 'https://img.youtube.com/vi/J_DDBd8MtV8/hqdefault.jpg', type: 'video', order: 4 },
    { title: 'શ્રી વડવાળા મંદિર – ગૌશાળા અને અન્નક્ષેત્ર', embedUrl: 'https://www.youtube.com/embed/9SXTXOuTyJk', thumbnail: 'https://img.youtube.com/vi/9SXTXOuTyJk/hqdefault.jpg', type: 'video', order: 5 },
  ];
  // Delete old broken videos and re-seed
  const existingCount = await Video.countDocuments();
  if (existingCount === 0) {
    for (const item of videoSeeds) {
      await Video.create({ ...item, status: 'published' });
    }
    stats.videos = videoSeeds.length;
  } else {
    // Fix any videos missing embedUrl
    const broken = await Video.countDocuments({ $or: [{ embedUrl: '' }, { embedUrl: { $exists: false } }, { embedUrl: /VIDEO_ID_/ }] });
    if (broken > 0) {
      await Video.deleteMany({});
      for (const item of videoSeeds) {
        await Video.create({ ...item, status: 'published' });
      }
      stats.videos = videoSeeds.length;
    } else {
      stats.videos = 0;
    }
  }

  const announcementResult = await createIfMissing(Announcement, { title: 'આવનાર ઉત્સવ ની યાદી' }, {
    title: 'આવનાર ઉત્સવ ની યાદી',
    content: 'દિપાવલી - આસો વદ ૧૪ | હોળી મહોત્સવ સ્થાપના દિવસ - ફાગણ સુદ પુનમ',
    type: 'festival',
    isActive: true,
    order: 1,
  });
  stats.announcements = announcementResult.created ? 1 : 0;

  for (const item of seoItems) {
    const result = await createIfMissing(Seo, { pageSlug: item.pageSlug }, item);
    stats.seo = (stats.seo || 0) + (result.created ? 1 : 0);
  }

  // Gaushala content
  const existingGaushala = await GaushalaContent.findOne();
  if (!existingGaushala) {
    await GaushalaContent.create(gaushalaDefaults);
    stats.gaushalaContent = 1;
  } else {
    stats.gaushalaContent = 0;
  }

  // ── Guru seed ──
  stats.gurus = 0;
  for (const guruData of guruSeeds) {
    const existing = await Guru.findOne({ slug: guruData.slug });
    if (!existing) {
      await Guru.create(guruData);
      stats.gurus++;
    } else {
      existing.full_name = guruData.full_name;
      existing.role_title = guruData.role_title;
      existing.short_title = guruData.short_title;
      existing.community_role = guruData.community_role;
      existing.biography_short = guruData.biography_short;
      existing.biography_full = guruData.biography_full;
      existing.teachings_themes = guruData.teachings_themes;
      existing.notable_quotes = guruData.notable_quotes;
      existing.seo_keywords = guruData.seo_keywords;
      existing.events = guruData.events;
      existing.images = guruData.images;
      existing.order = guruData.order;
      await existing.save();
    }
  }

  // Seeding TithiDay
  const tithiCount = await TithiDay.countDocuments();
  if (tithiCount === 0) {
    await TithiDay.insertMany(tithiSeeds);
    stats.tithiDays = tithiSeeds.length;
  } else {
    stats.tithiDays = 0;
  }

  log(`Public content seed checked: ${JSON.stringify(stats)}`);
  return stats;
}

// ═══════════════════════════════════════════════════════════════
// GURU SEED DATA
// ═══════════════════════════════════════════════════════════════

const GURU_IMG = '/uploads/gurus';

const guruSeeds = [
  // ── Mahant Shri Kaniram Bapu ──
  {
    slug: 'kaniram-bapu',
    full_name: 'પરમ પૂજ્ય ૧૦૦૮ મહામંડલેશ્વર શ્રી કનીરામદાસજી બાપુ',
    role_title: 'મહંત અને મહામંડલેશ્વર, શ્રી વડવાળા મંદિર, દુધરેજધામ',
    short_title: 'મહંત શ્રી કનીરામ બાપુ',
    community_role: 'રબારી / માલધારી સમાજના ધર્મગુરુ',
    key_associated_temple: 'શ્રી વડવાળા મંદિર, દુધરેજધામ',
    birth_date: null,
    birthplace: null,
    biography_short: 'પરમ પૂજ્ય મહામંડલેશ્વર શ્રી કનીરામદાસજી બાપુ, શ્રી વડવાળા મંદિર દુધરેજધામના ૨૨મા ગાદીપતિ, રબારી-માલધારી સમાજના આદરણીય ધર્મગુરુ છે. ધર્મ, સેવા, ગૌરક્ષા અને શિક્ષણ જેવા ક્ષેત્રોમાં તેમનું યોગદાન અમૂલ્ય છે.',
    biography_full: `<h3>પ્રારંભિક જીવન / Early Life</h3>
<p>પરમ પૂજ્ય ૧૦૦૮ મહામંડલેશ્વર શ્રી કનીરામદાસજી બાપુ (Param Pujya 1008 Mahamandaleshwar Shree Kaniramdas Bapu) એ શ્રી વડવાળા મંદિર દુધરેજધામ (Shree Vadvala Mandir Dudhrejdham) ની ગૌરવશાળી આચાર્ય પરંપરાના ૨૨મા ગાદીપતિ છે. ગુરુ કૃપા અને ભક્તિના માર્ગે ચાલી, તેમણે નાનપણથી જ આધ્યાત્મિક જીવનને સમર્પિત કર્યું.</p>

<h3>આધ્યાત્મિક સફર / Spiritual Journey</h3>
<p>૧૯૯૪ (વિ.સં.) થી વડવાળા ધામની ગાદી પર બિરાજમાન થયા પછી, શ્રી કનીરામદાસજી બાપુએ ધામની ધાર્મિક, સામાજિક અને શૈક્ષણિક પ્રવૃત્તિઓને નવી ઊંચાઈ પર લઈ ગયા. તેમના નેતૃત્વમાં ધામ રબારી-માલધારી સમાજની ધર્મગુરુગાદી (Dharm Guru Gadi) તરીકે સમગ્ર ભારતમાં પ્રસિદ્ધ થયું.</p>
<p>મહામંડલેશ્વર (Mahamandaleshwar) ની ઉપાધિ ધરાવતા શ્રી કનીરામ બાપુ શંકરાચાર્ય પરંપરાના વારસાને જીવંત રાખનાર મહાન સંત છે. તેમના આશીર્વાદ મેળવવા માટે ગુજરાત, રાજસ્થાન, મધ્ય પ્રદેશ અને ભારતભરમાંથી ભક્તો આવે છે.</p>

<h3>વડવાળા મંદિર ખાતે સેવા / Service at Vadvala Mandir, Dudhrej</h3>
<p>બાપુશ્રીના માર્ગદર્શન હેઠળ અનેક મહત્વપૂર્ણ સેવાકાર્યો ચાલે છે:</p>
<ul>
  <li><strong>૨૪ કલાક અન્નક્ષેત્ર:</strong> દરરોજ ૧,૦૦૦ થી ૧,૫૦૦ દર્શનાર્થીઓ, સાધુ-સંતો અને યાત્રાળુઓને ભોજન પ્રસાદ.</li>
  <li><strong>ગૌશાળા સેવા:</strong> શ્રી વડવાળા મંદિર ગૌશાળા, શ્રી વટેશ્વર ગૌશાળા (જેગડવા) અને તાજેતરમાં સ્થપાયેલી શ્રી શીતલ ગૌશાળા (Shree Shital Gaushala) દ્વારા ૭૫૦+ શુદ્ધ ગીર ગાયોનો ઉછેર.</li>
  <li><strong>શૈક્ષણિક કાર્ય:</strong> સદ્ગુરૂ શ્રી ગોમતીદાસબાપુ કુમાર છાત્રાલય, સદ્ગુરૂ શ્રી કલ્યાણદાસબાપુ કન્યા છાત્રાલય અને શ્રી વડવાળાદેવ સરસ્વતી વિદ્યાલયનું સંચાલન.</li>
  <li><strong>ધર્મશાળા સેવા:</strong> ડાકોર (શ્રી રઘુવિર ધામ) અને જુનાગઢ (શ્રી કલ્યાણ ગુરૂધામ) ખાતે ધર્મશાળાઓનું સંચાલન.</li>
  <li><strong>મહાકુંભ સેવા:</strong> ઉજ્જૈન, નાસિક, પ્રયાગરાજ અને હરિદ્વારમાં મહાકુંભ પર્વે અન્નક્ષેત્ર અને વસ્ત્રદાન.</li>
</ul>

<h3>ઉપદેશ અને સંદેશ / Teachings and Message</h3>
<p>બાપુશ્રી ધર્મ, સંસ્કાર, શિક્ષણ અને વ્યસનમુક્તિના સંદેશનો પ્રચાર કરે છે. તેમનું માનવું છે કે ગૌ સેવા, અન્ન સેવા અને વિદ્યાદાન એ જ સાચી ભક્તિ છે. ગુરુ પૂર્ણિમા, જન્માષ્ટમી, દિપાવલી અને હોળી-ધૂળેટી જેવા પર્વોમાં ૨ થી ૩ લાખ ભક્તો ધામમાં દર્શનાર્થે આવે છે, જે તેમની અપાર લોકપ્રિયતા અને પ્રભાવનું પ્રતીક છે.</p>`,
    teachings_themes: [
      'ધર્મ અને સંસ્કાર (Dharma and Sanskar)',
      'શિક્ષણ અને વ્યસનમુક્તિ (Education and staying away from addictions)',
      'ગૌરક્ષા અને ગૌ સેવા (Cow protection – Gauraksha)',
      'અન્ન સેવા અને સમાજ સેવા (Service to society)',
      'આધ્યાત્મિક જાગૃતિ (Spiritual awakening)',
    ],
    notable_quotes: [
      'ગૌ માતાની સેવા કરવી એ સાક્ષાત નારાયણની સેવા છે.',
      'ધર્મ, શિક્ષણ અને સેવા – આ ત્રણ જ સમાજ ઉત્થાનના આધારસ્તંભ છે.',
    ],
    seo_keywords: [
      'Mahant Kaniram Bapu', 'Kaniram Bapu Dudhrej', 'Mahamandaleshwar Kaniram',
      'કનીરામ બાપુ', 'વડવાળા ધામ', 'દુધરેજ મહંત', 'Rabari Samaj Guru',
      'Vadvala Mandir Mahant', 'Dudhrej Dham Guru', 'મહામંડલેશ્વર કનીરામ બાપુ',
    ],
    events: [
      { year_or_date: '૧૯૯૪ (વિ.સં.)', title: 'ગાદીપતિ પદ ગ્રહણ', description: 'શ્રી વડવાળા મંદિર દુધરેજધામના ૨૨મા ગાદીપતિ તરીકે પદ ગ્રહણ કર્યું.', sort_order: 1 },
      { year_or_date: 'દર વર્ષે', title: 'ગુરુ પૂર્ણિમા મહોત્સવ', description: 'દર વર્ષે ગુરુ પૂર્ણિમાના પાવન પ્રસંગે ૨-૩ લાખ ભક્તો ધામમાં દર્શનાર્થે આવે છે. સંતવાણી, ગુરુ વંદના અને ભંડારાનું ભવ્ય આયોજન.', sort_order: 2 },
      { year_or_date: 'દર વર્ષે', title: 'જન્માષ્ટમી, દિપાવલી અને હોળી મહોત્સવ', description: 'ધામમાં ભક્તિભાવ અને ભવ્યતાથી ઉજવાતા મુખ્ય ધાર્મિક પર્વો, જ્યાં લાખો શ્રદ્ધાળુઓ ભાગ લે છે.', sort_order: 3 },
      { year_or_date: 'ચાલુ', title: 'ગૌશાળા સ્થાપના અને વિસ્તરણ', description: 'શ્રી વડવાળા મંદિર ગૌશાળા, શ્રી વટેશ્વર ગૌશાળા (જેગડવા) અને શ્રી શીતલ ગૌશાળાની સ્થાપના – ૭૫૦+ ગીર ગાયોનો ઉછેર.', sort_order: 4 },
      { year_or_date: 'માર્ચ ૨૦૨૬', title: 'શ્રી શીતલ ગૌશાળા લોકાર્પણ', description: 'હોળી મહોત્સવ ૨૦૨૬ના પાવન પ્રસંગે પૂજ્ય મોરારી બાપુ, જગદ્ગુરુ શંકરાચાર્ય, ૨૫૦+ મહામંડલેશ્વરો અને લાખો ભક્તોની ઉપસ્થિતિમાં ભવ્ય ઉદ્ઘાટન.', sort_order: 5 },
      { year_or_date: 'ચાલુ', title: 'શૈક્ષણિક અને સામાજિક સેવા', description: 'કુમાર છાત્રાલય, કન્યા છાત્રાલય, વિદ્યાલય અને ધર્મશાળાઓનું સંચાલન.', sort_order: 6 },
      { year_or_date: 'દર ૧૨ વર્ષે', title: 'મહાકુંભ સેવા', description: 'ઉજ્જૈન, નાસિક, પ્રયાગરાજ અને હરિદ્વારમાં મહાકુંભ પર્વે ભવ્ય અન્નક્ષેત્ર, વસ્ત્રદાન અને સાધુ-સંતોની સેવા.', sort_order: 7 },
    ],
    images: [
      { image_url: '', storage_key: `${GURU_IMG}/kaniram-bapu-01.jpg`, alt_text: 'મહંત શ્રી કનીરામ બાપુ – Mahant Shri Kaniram Bapu', caption: 'મહામંડલેશ્વર શ્રી કનીરામદાસજી બાપુ', is_primary: true, sort_order: 1 },
      { image_url: '', storage_key: `${GURU_IMG}/kaniram-bapu-02.jpg`, alt_text: 'મહંત શ્રી કનીરામ બાપુ ગૌસેવા દર્શન', caption: 'ગૌસેવા દર્શન – ગીર ગાયો સાથે', is_primary: false, sort_order: 2 },
      { image_url: '', storage_key: `${GURU_IMG}/kaniram-bapu-03.jpg`, alt_text: 'પૂજ્ય કનીરામ બાપુશ્રી', caption: 'પૂજ્ય બાપુશ્રી – શ્રી વડવાળા ધામ', is_primary: false, sort_order: 3 },
      { image_url: '', storage_key: `${GURU_IMG}/kaniram-bapu-04.jpg`, alt_text: 'કનીરામ બાપુ યાત્રા', caption: 'દૈનિક મંગલ પ્રવાસ અને મુલાકાત', is_primary: false, sort_order: 4 },
      { image_url: '', storage_key: `${GURU_IMG}/kaniram-bapu-05.jpg`, alt_text: 'કનીરામ બાપુ ગૌશાળા', caption: 'ગૌશાળા પરિસરમાં ગૌમાતા સાથે', is_primary: false, sort_order: 5 },
    ],
    order: 1,
  },

  // ── Kothari Shri Mukundram Bapu ──
  {
    slug: 'mukundram-bapu',
    full_name: 'કોઠારી શ્રી મુકુંદરામ બાપુ',
    role_title: 'કોઠારી, શ્રી વડવાળા મંદિર, દુધરેજધામ',
    short_title: 'કોઠારી શ્રી મુકુંદરામ બાપુ',
    community_role: 'કોઠારી અને મંદિરના વહીવટી વડા',
    key_associated_temple: 'શ્રી વડવાળા મંદિર, દુધરેજધામ',
    birth_date: null,
    birthplace: null,
    biography_short: 'કોઠારી શ્રી મુકુંદરામ બાપુ, શ્રી વડવાળા મંદિર દુધરેજધામના કોઠારી અને વહીવટી વડા છે. ધામના ભંડાર, અન્નક્ષેત્ર, ગૌશાળા અને દૈનિક વ્યવસ્થાપનનું સંચાલન તેમના હસ્તક છે.',
    biography_full: `<h3>ભૂમિકા અને જવાબદારી / Role and Responsibility</h3>
<p>કોઠારી શ્રી મુકુંદરામ બાપુ (Kothari Shree Mukundram Bapu) શ્રી વડવાળા મંદિર દુધરેજધામના કોઠારી (Kothari) છે. "કોઠારી" એ મંદિરની વહીવટી અને સેવાકીય વ્યવસ્થાના મુખ્ય સંચાલક પદ છે. ભંડાર (Bhandar), અન્નક્ષેત્ર (Annakshetra) અને મંદિરની દૈનિક કામગીરીનું સંપૂર્ણ સંચાલન તેમના માર્ગદર્શન હેઠળ ચાલે છે.</p>

<h3>વડવાળા મંદિર ખાતે સેવા / Service at Vadvala Mandir</h3>
<p>મહામંડલેશ્વર શ્રી કનીરામદાસજી બાપુના આશીર્વાદ અને માર્ગદર્શન હેઠળ, શ્રી મુકુંદરામ બાપુ ધામની વિશાળ સેવાકીય વ્યવસ્થાનું સંચાલન કરે છે:</p>
<ul>
  <li><strong>ભંડાર સેવા:</strong> ધામના ભંડારમાં માતા અન્નપૂર્ણા સદેહે વસે છે એવી શ્રદ્ધા છે. દરરોજ હજારો ભક્તોને પ્રસાદ વિતરણનું કાર્ય.</li>
  <li><strong>અન્નક્ષેત્ર સંચાલન:</strong> ૨૪ કલાક ચાલતા અન્નક્ષેત્રનું સરળ અને અવિરત સંચાલન.</li>
  <li><strong>દૈનિક વ્યવસ્થાપન:</strong> યાત્રાળુઓ, સાધુ-સંતો, દર્શનાર્થીઓ માટે રહેવા, ભોજન અને પૂજા-અર્ચનાની વ્યવસ્થા.</li>
  <li><strong>ઉત્સવ આયોજન:</strong> ગુરુ પૂર્ણિમા, જન્માષ્ટમી, દિપાવલી અને હોળી-ધૂળેટી જેવા મોટા પર્વોમાં લાખો ભક્તોના રહેવા-જમવાની વ્યવસ્થાનું નિર્માણ.</li>
</ul>

<h3>સમર્પણ અને નિષ્ઠા / Dedication</h3>
<p>કોઠારી તરીકે શ્રી મુકુંદરામ બાપુનું કાર્ય મંદિરના સુચારુ સંચાલન માટે અત્યંત મહત્વપૂર્ણ છે. દર્શનાર્થીઓ, ભક્તો અને સંતોની સેવા તેમના જીવનનું લક્ષ્ય છે. નિરંતર સેવાભાવ અને નિસ્વાર્થ સમર્પણ દ્વારા તેમણે ધામની પ્રવૃત્તિઓને સક્ષમ અને વ્યવસ્થિત રાખી છે.</p>`,
    teachings_themes: [
      'નિસ્વાર્થ સેવા (Selfless Service)',
      'અન્ન સેવા (Food Service – Annakshetra)',
      'મંદિર વ્યવસ્થાપન (Temple Management)',
      'ભક્ત સેવા (Devotee Care)',
    ],
    notable_quotes: [],
    seo_keywords: [
      'Kothari Mukundram Bapu', 'Mukundram Bapu Dudhrej', 'Vadvala Mandir Kothari',
      'મુકુંદરામ બાપુ', 'કોઠારી વડવાળા મંદિર', 'દુધરેજ કોઠારી',
      'Dudhrej Dham Kothari', 'Vadwala Temple Administration',
    ],
    events: [
      { year_or_date: 'ચાલુ', title: 'ભંડાર અને અન્નક્ષેત્ર સંચાલન', description: 'દરરોજ ૧,૦૦૦ થી ૧,૫૦૦ દર્શનાર્થીઓ અને સાધુ-સંતો માટે ૨૪ કલાક અન્નક્ષેત્ર સેવાનું સંચાલન.', sort_order: 1 },
      { year_or_date: 'દર વર્ષે', title: 'પર્વ આયોજન', description: 'ગુરુ પૂર્ણિમા, જન્માષ્ટમી, દિપાવલી અને હોળી મહોત્સવમાં ૨-૩ લાખ ભક્તો માટે ભોજન, રહેવા અને પ્રસાદની વ્યવસ્થા.', sort_order: 2 },
      { year_or_date: 'ચાલુ', title: 'યાત્રિક સેવા', description: 'ધામમાં આવતા યાત્રાળુઓ, સંતો અને દર્શનાર્થીઓ માટે નિવાસ, ભોજન અને અન્ય સગવડોનું સંચાલન.', sort_order: 3 },
    ],
    images: [
      { image_url: '', storage_key: `${GURU_IMG}/mukundram-bapu-01.jpg`, alt_text: 'કોઠારી શ્રી મુકુંદરામ બાપુ – Kothari Shri Mukundram Bapu', caption: 'કોઠારી શ્રી મુકુંદરામ બાપુ', is_primary: true, sort_order: 1 },
      { image_url: '', storage_key: `${GURU_IMG}/mukundram-bapu-02.jpg`, alt_text: 'મંદિર પરિસરમાં પૂજ્ય કોઠારી બાપુશ્રી', caption: 'મંદિર પરિસરમાં પૂજ્ય કોઠારી બાપુશ્રી', is_primary: false, sort_order: 2 },
      { image_url: '', storage_key: `${GURU_IMG}/mukundram-bapu-03.jpg`, alt_text: 'જન્મદિવસ અભિનંદન અને સંત વંદના', caption: 'જન્મદિવસ અભિનંદન અને સંત વંદના', is_primary: false, sort_order: 3 },
    ],
    order: 2,
  },
  // ── Shri Nagardas Bapu ──
  {
    slug: 'nagardas-bapu',
    full_name: 'શ્રી નાગરદાસ બાપુ',
    role_title: 'શ્રી વડવાળા મંદિર, દુધરેજધામ',
    short_title: 'શ્રી નાગરદાસ બાપુ',
    community_role: 'શ્રી વડવાળા મંદિર સેવક',
    key_associated_temple: 'શ્રી વડવાળા મંદિર, દુધરેજધામ',
    birth_date: null,
    birthplace: null,
    biography_short: 'Official biography and information about Shri Nagardas Bapu will be added by the trust admin.',
    biography_full: `<p>Official biography and information about Shri Nagardas Bapu will be added by the trust admin.</p>`,
    teachings_themes: [],
    notable_quotes: [],
    seo_keywords: ['Nagardas Bapu', 'Nagar Das Bapu', 'નાગરદાસ બાપુ'],
    events: [],
    images: [
      { image_url: '', storage_key: `${GURU_IMG}/nagardas-bapu-01.jpg`, alt_text: 'Shri Nagardas Bapu', caption: 'Shri Nagardas Bapu', is_primary: true, sort_order: 1 },
      { image_url: '', storage_key: `${GURU_IMG}/nagardas-bapu-02.jpg`, alt_text: 'Shri Nagardas Bapu', caption: 'Shri Nagardas Bapu', is_primary: false, sort_order: 2 }
    ],
    order: 3,
  },
];

const tithiSeeds = [
  {
    dateGregorian: new Date('2026-06-16T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Jeth',
    monthNameGu: 'જેઠ',
    notes: 'Jeth Sud Bij',
    notesGu: 'જેઠ સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-06-29T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Jeth',
    monthNameGu: 'જેઠ',
    notes: 'Vat Savitri Vrat',
    notesGu: 'વટ સાવિત્રી વ્રત',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-07-15T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Ashadh',
    monthNameGu: 'અષાઢ',
    notes: 'Ashadh Sud Bij',
    notesGu: 'અષાઢ સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-07-29T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Ashadh',
    monthNameGu: 'અષાઢ',
    notes: 'Guru Purnima',
    notesGu: 'ગુરુ પૂર્ણિમા',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-08-13T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Shravan',
    monthNameGu: 'શ્રાવણ',
    notes: 'Shravan Sud Bij',
    notesGu: 'શ્રાવણ સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-08-28T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Shravan',
    monthNameGu: 'શ્રાવણ',
    notes: 'Raksha Bandhan / Shravani Poonam',
    notesGu: 'રક્ષાબંધન / શ્રાવણી પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-09-12T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Bhadarva',
    monthNameGu: 'ભાદરવો',
    notes: 'Ramdevpir Dooj',
    notesGu: 'રામદેવપીર બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-09-26T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Bhadarva',
    monthNameGu: 'ભાદરવો',
    notes: 'Bhadarvi Poonam',
    notesGu: 'ભાદરવી પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-10-11T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Aso',
    monthNameGu: 'આસો',
    notes: 'Aso Sud Bij',
    notesGu: 'આસો સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-10-25T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Aso',
    monthNameGu: 'આસો',
    notes: 'Sharad Purnima',
    notesGu: 'શરદ પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-11-10T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Kartak',
    monthNameGu: 'કાર્તક',
    notes: 'Bhai Dooj',
    notesGu: 'ભાઈબીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-11-24T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Kartak',
    monthNameGu: 'કાર્તક',
    notes: 'Kartaki Poonam / Dev Diwali',
    notesGu: 'કાર્તકી પૂનમ / દેવ દિવાળી',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-12-10T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Magsar',
    monthNameGu: 'માગશર',
    notes: 'Magsar Sud Bij',
    notesGu: 'માગશર સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2026-12-23T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Magsar',
    monthNameGu: 'માગશર',
    notes: 'Magsar Poonam',
    notesGu: 'માગશર પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-01-09T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Posh',
    monthNameGu: 'પોષ',
    notes: 'Posh Sud Bij',
    notesGu: 'પોષ સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-01-22T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Posh',
    monthNameGu: 'પોષ',
    notes: 'Posh Poonam / Shakambhari Navratri End',
    notesGu: 'પોષી પૂનમ / શાકંભરી નવરાત્રી પૂર્ણ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-02-07T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Maha',
    monthNameGu: 'મહા',
    notes: 'Maha Sud Bij',
    notesGu: 'મહા સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-02-21T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Maha',
    monthNameGu: 'મહા',
    notes: 'Maha Poonam',
    notesGu: 'મહા પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-03-09T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Fagan',
    monthNameGu: 'ફાગણ',
    notes: 'Fagan Sud Bij',
    notesGu: 'ફાગણ સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-03-22T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Fagan',
    monthNameGu: 'ફાગણ',
    notes: 'Holi / Hutashani Poonam',
    notesGu: 'હોળી મહોત્સવ / હુતાશની પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-04-08T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Chaitra',
    monthNameGu: 'ચૈત્ર',
    notes: 'Chaitra Sud Bij',
    notesGu: 'ચૈત્ર સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-04-21T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Chaitra',
    monthNameGu: 'ચૈત્ર',
    notes: 'Hanuman Jayanti / Chaitri Poonam',
    notesGu: 'હનુમાન જયંતિ / ચૈત્રી પૂનમ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-05-07T00:00:00.000Z'),
    tithiName: 'Bij',
    tithiNameGu: 'બીજ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Vaishakh',
    monthNameGu: 'વૈશાખ',
    notes: 'Vaishakh Sud Bij',
    notesGu: 'વૈશાખ સુદ બીજ',
    isHighlighted: true
  },
  {
    dateGregorian: new Date('2027-05-20T00:00:00.000Z'),
    tithiName: 'Punam',
    tithiNameGu: 'પૂનમ',
    paksha: 'Sud',
    pakshaGu: 'સુદ',
    monthName: 'Vaishakh',
    monthNameGu: 'વૈશાખ',
    notes: 'Buddha Purnima / Vaishakhi Poonam',
    notesGu: 'બુદ્ધ પૂર્ણિમા / વૈશાખી પૂનમ',
    isHighlighted: true
  }
];

module.exports = {
  seedPublicContent,
  seedData: {
    images,
    settingsDefaults,
    banners,
    historySections,
    acharyas,
    galleryCategories,
    activities,
    festivals,
    donationItems,
    paymentInfo,
    contactDefaults,
    seoItems,
    gaushalaDefaults,
    guruSeeds,
    tithiSeeds,
  },
};
