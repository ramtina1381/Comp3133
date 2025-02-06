const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, firstname, lastname, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
      // Find user by username
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Compare the entered password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = { userId: user._id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Return the token, userId, and username to the frontend
      res.status(200).json({ message: 'Login successful', token, userId: user._id, username: user.username });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
