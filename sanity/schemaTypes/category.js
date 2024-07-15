export const category = {
  name: "category",
  title: "Catégories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom de la catégorie",
      type: "string",
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};
