import axiosInstance from "@/plugins/axiosInterceptor";

import { TypeChambreDataType } from "@/types";

export const postTypeChambre = async (payload: TypeChambreDataType) => {
  try {
    const { data } = await axiosInstance.post("/type_chambre", payload);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getTypeChambre = async () => {
  try {
    const { data } = await axiosInstance.get("/type_chambre");

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const patchTypeChambre = async (
  payload: TypeChambreDataType,
  id: number
) => {
  try {
    const { data } = await axiosInstance.put(`/type_chambre/${id}`, payload);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteTypeChambre = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/type_chambre/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getRegions = async () => {
  try {
    const { data } = await axiosInstance.get(`/regions`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getDepartementsByRegion = async (idRegion: number) => {
  try {
    const { data } = await axiosInstance.get(
      `/department/by_region/${idRegion}`
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getVillesByDepartment = async (idDep: number) => {
  try {
    const { data } = await axiosInstance.get(`/ville/by_department/${idDep}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
