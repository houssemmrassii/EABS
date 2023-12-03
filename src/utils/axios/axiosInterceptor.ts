// axiosInterceptor.ts
import { message } from "antd";
import axios, { AxiosError } from "axios";

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
interface ApiResponse {
  message?: string;
  // other fields you expect in the API response
}
// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // You can handle errors globally here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage =
        error.response.data.message || "Something went wrong";

      message.error(errorMessage);
    } else if (error.request) {
      // The request was made but no response was received
      message.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      message.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default axios;
