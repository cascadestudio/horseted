import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"; // Correct import

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";

// Define a custom desk structure with orderable lists
const deskStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // Orderable list for Articles
      orderableDocumentListDeskItem({
        type: "article", // The document type
        title: "Articles du blog", // Title in the studio
        S, // Pass StructureBuilder
        context, // Pass context
      }),
      // Orderable list for Categories
      orderableDocumentListDeskItem({
        type: "category", // The document type
        title: "Catégories du blog", // Title in the studio
        S, // Pass StructureBuilder
        context, // Pass context
      }),
      // Orderable list for Help Articles
      orderableDocumentListDeskItem({
        type: "helpArticle", // The document type
        title: "Articles du centre d'aide", // Title in the studio
        S, // Pass StructureBuilder
        context, // Pass context
      }),
      // Orderable list for Help Categories
      orderableDocumentListDeskItem({
        type: "helpCategory", // The document type
        title: "Catégories du centre d'aide", // Title in the studio
        S, // Pass StructureBuilder
        context, // Pass context
      }),

      // You can add other items here
    ]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: deskStructure, // Use the custom structure with orderable lists
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    frFRLocale(),
  ],
});
