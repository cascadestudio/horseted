import fetchHorseted from "@/utils/fetchHorseted";

export const getDisputeById = async (accessToken, disputeId) => {
  const dispute = await fetchHorseted(`/disputes/${disputeId}`, accessToken);
  return dispute;
};

export const getDisputeByOrderId = async (accessToken, orderId) => {
  const dispute = await fetchHorseted(`/disputes?orderId=${orderId}`, accessToken);
  return dispute;
};

export const createDispute = async (accessToken, data) => {
  const dispute = await fetchHorseted('/disputes', accessToken, "POST", data, false);
  return dispute;
}

export const postDisputeDecision = async (accessToken, disputeId, body) => {  
  const dispute = await fetchHorseted(`/disputes/${disputeId}/decision`, accessToken, "POST", body, true);
  return dispute;
}

export const postReturnPayment = async (accessToken, disputeId, body) => {
  const response = await fetchHorseted(`/disputes/${disputeId}/return_payment`, accessToken, "POST", body, true);
  return response;
}

export const postReturnDeliveryConfirmation = async (accessToken, disputeId) => {
  const response = await fetchHorseted(`/disputes/${disputeId}/return_delivery_confirmation`, accessToken, "POST", {}, true);
  return response;
}

export const postReturnDispute = async (accessToken, disputeId) => {
  const response = await fetchHorseted(`/disputes/${disputeId}/return_dispute`, accessToken, "POST", {}, true);
  return response;
}

export const sendToHorseted = async (accessToken, disputeId) => {
  const response = await fetchHorseted(`/disputes/${disputeId}/sendToHorseted`, accessToken, "POST", {}, true);
  return response;
}