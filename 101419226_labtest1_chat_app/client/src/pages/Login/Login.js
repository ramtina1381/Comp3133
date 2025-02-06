import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");  // Clear any previous error message

        try {
            // Send POST request to the backend
            const res = await axios.post("http://localhost:5001/api/auth/login", { username, password });
            console.log("Login Response:", res.data);

            // Check if the response contains userId, token, and username
            if (res.data.token && res.data.userId) {
                // Save token, userId, and username in localStorage
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("username", res.data.username);

                // Navigate to the user list page
                navigate("/users");
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError(err.response?.data?.error || "An unexpected error occurred");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {error && <div className="error-message">{error}</div>}

            <form>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="button" onClick={handleLogin}>Login</button>
            </form>

            <p>Don't have an account? 
                <button type="button" onClick={() => navigate('/')}>Sign Up</button>
            </p>
        </div>
    );
};

export default Login;
