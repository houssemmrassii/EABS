import { notification } from "antd";
import axios, { AxiosError, AxiosInstance } from "axios";

const apiHost: string = import.meta.env.VITE_APP_BASE_URL;
const axiosInstance: AxiosInstance = axios.create({ baseURL: apiHost });

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("token");
  config?.headers?.setAuthorization(accessToken && `Bearer ${accessToken}`);
  return config;
});

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
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      const { status } = error?.response;
      if (status === 400) {
        const errorMessage =
          error?.response?.data?.message || "Veuillez vérifier vos informations et essayer encore";
          displayNotification(errorMessage, "bottomLeft", 3);
      } else if (status === 500) {
        // Handle 500 error
        // Example: show an error message to the user
        const errorMessage =
          error?.response?.data?.message || "Quelque chose s'est mal passé";
        displayNotification(errorMessage, "bottomLeft", 3);
      } else if (status === 401) {
        // Handle 401 error
        // Example: redirect to login page
        // window.location.href = "/login";
        const errorMessage =
          error?.response?.data?.message ||
          "Votre session a expiré. Veuillez vous reconnecter.";
        displayNotification(errorMessage, "bottomLeft", 3);

        localStorage.clear();
        window.location.href = "/";
      } else if (status === 403) {
        // Handle 403 error
        // Example: show an access denied message to the user
        const errorMessage =
          error?.response?.data?.message ||
          "Vous n'êtes pas autorisé à accéder à cette ressource.";
        displayNotification(errorMessage, "bottomLeft", 3);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
