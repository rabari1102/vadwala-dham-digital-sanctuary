const mongoose = require('mongoose');

const paymentInfoSchema = new mongoose.Schema({
  type: { type: String, enum: ['bank', 'upi', 'qr'], required: true },
  label: { type: String, required: true },
  details: { type: String, default: '' },
  qrImage: { type: String, default: '' },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('PaymentInfo', paymentInfoSchema);
