import api from './api';

export const demoApi = {
  sendOtp: (data: { email: string }) => api.post('/demo/send-otp', data),
  verifyOtp: (data: { email: string; otp: string }) => api.post('/demo/verify-otp', data),
  submit: (data: Record<string, unknown>) => api.post('/demo/submit', data),
};
