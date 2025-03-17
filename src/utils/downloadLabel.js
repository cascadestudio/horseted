import { downloadDocument } from "@/utils/downloadDocument";
import fetchHorseted from "@/utils/fetchHorseted";

const downloadLabel = async (accessToken, token, fileId) => {
  const labels = await fetchHorseted(
    `/labels/${token}`,
    accessToken
  );
  
  if (labels) {
    downloadDocument(labels, `label_${fileId}.pdf`);
  }
}

export const downloadOrderLabel = async (accessToken, orderId) => {
  try {
    const labelToken = await fetchHorseted(
      `/orders/${orderId}/label_token`,
      accessToken
    );

    await downloadLabel(accessToken, labelToken.token, orderId);
    
  } catch (error) {
    console.error("Error downloading label", error);
  }
};

export const downloadDisputeLabel = async (accessToken, disputeId) => {
  try {
    const labelToken = await fetchHorseted(
      `/disputes/${disputeId}/label_token`,
      accessToken
    );

    await downloadLabel(accessToken, labelToken.token, disputeId);    
  } catch (error) {
    console.error("Error downloading label", error);
  }
};
