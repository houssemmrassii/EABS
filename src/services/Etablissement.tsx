import { message } from "antd";
import axios from "../plugins/axiosInterceptor";

export const getEtablissementService = async () => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/etablissements`,
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

export const postEtablissementService = async (payload: any) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/etablissements`,
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
export const deleteEtablissementService = async (id_group: number) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_BASE_URL}/etablissements/${id_group}`,
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

export const updateEtablissementService = async (
  id_group: number,
  payload: object
) => {
  try {
    const token = localStorage.getItem("token") || "";
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BASE_URL}/etablissements/${id_group}`,
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
