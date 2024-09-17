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
    orderRankField({ type: "category", newItemPosition: "after" }),
  ],
  orderings: [orderRankOrdering],
};
