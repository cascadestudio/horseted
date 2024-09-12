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
  ],
};
