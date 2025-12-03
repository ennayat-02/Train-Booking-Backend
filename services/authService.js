// services/authService.js
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
    

const { PASSWORD_SALT, JWT_SECRET } = process.env;

function hashPassword(password) {
  return CryptoJS.SHA256(password + PASSWORD_SALT).toString();
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

function generateToken(user) {
  // minimal payload
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
}

async function signup({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');
  const passwordHash = hashPassword(password);
  const user = await User.create({ name, email, passwordHash });
  const token = generateToken(user);
  return { user, token };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');
  if (!verifyPassword(password, user.passwordHash)) throw new Error('Invalid credentials');
  const token = generateToken(user);
  return { user, token };
}

module.exports = { hashPassword, verifyPassword, generateToken, signup, login };
