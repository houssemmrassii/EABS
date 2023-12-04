import { notification } from "antd";
import axios, { AxiosError } from "axios";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
interface ApiResponse {
  message?: string;
}

const displayNotification = (
  message: String,
  placement:
    | "top"
    | "topLeft"
    | "topRight"
    | "bottom"
    | "bottomLeft"
    | "bottomRight"
    | undefined,
  duration: number | null | undefined
) => {
  notification.error({
    message: message,
    placement: placement,
    duration: duration,
  });
};
// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // You can handle errors globally here
    if (error.response) {
      const errorMessage =
        error.response.data.message || "Something went wrong";
      displayNotification(errorMessage, "bottomLeft", 3);
    } else if (error.request) {
      displayNotification(error.request, "bottomLeft", 3);
    } else {
      displayNotification(error.message, "bottomLeft", 3);
    }

    return Promise.reject(error);
  }
);

export default axios;
