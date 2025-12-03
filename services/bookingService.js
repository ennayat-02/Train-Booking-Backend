const Train = require('../models/Train');
const Booking = require('../models/Booking');
const generateTicketPDF = require("../utils/pdfGenerator");

function generatePNR() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

exports.bookTicket = async (userId, { trainId, seats, classType }) => {

  const train = await Train.findById(trainId);
  if (!train) throw new Error("Train not found");

  if (!train.classPrices || !train.classPrices[classType]) {
    throw new Error("Invalid classType");
  }

  const farePerSeat = train.classPrices[classType];
  const amount = farePerSeat * seats;

  if (train.availableSeats < seats) {
    throw new Error("Not enough seats available");
  }

  train.availableSeats -= seats;
  await train.save();

  const booking = new Booking({
    user: userId,
    train: trainId,
    seats,
    amount,
    classType,
    pnr: generatePNR(),
    status: "CONFIRMED"
  });

  await booking.save();

  const pdfFile = await generateTicketPDF(booking, train);
  booking.pdf = pdfFile;
  await booking.save();

  return booking;
};

exports.cancelTicket = async (userId, bookingId) => {
  const booking = await Booking.findById(bookingId).populate("train");

  if (!booking) throw new Error("Booking not found");

  if (booking.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized to cancel this ticket");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("Ticket already cancelled");
  }

  const train = booking.train;
  train.availableSeats += booking.seats;
  await train.save();

  booking.status = "CANCELLED";
  booking.cancelledAt = new Date();
  await booking.save();

  return booking;
};
