const express = require("express");
const GroupMessage = require("../models/GroupMessage");
const PrivateMessage = require("../models/PrivateMessage");

const router = express.Router();

// Fetch Group Messages
router.get("/group/:room", async (req, res) => {
    try {
        const messages = await GroupMessage.find({ room: req.params.room }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch Private Chat History
router.get("/privateChat/:user1/:user2", async (req, res) => {
    try {
        const { user1, user2 } = req.params;

        const messages = await PrivateMessage.find({
            $or: [
                { from_user: user1, to_user: user2 },
                { from_user: user2, to_user: user1 }
            ]
        }).sort({ date_sent: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching private chat:", error);
        res.status(500).json({ error: "Failed to fetch chat" });
    }
});

// Send Group Message
router.post("/group", async (req, res) => {
    const { room, message, from_user } = req.body;

    if (!room || !message || !from_user) {
        return res.status(400).json({ error: "Room, message, and sender are required" });
    }

    try {
        const newMessage = new GroupMessage({ from_user, room, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Send Private Message
router.post("/private", async (req, res) => {
  const { to_user, message, from_user } = req.body;

  if (!to_user || !message || !from_user) {
      return res.status(400).json({ error: "To user, message, and sender are required" });
  }

  try {
      const newMessage = new PrivateMessage({ from_user, to_user, message });
      await newMessage.save();
      res.status(201).json(newMessage);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


module.exports = router;
