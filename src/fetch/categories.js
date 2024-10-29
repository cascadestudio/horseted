import fetchHorseted from "@/utils/fetchHorseted";

async function getSubCategoriesRecursive(categoryId) {
  const subCategories = await getCategories(categoryId);

  if (!subCategories || subCategories.length === 0) {
    return [];
  }

  const updatedSubCategories = await Promise.all(
    subCategories.map(async (subCategory) => {
      if (subCategory.hasChildren) {
        const childSubCategories = await getSubCategoriesRecursive(
          subCategory.id
        );
        return {
          ...subCategory,
          subCategories: childSubCategories,
        };
      } else {
        return {
          ...subCategory,
          subCategories: [],
        };
      }
    })
  );

  return updatedSubCategories;
}

export async function getAllCategories() {
  const parentCategories = await getCategories();

  const categories = await Promise.all(
    parentCategories.map(async (category) => {
      if (category.hasChildren) {
        const subCategories = await getSubCategoriesRecursive(category.id);
        return {
          ...category,
          subCategories,
        };
      } else {
        return {
          ...category,
          subCategories: [],
        };
      }
    })
  );

  return categories;
}

export const getCategories = async (parentId) => {
  const categories = await fetchHorseted(`/categories?parentId=${parentId}`);
  return categories;
};
