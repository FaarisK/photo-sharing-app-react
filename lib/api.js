import axios from 'axios';
// Import mock setup
import './mockSetup.js';

const api = axios.create({
  baseURL: '/',
});

export default api;
