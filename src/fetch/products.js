import fetchHorseted from "@/utils/fetchHorseted";

export const getProducts = async (productId) => {
  const product = await fetchHorseted(`/products/${productId}`);
  return product;
};

export const deleteProduct = async (accessToken, product) => {
  await fetchHorseted(
    `/products/${product.id}`,
    accessToken,
    "DELETE",
    null,
    false
  );
};
