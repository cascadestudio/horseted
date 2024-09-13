export const helpCategory = {
  name: "helpCategory",
  title: "Catégories du centre d'aide",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom de la catégorie",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "orderRank",
      title: "Order Rank",
      type: "string", // Required for orderable documents
      hidden: true, // Hide it from the UI, it will be managed by the plugin
    },
  ],
};
