// models/Booking.js
const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pdf: { 
    type: String
  },
  train: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Train',
    required: true
  },
  seats: { type: Number, required: true },
  amount: { type: Number, required: true },
  pnr: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['CONFIRMED', 'CANCELLED'], 
    default: 'CONFIRMED' 
  },
  bookedAt: { type: Date, default: Date.now },
  cancelledAt: { type: Date }
});

module.exports = mongoose.model("Booking", bookingSchema);
