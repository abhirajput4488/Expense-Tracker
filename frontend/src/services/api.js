import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const expenseService = {
  getExpenses: async (params = {}) => {
    const response = await api.get('/expenses', { params });
    return response.data;
  },

  createExpense: async (expenseData) => {
    // Generate a unique idempotency key for this request
    const idempotencyKey = uuidv4();

    const response = await api.post('/expenses', expenseData, {
      headers: {
        'x-idempotency-key': idempotencyKey,
      },
    });
    return response.data;
  }
};

export default api;
