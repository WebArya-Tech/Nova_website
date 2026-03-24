import apiClient from './api';

export const getAllTestimonials = async () => {
  const res = await apiClient.get('/testimonials');
  return res.data;
};

export const approveTestimonial = async (id: string) => {
  const res = await apiClient.patch(`/testimonials/${id}/approve`);
  return res.data;
};

export const rejectTestimonial = async (id: string) => {
  const res = await apiClient.patch(`/testimonials/${id}/reject`);
  return res.data;
};

export const deleteTestimonial = async (id: string) => {
  const res = await apiClient.delete(`/testimonials/${id}`);
  return res.data;
};
