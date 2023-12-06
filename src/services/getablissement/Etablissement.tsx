import axios from "../../utils/axios/axiosInterceptor";

export const getEtablissementGroupsService = async () => {
  try {
    const token = localStorage.getItem("token") || ""; // Provide a default value if token is null
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/groups`,
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

export const postEtablissementGroupsService = async (payload: any) => {
  try {
    const token = localStorage.getItem("token") || ""; // Provide a default value if token is null
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/groups`,
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
