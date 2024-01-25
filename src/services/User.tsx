import { message } from "antd";
import axios from "../plugins/axiosInterceptor";


export const getUsersRolesService = async () => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/roles`,
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
      `${import.meta.env.VITE_APP_BASE_URL}/users/register`,
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
export const deleteUserService = async (id_user: number) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_BASE_URL}/users/${id_user}`,
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
  id_user: number,
  payload: object
) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BASE_URL}/users/${id_user}`,
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
