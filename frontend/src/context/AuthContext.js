import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if token exists and fetch user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, verify token validity with backend
      // For simplicity, assume token is valid
      const fetchUser = async () => {
        try {
          const response = await axios.get('/auth/me'); // Implement this route
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user:', error);
          localStorage.removeItem('token');
        }
      };
      fetchUser();
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const signup = async (username, email, password) => {
    const response = await axios.post('/auth/signup', { username, email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
