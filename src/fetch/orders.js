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

export const postOrder = async (accessToken, body) => {
  const order = await fetchHorseted(
    `/orders`,
    accessToken,
    "POST",
    body,
    true,
    true
  );
  return order.id;
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

export const getOrderDocuments = async (orderId, documentType, accessToken) => {
  const blob = await fetchHorseted(
    `/orders/${orderId}/documents/${documentType}`,
    accessToken
  );
  return blob;
};

export const patchOrderIsReceived = async (orderId, accessToken) => {
  const query = `/orders/${orderId}`;
  const body = {
    received: true,
  };
  await fetchHorseted(query, accessToken, "PATCH", body, true);
};

export const getPaymentInfos = async (accessToken, orderId) => {
  const query = `/orders/${orderId}/payment_infos`;
  const paymentInfos = await fetchHorseted(query, accessToken);
  return paymentInfos;
};
