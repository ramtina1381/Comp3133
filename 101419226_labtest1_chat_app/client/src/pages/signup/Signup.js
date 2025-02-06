import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();  // Initialize useNavigate instead of useHistory

  // State to manage user input
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: ''
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sending POST request to backend to create new user
    try {
      await axios.post('http://localhost:5001/api/auth/signup', formData);
      navigate('/login');  // Use navigate instead of history.push
    } catch (err) {
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account? 
        <button type="button" onClick={() => navigate('/login')}>Login</button>
      </p>
    </div>
  );
};

export default Signup;
