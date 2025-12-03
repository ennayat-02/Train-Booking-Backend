// services/trainService.js
const Train = require('../models/Train');

async function addTrain(data) {
  const train = await Train.create(data);
  return train;
}

async function listTrains() {
  return await Train.find();
}

module.exports = { addTrain, listTrains };

async function addTrain(data) {
  const train = await Train.create(data);
  return train;
}

async function listTrains() {
  return await Train.find();
}

async function searchTrains(source, destination) {
  return await Train.find({
    source: { $regex: new RegExp(`^${source}$`, "i") },
    destination: { $regex: new RegExp(`^${destination}$`, "i") }
  }).lean();
}


module.exports = { addTrain, listTrains, searchTrains };

