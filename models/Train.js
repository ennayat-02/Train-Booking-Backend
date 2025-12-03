// models/Train.js
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: String,
  number: String,
  source: String,
  destination: String,
  totalSeats: Number,
  availableSeats: Number,
  farePerSeat: Number, // keep this for fallback
  classPrices: {
    sleeper: { type: Number, default: 0 },
    ac3: { type: Number, default: 0 },
    ac2: { type: Number, default: 0 }
  },
  departureTime: String,
  arrivalTime: String
}, { timestamps: true });


module.exports = mongoose.model("Train", trainSchema);
