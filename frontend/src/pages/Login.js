import React, { useState } from 'react';
import axios from '../utils/axios'; // Assuming you've set up an axios instance

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Assuming the response contains a token
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in localStorage

      setMessage('Login successful!');
      // Optionally redirect the user to the homepage or dashboard after successful login
      window.location.href = '/dashboard'; // Adjust the redirect as necessary
    } catch (error) {
      setMessage('Error during login: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <h1>Login to TeamPulse</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
