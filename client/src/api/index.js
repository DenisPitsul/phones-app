import axios from 'axios';
import queryString from 'query-string';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const getBrands = () => axiosInstance.get('/brands');

export const createPhone = data => axiosInstance.post('/phones', data);

export const getPhones = page => {
  const query = queryString.stringify({ results: 24, page });
  return axiosInstance.get(`/phones?${query}`);
};

export const getPhoneById = id => axiosInstance.get(`/phones/${id}`);

export const updatePhoneById = (id, data) =>
  axiosInstance.patch(`/phones/${id}`, data);

export const deletePhoneById = id => axiosInstance.delete(`/phones/${id}`);
