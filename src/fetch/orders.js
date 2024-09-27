import fetchHorseted from "@/utils/fetchHorseted";

export const getOrder = async (accessToken, orderId) => {
  const order = await fetchHorseted(
    `/orders/${orderId}`,
    accessToken,
    "GET",
    null,
    false,
    true
  );
  return order;
};

export const getOrderTracking = async (accessToken, orderId) => {
  const orderTracking = await fetchHorseted(
    `/orders/${orderId}/tracking`,
    accessToken,
    "GET"
  );
  return orderTracking;
};

export const postOrderPayment = async (accessToken, orderId, body) => {
  const paymentResponse = await fetchHorseted(
    `/orders/${orderId}/payment`,
    accessToken,
    "POST",
    body,
    true
  );
  return paymentResponse;
};
