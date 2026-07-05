const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const AcharyaParampara = require('../models/AcharyaParampara');

const newAcharyas = [
  { name: 'શ્રી નીલકંઠ સ્વામી', order: 1, periodStart: '', periodEnd: '૧૫૯૫' },
  { name: 'શ્રી રઘુનાથ સ્વામી', order: 2, periodStart: '૧૫૯૫', periodEnd: '૧૬૪૫' },
  { name: 'શ્રી યાદવ સ્વામી', order: 3, periodStart: '૧૬૪૫', periodEnd: '૧૬૯૦' },
  { name: 'શ્રી ષટપ્રજ્ઞદાસજી', order: 4, periodStart: '૧૬૯૦', periodEnd: '૧૭૮૬' },
  { name: 'શ્રી લબ્ધરામજી', order: 5, periodStart: '૧૭૮૬', periodEnd: '૧૮૧૫' },
  { name: 'શ્રી રત્નદાસજી', order: 6, periodStart: '૧૮૧૫', periodEnd: '૧૮૩૦' },
  { name: 'શ્રી માનદાસજી', order: 7, periodStart: '૧૮૩૦', periodEnd: '૧૮૫૫' },
  { name: 'શ્રી કૃષ્ણદાસજી', order: 8, periodStart: '૧૮૫૫', periodEnd: '૧૮૯૫' },
  { name: 'શ્રી ઓધવદાસજી', order: 9, periodStart: '૧૮૯૫', periodEnd: '૧૯૦૭' },
  { name: 'શ્રી ગોકુલદાસજી', order: 10, periodStart: '૧૯૦૭', periodEnd: '૧૯૦૯' },
  { name: 'શ્રી ભાવદાસજી', order: 11, periodStart: '૧૯૦૯', periodEnd: '૧૯૧૧' },
  { name: 'શ્રી ગુલાબદાસજી', order: 12, periodStart: '૧૯૧૧', periodEnd: '૧૯૧૩' },
  { name: 'શ્રી કેવળદાસજી', order: 13, periodStart: '૧૯૧૩', periodEnd: '૧૯૧૮' },
  { name: 'શ્રી મેઘદાસજી', order: 14, periodStart: '૧૯૧૮', periodEnd: '૧૯૨૭' },
  { name: 'શ્રી યમુનાદાસજી', order: 15, periodStart: '૧૯૨૭', periodEnd: '૧૯૩૩' },
  { name: 'શ્રી ગંગારામજી', order: 16, periodStart: '૧૯૩૩', periodEnd: '૧૯૪૭' },
  { name: 'શ્રી ગોવિંદરામજી', order: 17, periodStart: '૧૯૫૦', periodEnd: '૧૯૫૪' },
  { name: 'શ્રી રઘુવરદાસજી', order: 18, periodStart: '૧૯૫૫', periodEnd: '૧૯૮૦' },
  { name: 'શ્રી જીવરામદાસજી', order: 19, periodStart: '૧૯૮૦', periodEnd: '૧૯૯૭' },
  { name: 'શ્રી ગોમતીદાસજી', order: 20, periodStart: '૧૯૯૭', periodEnd: '૨૦૧૮' },
  { name: 'શ્રી કલ્યાણદાસજી', order: 21, periodStart: '૨૦૧૮', periodEnd: '' },
  { name: 'શ્રી કનીરામદાસજી', order: 22, periodStart: '૧૯૯૪', periodEnd: 'વિદ્યમાન' }
];

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  console.log('Connecting to database...');
  await mongoose.connect(uri);
  console.log('Connected to MongoDB.');

  // Delete all existing Acharya records
  console.log('Deleting existing Acharya records...');
  const deleteResult = await AcharyaParampara.deleteMany({});
  console.log(`Deleted ${deleteResult.deletedCount} existing records.`);

  // Insert the new ordered records
  console.log('Inserting new ordered Acharya records...');
  const insertResult = await AcharyaParampara.insertMany(newAcharyas.map(a => ({
    ...a,
    status: 'published'
  })));
  console.log(`Successfully inserted ${insertResult.length} new records.`);

  await mongoose.disconnect();
  console.log('Done!');
}

run().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
