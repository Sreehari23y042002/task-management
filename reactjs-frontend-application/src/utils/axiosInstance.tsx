import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig): any => {
  const token = Cookies.get('accessToken');

  if (token && config.headers) {
    config.headers['x-access-token'] = token;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const navigate = useNavigate();

    if (error.response && error.response.status === 401) {
      Cookies.remove('accessToken');
      navigate('/');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;