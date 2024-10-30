import fetchHorseted from "@/utils/fetchHorseted";

export async function getAddresses(accessToken, userId) {
  let addresses = [];
  if (userId) {
    addresses = await fetchHorseted(`/users/${userId}/addresses`, accessToken);
  } else {
    addresses = await fetchHorseted(`/users/me/addresses`, accessToken);
  }
  return addresses;
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

export async function postAddress(accessToken, address) {
  const query = `/users/me/addresses`;
  const response = await fetchHorseted(
    query,
    accessToken,
    "POST",
    address,
    true,
    true
  );
  return response;
}
