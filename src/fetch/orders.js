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

export const getOrderDocuments = async (
  orderId,
  documentType,
  accessToken,
  documentName
) => {
  const blob = await fetchHorseted(
    `/orders/${orderId}/documents/${documentType}`,
    accessToken
  );
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = documentName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const patchOrderIsReceived = async (orderId, accessToken) => {
  const query = `/orders/${orderId}`;
  const body = {
    received: true,
  };
  await fetchHorseted(query, accessToken, "PATCH", body, true);
};
