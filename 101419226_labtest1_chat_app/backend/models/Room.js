const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
    unique: true, // Ensure each room has a unique name
  },
  room_id: {
    type: String,
    required: true,
    unique: true, // Ensure each room ID is unique
  },
  created_at: {
    type: Date,
    default: Date.now, // Automatically sets the creation time
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
