// controllers/authController.js
const authService = require('../services/authService');

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });
    const { user, token } = await authService.signup({ name, email, password });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    // Duplicate key error (unique email)
    if (err.code === 11000) return res.status(400).json({ error: 'Email already registered' });
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });
    const { user, token } = await authService.login({ email, password });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { signup, login };
