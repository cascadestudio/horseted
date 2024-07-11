export const article = {
  name: "article",
  title: "Articles",
  description: "📌 : sur la page d'accueil",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Identifiant",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Texte",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "isFeatured",
      title: "📌 Sur la page d'accueil",
      type: "boolean",
      description:
        "Indique si l'article doit être mis en avant sur la page d'accueil dans la section 'Astuces, Conseils et Tendances Équestres'. Recommandation : toujours avoir 3 articles sur la page d'accueil.",
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      isFeatured: "isFeatured",
    },
    prepare({ title, media, isFeatured }) {
      return {
        title: title,
        media: media,
        subtitle: isFeatured ? "📌" : "",
      };
    },
  },
};
