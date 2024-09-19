import fetchHorseted from "@/utils/fetchHorseted";

export async function getUser(accessToken, recipientId) {
  const user = await fetchHorseted(`/users/${recipientId}`, accessToken);
  return user;
}

export async function getPaymentMethods(accessToken) {
  const query = `/users/me/payment_methods`;
  const paymentMethods = await fetchHorseted(query, accessToken);
  return paymentMethods;
}

export async function deletePaymentMethods(accessToken, paymentMethodId) {
  const query = `/users/me/payment_methods/${paymentMethodId}`;
  const paymentMethods = await fetchHorseted(query, accessToken, "DELETE");
  return paymentMethods;
}
