// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;  

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);  
    req.user = decoded;

    next();

  } catch (err) {
    console.log(err); // optional debugging
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  console.log("AUTH HEADER:", req.headers.authorization);

};
