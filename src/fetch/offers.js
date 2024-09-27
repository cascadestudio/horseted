import fetchHorseted from "@/utils/fetchHorseted";

export const patchOffer = async (status, offerId, accessToken) => {
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

export const postOffer = async (
  accessToken,
  { orderId, price, declinedOfferId }
) => {
  const response = await fetchHorseted(
    `/offers/`,
    accessToken,
    "POST",
    { orderId, price, declinedOfferId },
    true,
    true
  );
  console.log("response =>", response);
};
