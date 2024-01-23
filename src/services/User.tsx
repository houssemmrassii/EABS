import { message } from "antd";
import axios from "../plugins/axiosInterceptor";

export const getUserService = async () => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

export const postUserService = async (payload: any) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/users`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};
export const deleteUserService = async (id_group: number) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_BASE_URL}/users/${id_group}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    message.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

export const updateUserService = async (
  id_group: number,
  payload: object
) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BASE_URL}/users/${id_group}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    message.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error; // Re-throw the error to let the caller handle it
  }
};
