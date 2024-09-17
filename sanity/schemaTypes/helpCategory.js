import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";

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
    orderRankField({ type: "helpCategory", newItemPosition: "after" }),
  ],
  orderings: [orderRankOrdering],
};
