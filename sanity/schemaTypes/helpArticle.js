import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

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
      name: "metaTitle",
      title: "Méta Titre",
      type: "string",
      description: "Titre pour le SEO et le partage sur les réseaux sociaux.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaDescription",
      title: "Méta Description",
      type: "text",
      description:
        "Description pour le SEO et le partage sur les réseaux sociaux.",
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
    orderRankField({ type: "helpArticle", newItemPosition: "after" }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "title",
      categoryTitle: "helpCategory.title",
    },
    prepare(selection) {
      const { title, categoryTitle } = selection;
      return {
        title: title,
        subtitle: categoryTitle ? `${categoryTitle}` : "Pas de catégorie",
      };
    },
  },
};
