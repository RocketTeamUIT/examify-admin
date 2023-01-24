import axios from 'axios';
const CLOUD_NAME = 'doxsstgkc';

const axiosBase = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const axiosImage = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
});

export const dictionary = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en',
});

export { axiosPrivate, axiosImage };

export default axiosBase;
