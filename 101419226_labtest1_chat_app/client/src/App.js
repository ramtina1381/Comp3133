import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import User from "./pages/User/User";
import PrivateChat from "./pages/Chat/PrivateChat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<User />} />
        <Route path="/chat/:recipientId" element={<PrivateChat />} />
      </Routes>
    </Router>
  );
};

export default App;
