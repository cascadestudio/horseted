import fetchHorseted from "@/utils/fetchHorseted";

export async function postPaymentMethod(accessToken, cardToken, isDefaultCard) {
  const query = `/users/me/payment_methods`;
  const body = {
    cardToken: cardToken,
    isDefault: isDefaultCard,
  };
  await fetchHorseted(query, accessToken, "POST", body, true);
}
