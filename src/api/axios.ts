import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export { axiosPrivate };

export default axiosBase;
