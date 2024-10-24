import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

const deskStructure = (S, context) =>
  S.list()
    .title("Gestion du blog et du centre d'aide")
    .items([
      orderableDocumentListDeskItem({
        type: "article",
        title: "Articles du blog",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Catégories du blog",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "helpArticle",
        title: "Articles du centre d'aide",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "helpCategory",
        title: "Catégories du centre d'aide",
        S,
        context,
      }),
    ]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    frFRLocale(),
  ],
});
