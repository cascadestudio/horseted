import { blockContent } from "./schemaTypes/blockContent";
import { category } from "./schemaTypes/category";
import { article } from "./schemaTypes/article";
import { helpArticle } from "./schemaTypes/helpArticle";
import { helpCategory } from "./schemaTypes/helpCategory";

export const schema = {
  types: [article, category, blockContent, helpArticle, helpCategory],
};
