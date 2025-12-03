// routes/trainRoutes.js
const express = require('express');
const router = express.Router();

const { addTrain, getTrains, getTrainsByRoute } = require('../controllers/trainController');

// Add a train
router.post('/add', addTrain);

// List all trains
router.get('/', getTrains);

//search Train by source and dest
router.get('/search', getTrainsByRoute);

module.exports = router;
