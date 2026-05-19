const mongoose = require('mongoose');

const dhajaBookingSchema = new mongoose.Schema({
  // Personal Details
  fullName:     { type: String, required: true },
  phone:        { type: String, required: true },
  email:        { type: String, default: '' },
  address:      { type: String, default: '' },
  city:         { type: String, default: '' },

  // Family/Gotra Info
  gotra:        { type: String, default: '' },
  familyMembers:{ type: String, default: '' },

  // Dhaja Details
  preferredDate:{ type: Date },
  occasion:     { type: String, default: '' },
  dhajaType:    { type: String, enum: ['regular', 'special', 'festival'], default: 'regular' },
  message:      { type: String, default: '' },

  // Status
  status:       { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  isRead:       { type: Boolean, default: false },
  adminNote:    { type: String, default: '' },
}, { timestamps: true });

dhajaBookingSchema.index({ status: 1, createdAt: -1 });
dhajaBookingSchema.index({ preferredDate: 1 });

module.exports = mongoose.model('DhajaBooking', dhajaBookingSchema);
