import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  // Register new user
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Get current user profile
  getProfile: () => {
    return api.get('/auth/user');
  },

}; 