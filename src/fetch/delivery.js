import fetchHorseted from "@/utils/fetchHorseted";

export async function getShippingMethods(
  postalCode,
  productIds,
  activeServicePointId,
  accessToken
) {
  let query = `/delivery/shipping_methods`;
  query += `?postal_code=${postalCode}`;
  query += `&product_ids=${productIds.join(";")}`;
  if (activeServicePointId) query += `&service_point=${activeServicePointId}`;
  const shippingMethods = await fetchHorseted(query, accessToken);
  return shippingMethods;
}

export async function getServicePoints(activeAddress, productIds, accessToken) {
  let query = `/delivery/service_points`;
  query += `?address_id=${activeAddress.id}`;
  query += `&location=${activeAddress.latitude};${activeAddress.longitude}`;
  query += `&product_ids=${productIds.join(";")}`;
  const servicePoints = await fetchHorseted(query, accessToken);
  return servicePoints;
}
