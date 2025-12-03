// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

const { book, cancel, myBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/book', authMiddleware, book);
router.post('/:bookingId/cancel', authMiddleware, cancel);
router.get('/me', authMiddleware, myBookings);

module.exports = router;
