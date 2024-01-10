import axiosInstance from "@/plugins/axiosInterceptor";

export const postContractEtablissement = async (payload: any) => {
  try {
    const { data } = await axiosInstance.post(
      "/contrat_etablissement",
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getContractsEtablissement = async () => {
  try {
    const { data } = await axiosInstance.get("/contrat_etablissement");

    return data?.contrats;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteContractEtablissement = async (id: number) => {
  try {
    await axiosInstance.delete(`/contrat_etablissement/${id}`);

    return true;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateContractEtablissement = async (id: number, payload: any) => {
  try {
    const { data } = await axiosInstance.put(
      `/contrat_etablissement/${id}`,
      payload
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
