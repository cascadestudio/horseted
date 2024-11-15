import fetchHorseted from "@/utils/fetchHorseted";

export const getFees = async (price, accessToken) => {
  const response = await fetchHorseted(`/fees?price=${price}`, accessToken);
  return response.app;
};
