import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

export const category = {
  name: "category",
  title: "Catégories du blog",
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
      name: "metaTitle",
      title: "Méta Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaDescription",
      title: "Méta Description",
      type: "text",
      description:
        "Description pour le SEO et le partage sur les réseaux sociaux. Doit avoir 155 caractères maximum.",
      validation: (Rule) => Rule.required(),
    },
    orderRankField({ type: "category", newItemPosition: "after" }),
  ],
  orderings: [orderRankOrdering],
};
