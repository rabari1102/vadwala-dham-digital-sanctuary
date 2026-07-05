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
    content: 'શ્રી વડવાળા મંદિર દુધરેજધામ રબારી-માલધારી સમાજની પરમ શ્રદ્ધાસ્પદ ધર્મગુરુગાદી તરીકે અતિ આદરણીય સ્થાન ધરાવે છે. એક માન્યતા અનુસાર મહાભારતકાળમાં પ્રખ્યાત પાંડુપુત્ર મહારાજા યુધિષ્ઠિરે રાઈકા જ્ઞાતિને \'દેસાઈ\'ની માનવંતી પદવી આપેલ હતી. આ રાઈકા કે દેસાઈ રબારી જ્ઞાતિઓ આશ્રમને પ્રતિવર્ષ ગુરુભેટ કે ટેલ રૂપે જે દ્રવ્ય અર્પણ કરે છે, તેનાથી આશ્રમનો નિભાવ અને ૨૪ કલાક અન્નક્ષેત્ર અવિરત ચાલે છે.',
    image: images.historyMain,
    order: 10,
  },
  {
    title: 'વડવાળા ધામ સંક્ષિપ્ત પરિચય',
    content: 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની દેવભૂમિ ગણાય છે, જેમાં પાંચાળ પ્રદેશ (હાલનો સુરેન્દ્રનગર જિલ્લો) પવિત્ર ગણાય છે. અહીં ઐતિહાસિક વર્ધમાનપુરી (વઢવાણ) નજીક દુધરેજ ગામ આવેલું છે. આ પવિત્ર ધામમાં શ્રીમદ્ શંકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણા અને આશીર્વાદથી શ્રીરામીય વૈષ્ણવોનાં ધર્મધામ સમું શ્રી વટપતિ (વડવાળા દેવ) ભગવાનનું આશ્રમ સ્થાન આવેલું છે. તેમના આરાધ્ય દેવ અયોધ્યાપતિ ભગવાન શ્રી રામચંદ્રજી છે, જે સમગ્ર ગુજરાત અને દેશ-વિદેશમાં વડવાળા દેવ તરીકે પ્રખ્યાત છે.',
    image: images.vadwala,
    order: 11,
  },
  {
    title: 'આશ્રમ અને પવિત્ર પરિસર',
    content: 'મહાવદગિરિમાંથી ઉદ્ભવેલી ઉન્મત્ત ગંગા (ઉમઈ નદી) ના ઉત્તર કિનારે આ મનોહર આશ્રમ આવેલો છે. આશ્રમને અડીને પવિત્ર દુગ્ધસર (પય:સર) સરોવર શોભે છે. આશ્રમનું પટાંગણ વિશાળ છે, જ્યાં પવિત્ર વટવૃક્ષ અને સુંદર નયનમનોહર મંદિર શ્રેણીઓ ભક્તોને શાંતિ અર્પે છે. આશ્રમની પૂર્વ અને દક્ષિણ દિશામાં કલાત્મક પ્રવેશદ્વારો આવેલા છે.',
    image: images.temple,
    order: 12,
  },
  {
    title: 'મંદિર અને શિલ્પકલા',
    content: 'પરિસરની મધ્યમાં શિલ્પકલા અને કમનીય કારીગરીનું ધામ એવું ભગવાન શ્રી વટપતિ રામનું ભવ્ય શિખરબદ્ધ મંદિર શોભી રહ્યું છે. બેનમૂન પથ્થરોથી કલા-સમૃદ્ધ શૈલીમાં નિર્માણ પામેલું આ મંદિર જોઈને શ્રદ્ધાળુઓ અને કલાપ્રેમીઓ ભાવવિભોર બને છે. મંદિરનું સ્થાપત્ય અને અદ્ભુત કોતરણી જોઈને જોનાર આશ્ચર્યચકિત થઈ જાય છે.',
    image: `${LOCAL}/Dipavali-Mahotsave3.jpg`,
    order: 13,
  },
  {
    title: 'પવિત્ર વટવૃક્ષ અને સમાધિઓ',
    content: 'મંદિરની પૂર્વ દિશામાં વિશાળ કલ્પવૃક્ષ સમાન વટવૃક્ષ દર્શન આપે છે. પરંપરા મુજબ આ વડ આશ્રમના પ્રથમાચાર્ય શ્રી ષટપ્રજ્ઞ સ્વામીજીએ વડના દાતણ રોપીને ઉછેર્યો હતો. મંદિરની દક્ષિણ દિશામાં શ્રી ષટપ્રજ્ઞ સ્વામીજીથી માંડીને અત્યાર સુધીના આચાર્યશ્રીઓની ચમત્કારિક અને પવિત્ર સમાધિઓ આવેલી છે, જે આ ધામની ૫૦૦ વર્ષથી વધુ સમયની ભવ્ય આધ્યાત્મિક પરંપરાની સાક્ષી પૂરે છે.',
    image: images.gaushala,
    order: 14,
  },
  {
    title: 'અન્નપૂર્ણા ભંડાર અને ગૌસેવા',
    content: 'સમાધિસ્થાનની બાજુમાં જ વિશાળ ભંડાર આવેલો છે, જ્યાં જગતજનની માતા અન્નપૂર્ણા સદેહે બિરાજમાન હોય તેમ સતત અન્ન વિતરણ થાય છે. લાખો શ્રદ્ધાળુઓ અને સાધુ-સંતો અહીં મહાપ્રસાદ મેળવે છે. ભંડારની અડોઅડ વિશાળ ગૌશાળા આવેલી છે, જ્યાં ગીર ગાયોની સેવા-ચાકરી થાય છે. આ ગૌવંશનો ઇતિહાસ પ્રથમ ગાદીપતિ શ્રી લબ્ધરામ સ્વામીના સમયથી શરૂ થાય છે.',
    image: `${LOCAL}/D7A0046.jpg`,
    order: 15,
  },
  {
    title: 'યાત્રિક નિવાસ અને સંત સેવા',
    content: 'યાત્રાળુઓ અને દર્શનાર્થીઓ માટે આશ્રમમાં રહેવા તેમજ ભોજનની ઉત્તમ વ્યવસ્થા છે. સાધુ-સંતો અને તપસ્વીઓ માટે સુંદર મેડીબંધ મકાનોની હારમાળા છે. આશ્રમની માલિકીની જમીનમાં થતી ખેતીની ઉપજનો ઉપયોગ અન્નક્ષેત્રમાં થાય છે. આ ધામના સંતો સમગ્ર ગુજરાત અને દેશભરમાં વિચરણ કરીને સનાતન ધર્મ, ભક્તિ અને તંદુરસ્ત સદાચારી જીવનનો પ્રચાર-પ્રસાર કરે છે.',
    image: images.aerial,
    order: 16,
  },
  {
    title: 'ત્રણ પ્રવેશદ્વારો અને દેવો',
    content: 'શ્રી દૂધરેજ વડવાળા મંદિર પૂર્વાભિમુખ છે. તેમાં પ્રવેશવા માટે ત્રણ મુખ્ય પ્રવેશદ્વાર છે: પૂર્વમાં સિંહદ્વાર, ઉત્તરમાં નંદીદ્વાર અને દક્ષિણમાં હસ્તિદ્વાર. આ ત્રણે દ્વાર કામ, ક્રોધ અને લોભ ત્યજીને પ્રભુના શરણે જવાનો સંદેશ આપે છે. સિંહદ્વારથી પ્રવેશતા જ ઉત્તરમાં ગણપતિજી અને દક્ષિણે વિરાટ હનુમાનજીની ભવ્ય મૂર્તિ છે. મધ્ય ચોકમાં ત્રણ ઘૂમટ છે જેમાં નવગ્રહોની રમણીય પથ્થર કોતરણી છે. ગર્ભગૃહમાં ડાબીથી જમણી તરફ શ્રી દ્વારકાનાથજી, શ્રી વટનાથ, ભગવાન શ્રી રામચંદ્રજી, સ્વામી શ્રી ષટપ્રજ્ઞદાસજી અને ભગવાન શ્રી શંકર બિરાજમાન છે.',
    image: `${LOCAL}/Guru-Purnima-20241.jpg`,
    order: 17,
  },
];

const acharyas = [
  { name: 'શ્રી નીલકંઠ સ્વામી', order: 1, periodStart: '', periodEnd: '૧૫૯૫', description: 'જગદ્ગુરુ શ્રી રામાનુજાચાર્યજીની પરંપરાના મહાન સંત. દૂધરેજ ધામની ઉજળી પરંપરાના પ્રથમ યતિ, જેમણે પવિત્ર ગંગાજીમાં જળસમાધિ લીધી હતી.' },
  { name: 'શ્રી રઘુનાથ સ્વામી', order: 2, periodStart: '૧૫૯૫', periodEnd: '૧૬૪૫', description: 'નીલકંઠદાસજીના અનન્ય શિષ્ય, જેમનો જન્મ ધરાસુચટ્ટી ગામમાં થયો હતો. ઝીંઝુવાડાના રણમાં ધુણો ધખાવી સનાતન ધર્મનો પ્રચાર કર્યો અને જળસમાધિ લીધી.' },
  { name: 'શ્રી યાદવ સ્વામી', order: 3, periodStart: '૧૬૪૫', periodEnd: '૧૬૬૦', description: 'અખંડ ભજન, ધુણી અને તપસ્યાના પ્રતીક સંત. ઝીંઝુવાડા રણને સ્વર્ગ સમાન બનાવી જીલેશ્વર સરોવરના કિનારે અખંડ ભજન આરાધના કરી.' },
  { name: 'શ્રી ષટપ્રજ્ઞદાસજી', order: 4, periodStart: '૧૬૬૦', periodEnd: '૧૭૮૬', description: 'ઝીંઝુવાડાના સામંતસિંહ અને અમરસિંહ રાજકુમારોને વૈરાગ્ય આપી દીક્ષિત કર્યા. અયોધ્યાથી લાવેલા વડના દાતણ રોપીને દૂધરેજ ધામમાં પવિત્ર વટવૃક્ષ (વડલા) ની સ્થાપના કરી.' },
  { name: 'શ્રી લબ્ધરામજી', order: 5, periodStart: '૧૭૮૬', periodEnd: '૧૮૧૫', description: 'પાટણ જિલ્લાના દાસદ ગામના રબારી સમાજના તેજસ્વી સંત. ષટપ્રજ્ઞદાસજીના આશીર્વાદથી ગાદીપતિ બન્યા અને ૧૪ પરગણાના રબારી સમાજમાં ધર્મ અને સંસ્કારનું સિંચન કરી જળ સમાધિ લીધી.' },
  { name: 'શ્રી રત્નદાસજી', order: 6, periodStart: '૧૮૧૫', periodEnd: '૧૮૩૦', description: 'પાટણવાડાના ગોવના ગામના રબારી સમાજના સિદ્ધ સંત, જેમણે અદ્ભુત યોગસિદ્ધિ દ્વારા ગંગાજી અને રણમાં ડૂબતા લોકોને બચાવવાના પરચાઓ આપ્યા હતા.' },
  { name: 'શ્રી માનદાસજી', order: 7, periodStart: '૧૮૩૦', periodEnd: '૧૮૫૫', description: 'અતિ ભજનાનંદી, ત્યાગી અને પરમ વૈરાગ્યવાન સંત. ઉત્તર ગુજરાતના મેરણા ગામના રબારી સમાજના ભાગ્યશાળી પરિવારમાં જન્મ્યા અને ધામનો ભક્તિભાવ વધાર્યો.' },
  { name: 'શ્રી કૃષ્ણદાસજી', order: 8, periodStart: '૧૮૫૫', periodEnd: '૧૮૯૫', description: 'ઉત્તર ગુજરાતના કરજીસણ (કલોલ) ગામના રબારી સમાજના યોગદ્રષ્ટા સંત. સમગ્ર જીવન સેવામાં સમર્પિત કરી વડવાળા ધામની કીર્તિ દેશભરમાં પ્રસરાવી.' },
  { name: 'શ્રી ઓધવદાસજી', order: 9, periodStart: '૧૮૯૫', periodEnd: '૧૯૦૭', description: 'કૃષ્ણદાસજીના શિષ્ય અને સગુણ ઉપાસનાના આરાધક સંત. ઉત્તર ગુજરાતના ખાવડ ગામના રબારી સમાજ પરિવારમાં જન્મ. ભક્તિ અને સેવાની ઉજળી પરંપરા જાળવી.' },
  { name: 'શ્રી ગોકુલદાસજી', order: 10, periodStart: '૧૯૦૭', periodEnd: '૧૯૦૯', description: 'ટૂંકા ગાળામાં અનેક ભગવત કાર્યો કરી આધ્યાત્મિક જ્યોત પ્રજ્વલિત રાખનારા દ્રષ્ટિવંત અને પરમ પવિત્ર સંત.' },
  { name: 'શ્રી ભાવદાસજી', order: 11, periodStart: '૧૯૦૯', periodEnd: '૧૯૧૧', description: 'અતિ લાગણીશીલ, વિવેક સંપન્ન અને સગુણ રામચંદ્રજીના પરમ ઉપાસક સંત, જેમણે અખંડ ચેતના જાગૃત રાખી.' },
  { name: 'શ્રી ગુલાબદાસજી', order: 12, periodStart: '૧૯૧૧', periodEnd: '૧૯૧૩', description: 'કાર્યકુશળ અને સંગીત કલાના અજોડ જાણકાર સંત, જેમણે સંતવાણી અને ભગવત કાર્ય દ્વારા સેવાની જ્યોત જલતી રાખી.' },
  { name: 'શ્રી કેવળદાસજી', order: 13, periodStart: '૧૯૧૩', periodEnd: '૧૯૧૮', description: 'અતિ ભજનાનંદી, ત્યાગી, અને અન્નદાનનો મહિમા વધારનાર સિદ્ધ સંત, જેમણે કોઈ પણ સંપત્તિમાં મોહ રાખ્યા વિના સેવા કરી.' },
  { name: 'શ્રી મેઘદાસજી', order: 14, periodStart: '૧૯૧૮', periodEnd: '૧૯૨૭', description: 'ગૌ અને બ્રાહ્મણ પ્રતિપાળ સંત. ઝાલાવાડના ભદ્રેશી ગામના રબારી પરિવારમાં જન્મ. દુષ્કાળ સમયે ગૌસેવા અર્થે પોતાના હાથથી પથ્થર ખસેડી પાણીનું ઝરણું પ્રગટ કર્યું, જેને મેઘ તલાવડી કહે છે.' },
  { name: 'શ્રી યમુનાદાસજી', order: 15, periodStart: '૧૯૨૭', periodEnd: '૧૯૩૩', description: 'વાણી અને વર્તનમાં પવિત્રતા, ગરીબોની સેવા અને ધર્મના સંસ્કારોનો સદાય પ્રસાર કરનાર પરમ આદરણીય સંત.' },
  { name: 'શ્રી ગંગારામજી', order: 16, periodStart: '૧૯૩૩', periodEnd: '૧૯૪૭', description: 'સાદાઈ, સાત્વિકતા અને સહનશીલતાના મૂર્તિમંત સંત. ધ્રાંગધ્રાના રાજવી માનસિંહજીને વૈરાગ્યનો મહિમા સમજાવી વડવાળા મંદિરના ભવ્ય શિખરબદ્ધ બાંધકામની કડી જોડી.' },
  { name: 'શ્રી ગોવિંદરામજી', order: 17, periodStart: '૧૯૫૦', periodEnd: '૧૯૫૪', description: 'ટૂંકા શાસનકાળમાં પણ ધામની આધ્યાત્મિક ગરિમા, સામાજિક સેવા અને ગૌસેવાના કાર્યોને કુશળતાપૂર્વક ચલાવનારા સંત.' },
  { name: 'શ્રી રઘુવરદાસજી', order: 18, periodStart: '૧૯૫૫', periodEnd: '૧૯૮૦', description: 'ઝાલાવાડના ગોમટા ગામના વતની તેજસ્વી અને સાત્વિક સંત. દેશભરમાં વડવાળા ધામની સેવાની કીર્તિ સ્થાપિત કરી અને ચાર ધામ યાત્રા તથા સાધુ સંમેલનો કર્યા.' },
  { name: 'શ્રી જીવરામદાસજી', order: 19, periodStart: '૧૯૮૦', periodEnd: '૧૯૯૭', description: 'ઝાલાવાડના રવળીયાવદર ગામના રબારી જ્ઞાતિના પવિત્ર સંત. ગુરુ રઘુવરદાસજીના સાનિધ્યમાં વૈરાગ્ય ધારણ કરી ધામની આધ્યાત્મિક પ્રતિષ્ઠા અને અન્નક્ષેત્ર સેવા વધારી.' },
  { name: 'શ્રી ગોમતીદાસજી', order: 20, periodStart: '૧૯૯૭', periodEnd: '૨૦૧૮', description: 'બગસરાના કાગદડી ગામના રબારી સમાજના ક્રાંતિકારી સંત. કાશીમાં ૧૮ વર્ષ વેદાંત અભ્યાસ કરી વેદાંતતીર્થ બન્યા. અંધશ્રદ્ધા અને કુરિવાજોના વિરોધી અને શિક્ષણના હિમાયતી હતા.' },
  { name: 'શ્રી કલ્યાણદાસજી', order: 21, periodStart: '૨૦૧૮', periodEnd: '', description: 'ગોતા (અમદાવાદ) ના રબારી સમાજમાં જન્મેલા પરમ વિવેક સંપન્ન સંત, જેમણે સામાજિક અને શૈક્ષણિક ક્ષેત્રે ભગીરથ સુધારા કરી વડવાળા ધામની ગાદી શોભાવી.' },
  { name: 'શ્રી કનીરામદાસજી', order: 22, periodStart: '૧૯૯૪', periodEnd: 'વિદ્યમાન', description: 'સાંકરવડા (અમરેલી) માં જન્મેલા ૧૦0૮ મહામંડલેશ્વર. ગુરુ કલ્યાણદાસજીના શરણમાં દીક્ષા મેળવી ધામની ધાર્મિક, શૈક્ષણિક અને અન્નક્ષેત્ર પ્રવૃત્તિઓને દેશભરમાં સુપ્રસિદ્ધ કરી.' },
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
    description: 'શ્રી વડવાળા મંદિર દુધરેજધામમાં દરરોજ ૨૪ કલાક અવિરત અન્નક્ષેત્ર ચલાવવામાં આવે છે. દરરોજ આશરે ૧૦૦૦ થી ૧૫૦૦ દર્શનાર્થીઓ, સાધુ-સંતો અને ગરીબો ભોજન પ્રસાદ ગ્રહણ કરે છે. આ સેવાનો સંપૂર્ણ ખર્ચ ભક્તો અને સેવક સમાજની સ્વૈચ્છિક ભેટ તથા દાનમાંથી વહન કરવામાં આવે છે.',
    icon: 'Utensils',
    category: 'seva',
    isFeatured: true,
    image: images.temple,
    order: 1,
  },
  {
    title: 'ગૌશાળા : વટેશ્વર ગૌશાળા અને ગૌ સેવા',
    slug: 'gaushala',
    shortDescription: 'ગીર ગાયોનું સંવર્ધન અને સેવા',
    description: 'આશ્રમના પ્રથમ ગાદીપતિ સદગુરુશ્રી લબ્ધરામજી મહારાજ દ્વારા જગ્યામાં લાવવામાં આવેલ "રૂપેણ" અને "રાંગણ" ગાયોનો વંશવેલો આજે ૫૦૦થી વધુની સંખ્યામાં હયાત છે. ગામ જેગડવામાં ગાયોના ચરીયાણ માટે વિશાળ ગૌચર "કલ્યાણદાસ બાપુ ફાર્મ" ખાતે વટેશ્વર ગૌશાળા કાર્યરત છે, જેનો પ્રારંભ પૂજ્ય મોરારીબાપુની પ્રેરણાદાયી ઉપસ્થિતિમાં થયો હતો.',
    icon: 'Heart',
    category: 'seva',
    isFeatured: true,
    image: images.gaushala,
    order: 2,
  },
  {
    title: 'શૈક્ષણિક સેવાઓ : કુમાર અને કન્યા છાત્રાલયો',
    slug: 'education',
    shortDescription: 'વિદ્યાર્થીઓ માટે છાત્રાલય અને શાળાઓ',
    description: 'શ્રી વડવાળા મંદિર દુધરેજધામ શૈક્ષણિક પ્રવૃત્તિઓમાં સક્રિય છે. સદગુરુશ્રી ગોમતીદાસબાપુ કુમાર છાત્રાલય (સુરેન્દ્રનગર) ૪૫ વર્ષથી અવિરત ચાલુ છે જ્યાં ૨૦૦ કુમારો અભ્યાસ કરે છે. આ ઉપરાંત સદગુરુશ્રી કલ્યાણદાસબાપુ કન્યા છાત્રાલયમાં ૧૫૦ કન્યાઓ રહે છે. ધોરણ ૯ થી ૧૦ માટે શ્રી વડવાળા દેવ સરસ્વતી હાઈસ્કૂલ અને ધોરણ ૬ થી ૮ માટે શ્રી વડવાળા કલ્યાણગુરુધામ શાળાઓનું સંચાલન કરવામાં આવે છે.',
    icon: 'GraduationCap',
    category: 'education',
    isFeatured: true,
    image: images.school,
    order: 3,
  },
  {
    title: 'પર્વ ઉજવણી : ભવ્ય ઉત્સવોનું આયોજન',
    slug: 'festivals',
    shortDescription: 'મુખ્ય પર્વોની ભવ્ય ઉજવણી',
    description: 'જન્માષ્ટમી (ગોકુલ આઠમ), હોળી-ધૂળેટી, ગુરુ પૂર્ણિમા અને દિવાળી પર્વ જેવા પાવન પ્રસંગોમાં લાખો શ્રદ્ધાળુ સેવકો દર્શનાર્થે આવે છે. આ તમામ મહોત્સવો દરમિયાન ભક્તો માટે ભજન અને ભોજન ભંડારાનું ભવ્ય આયોજન કરવામાં આવે છે.',
    icon: 'Sparkles',
    category: 'festival',
    isFeatured: true,
    image: images.guru,
    order: 4,
  },
  {
    title: 'ધાર્મિક સેવાઓ અને ધર્મશાળાઓ',
    slug: 'dharmshala',
    shortDescription: 'યાત્રાળુ સેવા અને ધર્મશાળા સંચાલન',
    description: 'આ સંસ્થા દ્વારા સેવક સમાજ માટે ડાકોર ખાતે સદગુરુ શ્રી રઘુરામબાપુ ધર્મશાલા અને જૂનાગઢ ખાતે સદગુરુશ્રી કલ્યાણગુરુધામ ધર્મશાલા ચલાવવામાં આવે છે, જેથી યાત્રાળુઓને સરળ રહેવા-જમવાની સગવડ મળી શકે.',
    icon: 'Home',
    category: 'seva',
    isFeatured: false,
    image: images.vadwala,
    order: 5,
  },
  {
    title: 'મહાકુંભ અને આપાતકાલીન સેવા',
    slug: 'mahakumbh-seva',
    shortDescription: 'અન્નક્ષેત્ર, વસ્ત્રદાન અને આપત્તિ રાહત',
    description: 'બાર બાર વર્ષે આવતા મહાકુંભ પર્વમાં ઉજ્જૈન, નાસિક, પ્રયાગરાજ અને હરિદ્વારમાં અન્નક્ષેત્ર સેવા તેમજ સાધુ-સંતોની સેવા કરવામાં આવે છે. આપાતકાળે વસ્ત્રદાન, અન્નદાન અને રાહત સેવાકાર્યો કરવામાં આવે છે.',
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
  <li><strong>ધર્મશાળા સેવા:</strong> સદગુરુ શ્રી રઘુરામબાપુ ધર્મશાલા (ડાકોર) અને સદગુરુશ્રી કલ્યાણગુરુધામ (જૂનાગઢ) ખાતે ધર્મશાળાઓનું સંચાલન.</li>
  <li><strong>મહાકુંભ સેવા:</strong> ઉજ્જૈન, નાસિક, પ્રયાગરાજ અને હરિદ્વારમાં મહાકુંભ પર્વે અન્નક્ષેત્ર અને વસ્ત્રદાન.</li>
</ul>

<h3>સન્માન અને એવોર્ડ / Honors and Awards</h3>
<p>મહંત શ્રી કનીરામદાસજી બાપુને ધાર્મિક અને સામાજિક ક્ષેત્રે વિશિષ્ટ સેવાઓ માટે અનેક સન્માન મળેલા છે:</p>
<ul>
  <li><strong>ધ્યાનસ્વામી એવોર્ડ:</strong> સૌરાષ્ટ્રના પરમ તીર્થધામ તરીકે પૂજ્ય મોરારીબાપુ દ્વારા પ્રદાન કરાયો.</li>
  <li><strong>નાલંદા એવોર્ડ:</strong> ગુજરાત સરકાર દ્વારા ગુર્જર ભૂમિના શ્રેષ્ઠ તીર્થ-યાત્રાધામ તરીકે એનાયત કરાયો.</li>
  <li><strong>મહામંડલેશ્વર પદવી:</strong> હરિદ્વાર સિંહસ્થ કુંભ મહાપર્વ વર્ષ ૨૦૧૦ દરમિયાન અખાડા પરિષદ તથા નિર્મોહી અખાડા દ્વારા મહામંડલેશ્વરની પદવી એનાયત કરાઈ.</li>
  <li><strong>અધ્યક્ષ સનાતન ધર્મ પરિષદ:</strong> ઈ.સ. ૨૦૧૫ (વિ.સં. ૨૦૭૧) માં સનાતન ધર્મ પરિષદ ગુજરાતના અધ્યક્ષ પદે વરણી કરવામાં આવી.</li>
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
