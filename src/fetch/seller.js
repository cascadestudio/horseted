import fetchHorseted from "@/utils/fetchHorseted";

export const getSeller = async (accessToken) => {
  const response = await fetchHorseted("/users/me/seller_account", accessToken);
  return response;
};