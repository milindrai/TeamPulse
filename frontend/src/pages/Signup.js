import React, { useState } from 'react';
import axios from '../utils/axios'; // Assuming you've set up an axios instance for making API calls

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', {
        username,
        email,
        password,
      });
      setMessage('Signup successful!');
      // Optionally redirect the user to the login page after successful signup
      // window.location.href = '/login';
    } catch (error) {
      setMessage('Error during signup: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="signup-container">
      <h1>Join TeamPulse</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
