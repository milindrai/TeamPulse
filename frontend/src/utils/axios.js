import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5007/api', // Adjust based on backend URL
});

// Add a request interceptor to include the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or retrieve from state management
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
