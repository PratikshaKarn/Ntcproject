import axios from 'axios';

// Reads from your .env file (VITE_API_URL). Falls back to the local
// Laravel dev server if the env var isn't set for some reason.
// e.g. VITE_API_URL=http://localhost:8000/api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitContactForm = (formData) => {
  return api.post('/contact', formData);
};

export const getProjects = () => {
  return api.get('/projects');
};

export const getServices = () => {
  return api.get('/services');
};

export const getTeam = () => {
  return api.get('/team');
};

export const registerUser = (userData) => {
  // userData will be { firstName, lastName, email, password }
  return api.post('/auth/register', userData);
};

export const loginUser = (userData) => {
  // userData will be { email, password }
  return api.post('/auth/login', userData);
};

export default api;