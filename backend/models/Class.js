const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['yoga', 'gym', 'dance'], required: true },
  capacity: { type: Number, required: true },
  bookings: [String],  // Store user identifiers as strings
  waitlist: [String],  // Store user identifiers as strings
  date: { type: Date, required: true },
  status: { type: String, enum: ['active', 'canceled'], default: 'active' } 
});

module.exports = mongoose.model('Class', classSchema);
