import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const verifyOTP = async (otpData) => {
  const response = await axios.post(`${API_URL}/verify-otp`, otpData);
  return response.data;
};

export const resetPassword = async (resetData) => {
  const response = await axios.post(`${API_URL}/reset-password`, resetData);
  return response.data;
};
