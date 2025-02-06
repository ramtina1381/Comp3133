import React from "react";
import { useNavigate } from "react-router-dom";
import './Chat.css'
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Chat Application</h1>
      <div className="button-container">
        <button className="nav-button" onClick={() => navigate("/users")}>
          Users
        </button>
        <button className="nav-button" onClick={() => navigate("/groups")}>
          Groups
        </button>
      </div>
    </div>
  );
};

export default Home;
