const mongoose = require('mongoose');

const GroupMessageSchema = new mongoose.Schema({
  from_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  room: String,
  message: String,
  date_sent: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GroupMessage', GroupMessageSchema);
