import fetchHorseted from "@/utils/fetchHorseted";

export const deleteProduct = async (accessToken, product) => {
  await fetchHorseted(
    `/products/${product.id}`,
    accessToken,
    "DELETE",
    null,
    false
  );
};
