// controllers/trainController.js
const trainService = require('../services/trainService');

function formatTable(trains) {
  const header = 
    `SNo | Train Name         | Number | Source   | Destination | Seats | Fare | Departure  | Arrival`;
  
  const line = "-".repeat(header.length);

  const rows = trains.map((t, index) => {
    return `${String(index + 1).padEnd(3)} | ` +
           `${t.name.padEnd(18)} | ` +
           `${t.number.padEnd(6)} | ` +
           `${t.source.padEnd(8)} | ` +
           `${t.destination.padEnd(11)} | ` +
           `${String(t.availableSeats).padEnd(5)} | ` +
           `${String(t.farePerSeat).padEnd(4)} | ` +
           `${t.departureTime.padEnd(10)} | ` +
           `${t.arrivalTime}`;
  }).join("\n");

  return `${header}\n${line}\n${rows}`;
}


async function addTrain(req, res) {
  try {
    const train = await trainService.addTrain(req.body);
    res.json(train);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getTrains(req, res) {
  try {
    const trains = await trainService.listTrains();
    res.json(trains);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getTrainsByRoute(req, res) {
  try {
    const { source, destination } = req.query;

    if (!source || !destination) {
      return res.status(400).json({ error: "source and destination are required" });
    }

    const trains = await trainService.searchTrains(source, destination);

    if (trains.length === 0) {
      return res.send("No trains found for this route.");
    }

    const tableOutput = formatTable(trains);

    // Returning ASCII table inside <pre> so Thunder Client displays it cleanly
    return res.send(`<pre>${tableOutput}</pre>`);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { addTrain, getTrains, getTrainsByRoute };

