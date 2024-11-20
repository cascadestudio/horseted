import { downloadDocument } from "@/utils/downloadDocument";
import fetchHorseted from "@/utils/fetchHorseted";

export const downloadLabel = async (accessToken, orderId) => {
  try {
    const labelToken = await fetchHorseted(
      `/orders/${orderId}/label_token`,
      accessToken
    );
    const labels = await fetchHorseted(
      `/labels/${labelToken.token}`,
      accessToken
    );
    if (labels) {
      downloadDocument(labels, `label_${orderId}.pdf`);
    }
  } catch (error) {
    console.error("Error downloading label", error);
  }
};
