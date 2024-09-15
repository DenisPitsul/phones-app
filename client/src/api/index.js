import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const getBrands = () => axiosInstance.get('/brands');

export const createPhone = data => axiosInstance.post('/phones', data);

export const getPhones = page => {
  let path = '/phones?results=12';
  if (page) {
    path += `&page=${page}`;
  }
  return axiosInstance.get(path);
};

export const getPhoneById = id => axiosInstance.get(`/phones/${id}`);

export const updatePhoneById = (id, data) =>
  axiosInstance.patch(`/phones/${id}`, data);

export const deletePhoneById = id => axiosInstance.delete(`/phones/${id}`);
