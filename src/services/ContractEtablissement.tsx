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

    return data?.contracts;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
