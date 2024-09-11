export const patchOffer = async (status, offerId) => {
  const body = {
    status: status,
  };
  const response = await fetchHorseted(
    `/offers/${offerId}`,
    accessToken,
    "PATCH",
    body,
    true
  );
  console.log("response =>", response);
};
