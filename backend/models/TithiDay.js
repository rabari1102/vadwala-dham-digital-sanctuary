const mongoose = require('mongoose');

const tithiDaySchema = new mongoose.Schema({
  dateGregorian: { type: Date, required: true, index: true },
  tithiName: { type: String, required: true }, // e.g., "Punam", "Bij", "Ekadashi"
  tithiNameGu: { type: String, required: true }, // Gujarati: "પૂનમ", "બીજ", "એકાદશી"
  paksha: { type: String, enum: ['Shukla', 'Krishna', 'Sud', 'Vad'], required: true },
  pakshaGu: { type: String, default: '' }, // Gujarati: "સુદ", "વદ"
  monthName: { type: String, default: '' }, // e.g., "Vaishakh", "Jeth"
  monthNameGu: { type: String, default: '' }, // Gujarati: "વૈશાખ", "જેઠ"
  notes: { type: String, default: '' }, // e.g., "Guru Purnima"
  notesGu: { type: String, default: '' }, // Gujarati description
  isHighlighted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('TithiDay', tithiDaySchema);
