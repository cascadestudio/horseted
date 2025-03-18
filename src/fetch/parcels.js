import fetchHorseted from "@/utils/fetchHorseted";

export const getParcelById = async (accessToken, parcelId) => {
  const parcel = await fetchHorseted(`/parcels/${parcelId}`, accessToken);
  return parcel;
};