// src/constants/api.js
const BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  ACCOUNTS: `${BASE_URL}/api/accounts`,
  LOOKUP: `${BASE_URL}/api/transfer/lookup`,
  TRANSFERS: `${BASE_URL}/api/transfers`,
};