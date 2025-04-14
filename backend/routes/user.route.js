// routes/user.route.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';
import authenticateToken from '../middleware/auth.js'; // Import the middleware

const router = express.Router();
const JWT_SECRET = "digamber";
const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const existingUser = await Users.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await Users.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    const payload = {
      user_id: newUser.user_id,
      name: newUser.name,
      email: newUser.email,
      admin: newUser.admin
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const user = await Users.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      admin: user.admin
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      token: token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout endpoint called. Client should clear token.' });
});

export default router;