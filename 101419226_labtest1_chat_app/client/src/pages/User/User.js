import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId"); // Retrieve logged-in user's ID
  const currentUsername = localStorage.getItem("username"); // Retrieve username

  useEffect(() => {
    axios.get("http://localhost:5001/api/user/users")  
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setError("Failed to load users.");
        setLoading(false);
      });
  }, []);

  const handleChatStart = (recipientId) => {
    navigate(`/chat/${recipientId}`, { 
      state: { currentUserId, currentUsername, recipientId } 
    });
  };

  return (
    <div className="users-container">
      <h1 className="title">Available Users</h1>

      {loading && <p className="loading">Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p className="no-users">No users available.</p>}

      <ul className="users-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            {user.id !== currentUserId && ( // Prevent showing yourself in the list
              <button className="user-button" onClick={() => handleChatStart(user.id)}>
                {user.username}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
