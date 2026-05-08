const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  icon: String,
  titleGuj: String,
  text: String,
  order: { type: Number, default: 0 },
});

const gateSchema = new mongoose.Schema({
  icon: String,
  name: String,
  nameGuj: String,
});

const aboutSchema = new mongoose.Schema({
  historyParagraphs: [String],
  facts: [factSchema],
  gates: [gateSchema],
  fiveDeitiesGuj: String,
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
