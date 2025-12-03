// controllers/bookingController.js
const bookingService = require('../services/bookingService');

async function book(req, res) {
  try {
    const userId = req.user.id;

    

    const booking = await bookingService.bookTicket(userId, req.body);
    res.json(booking);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function cancel(req, res) {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;

    const booking = await bookingService.cancelTicket(userId, bookingId);
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function myBookings(req, res) {
  try {
    const userId = req.user.id;

    const bookings = await bookingService.getUserBookings(userId);
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { book, cancel, myBookings };
