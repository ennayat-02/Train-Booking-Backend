const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateTicketPDF(booking, train) {
  const pdfDir = path.join(__dirname, "../tickets");

  // Ensure tickets folder exists
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }

  const fileName = `ticket_${booking.pnr}.pdf`;
  const filePath = path.join(pdfDir, fileName);

  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("TRAIN BOOKING TICKET", { underline: true });
  doc.moveDown();

  doc.fontSize(14).text(`PNR: ${booking.pnr}`);
  doc.text(`Train: ${train.name} (${train.number})`);
  doc.text(`From: ${train.source}`);
  doc.text(`To: ${train.destination}`);
  doc.text(`Departure: ${train.departureTime}`);
  doc.text(`Arrival: ${train.arrivalTime}`);
  doc.moveDown();

  doc.text(`Seats Booked: ${booking.seats}`);
  doc.text(`Class Type: ${booking.classType}`);
  doc.text(`Amount Paid: Rs ${booking.amount}`);

  doc.moveDown();

  doc.text(`Status: ${booking.status}`);
  
  doc.end();

  return fileName;
}

module.exports = generateTicketPDF;
