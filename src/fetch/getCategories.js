import fetchHorseted from "@/utils/fetchHorseted";

export const getCategories = async (parentId) => {
  const categories = await fetchHorseted(`/categories?parentId=${parentId}`);
  return categories;
};
