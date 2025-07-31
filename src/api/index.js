import axios from 'axios';

// Create a configured instance of axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Your backend base URL
});

// Add a request interceptor to automatically include the auth token
api.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default api;