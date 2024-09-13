import fetchHorseted from "@/utils/fetchHorseted";

export async function getAddresses(accessToken) {
  const adresses = await fetchHorseted(`/users/me/addresses`, accessToken);
  return adresses;
}

export async function patchAddress(accessToken, newAddress, addressId) {
  const query = `/users/me/addresses/${addressId}`;
  const adresses = await fetchHorseted(
    query,
    accessToken,
    "PATCH",
    newAddress,
    true
  );
  console.log("adresses =>", adresses);
  return adresses;
}
