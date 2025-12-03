// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

const trainRoutes = require('./routes/trainRoutes');
app.use('/api/trains', trainRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);


const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server:', err.message);
});
