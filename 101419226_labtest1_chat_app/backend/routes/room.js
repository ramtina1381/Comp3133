const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Route to create a new room
router.post('/createRoom', async (req, res) => {
  const { room_name } = req.body;

  // Validate that the room name is provided
  if (!room_name) {
    return res.status(400).json({ error: 'Room name is required' });
  }

  // Check room name length (Optional)
  if (room_name.length < 3 || room_name.length > 30) {
    return res.status(400).json({ error: 'Room name must be between 3 and 30 characters' });
  }

  try {
    // Generate a unique room ID (e.g., based on timestamp)
    const room_id = `room-${Date.now()}`;

    // Check if room already exists
    const existingRoom = await Room.findOne({ room_name });
    if (existingRoom) {
      return res.status(400).json({ error: 'Room already exists' });
    }

    // Create the new room
    const newRoom = new Room({
      room_name,
      room_id,
    });

    // Save room to the database
    await newRoom.save();

    return res.status(201).json({
      message: 'Room created successfully',
      room: newRoom,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating room' });
  }
});

module.exports = router;
