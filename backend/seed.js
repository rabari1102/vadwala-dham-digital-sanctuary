const mongoose = require('mongoose');
require('dotenv').config();

const { seedPublicContent } = require('./utils/publicContentSeeder');

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for public content seed...');

  const stats = await seedPublicContent({ log: console.log });
  console.log('Seed completed without deleting existing data.');
  console.log(stats);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
