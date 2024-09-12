export const helpArticle = {
  name: "helpArticle",
  title: "Articles du centre d'aide",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre de l'article",
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
      name: "content",
      title: "Contenu",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "helpCategory",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "helpCategory" }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
};
