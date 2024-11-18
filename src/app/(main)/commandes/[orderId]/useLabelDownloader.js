import fetchHorseted from "@/utils/fetchHorseted";
import { useCallback } from "react";
import { downloadDocument } from "@/utils/downloadDocument";

export const useLabelDownloader = (accessToken, orderId) => {
  const downloadLabel = useCallback(async () => {
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
  }, [accessToken, orderId]);

  return { downloadLabel };
};
