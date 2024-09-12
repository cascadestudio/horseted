import fetchHorseted from "@/utils/fetchHorseted";

export async function getAddresses(accessToken) {
  const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
  return adresses;
}
