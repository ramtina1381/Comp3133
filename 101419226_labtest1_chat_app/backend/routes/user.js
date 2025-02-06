const express = require("express");
const router = express.Router();
const User = require('../models/User');

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id username"); // Fetch only _id and username
    res.json(users.map(user => ({ id: user._id, username: user.username }))); // Map _id to id
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
