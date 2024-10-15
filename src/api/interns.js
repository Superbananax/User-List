import axios from 'axios';

const API_URL = 'https://reqres.in/api/users';

export const getInterns = (page = 1) => {
  return axios.get(`${API_URL}?page=${page}`);
};

export const getInternById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createIntern = (data) => {
  return axios.post(API_URL, data);
};

export const updateIntern = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteIntern = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
