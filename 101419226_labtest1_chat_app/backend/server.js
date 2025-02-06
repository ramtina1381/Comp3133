require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const userRoutes = require("./routes/user")
const roomRoutes = require("./routes/room")
const PrivateMessage = require("./models/PrivateMessage");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both origins
    methods: ["GET", "POST"],
    credentials: true,  // Allow cookies to be sent with requests
  }
});

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],  // Add both URLs
  methods: ["GET", "POST"],
  credentials: true,  // Allow cookies to be sent with requests
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes)

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle private chat room joining
  socket.on("join_private_chat", ({ from_user, to_user }) => {
      socket.join(from_user);
      socket.join(to_user);
      console.log(`User ${from_user} and ${to_user} are now in the private chat room.`);
  });

  const axios = require("axios");  // Import axios for making HTTP requests

  socket.on("send_private_message", async (newMessage) => {
    try {
        // Convert to ObjectId correctly
        newMessage.from_user = new mongoose.Types.ObjectId(newMessage.from_user);
        newMessage.to_user = new mongoose.Types.ObjectId(newMessage.to_user);

        // Save the message to the database
        const savedMessage = await PrivateMessage.create(newMessage);

        // Emit the message to the other user in the chat
        io.to(newMessage.to_user.toString()).emit("receive_private_message", savedMessage);

    } catch (error) {
        console.error("Error saving message:", error.message);
    }
  });

  // Emit typing event to the recipient user
  socket.on("user_typing", ({ from_user, to_user }) => {
      console.log(`User ${from_user} is typing...`);
      socket.to(to_user).emit("user_typing", { from_user });
  });

  socket.on("stop_typing", ({ from_user, to_user }) => {
      // Emit stop typing event to the other user
      socket.to(to_user).emit("user_stopped_typing", { from_user });
  });

  socket.on("leave_private_chat", ({ from_user, to_user }) => {
    socket.leave(from_user);
    socket.leave(to_user);
    console.log(`User ${from_user} and ${to_user} have left the private chat room.`);
});
    // Listen for leave chat event
    socket.on("leave_private_chat", ({ from_user, to_user }) => {
      console.log(`${from_user} is leaving the chat.`);  // Debugging log
      // Emit 'user_left' to the other user in the chat room
      socket.to(to_user).emit("user_left", { from_user, to_user });
      console.log(`${from_user} has left the chat, notifying ${to_user}.`);
  });

  // Handle when a user disconnects
  socket.on("disconnect", () => {
      console.log("A user disconnected");
  });
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
