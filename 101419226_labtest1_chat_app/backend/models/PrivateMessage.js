const mongoose = require("mongoose");

const PrivateMessageSchema = new mongoose.Schema({
    from_user: { type: mongoose.Schema.Types.ObjectId, required: true },
    to_user: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);
module.exports = PrivateMessage;
