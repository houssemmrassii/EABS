// axiosInterceptor.ts
import axios, { AxiosError } from 'axios';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // You can modify the request config here (e.g., add headers, tokens, etc.)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError) => {
    // You can handle errors globally here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axios;
