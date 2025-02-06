import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "./PrivateChat.css";

const socket = io("http://localhost:5001");

const PrivateChat = () => {
    const { recipientId } = useParams();  // Get recipientId from URL
    const currentUser = localStorage.getItem("userId");  // Get currentUser from localStorage
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showTypingIndicator, setShowTypingIndicator] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [userLeft, setUserLeft] = useState(false);  // State to track if the other user has left

    // Hook to navigate to the previous page
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || !recipientId) return;

        // Fetch chat history between the currentUser and recipientId
        axios.get(`http://localhost:5001/api/chat/privateChat/${currentUser}/${recipientId}`)
            .then(response => setMessages(response.data))
            .catch(error => console.error("Error fetching chat history:", error));

        // Join the chat room
        socket.emit("join_private_chat", { from_user: currentUser, to_user: recipientId });

        // Listen for incoming messages
        socket.on("receive_private_message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setUserLeft(false);  // Reset userLeft when a new message is received
        });

        // Listen for typing indicator
        socket.on("user_typing", (data) => {
            if (data.from_user !== currentUser) {
                setShowTypingIndicator(true);
                clearTimeout(typingTimeout);
                setTypingTimeout(setTimeout(() => setShowTypingIndicator(false), 3000));
            }
        });

        // Listen for user leaving the chat
        socket.on("user_left", (data) => {
            if (data.from_user !== currentUser) {
                console.log(`${data.from_user} has left the chat.`);
                setUserLeft(true);  // Set userLeft state to true when the other user leaves
            }
        });

        return () => {
            socket.off("receive_private_message");
            socket.off("user_typing");
            socket.off("user_left");
        };
    }, [recipientId, currentUser, typingTimeout]);

    const sendMessage = () => {
        if (message.trim() === "") return;

        const newMessage = {
            from_user: currentUser,
            to_user: recipientId,
            message,
        };

        console.log("Sending message:", newMessage);  // Debugging line to ensure values are correct

        socket.emit("send_private_message", newMessage);
        setMessage("");
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);

        if (!isTyping) {
            setIsTyping(true);
            socket.emit("user_typing", { from_user: currentUser, to_user: recipientId });
        }

        clearTimeout(typingTimeout);
        setTypingTimeout(setTimeout(() => setIsTyping(false), 3000));
    };

    // Function to leave the chat
    const leaveChat = () => {
        socket.emit("leave_private_chat", { from_user: currentUser, to_user: recipientId });
        socket.emit("user_left", { from_user: currentUser, to_user: recipientId });
        navigate(-1);  // Go back to the previous page
    };

    return (
        <div className="chat-container">
            <h2>Chat with User {recipientId}</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={msg._id || index} className={`message ${msg.from_user === currentUser ? "sent" : "received"}`}>
                        <p>{msg.message}</p>
                    </div>
                ))}
                {userLeft && <div className="left-chat-message">User has left the chat.</div>}
            </div>

            {showTypingIndicator && !isTyping && <p className="typing-indicator">User is typing...</p>}

            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={handleTyping}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>

            <button className="leave-chat-button" onClick={leaveChat}>Leave Chat</button>
        </div>
    );
};

export default PrivateChat;
