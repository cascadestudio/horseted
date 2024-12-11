import { client } from "../../../../sanity/lib/client";
import ArticlesList from "./ArticlesList";

export const revalidate = 3600;

export default async function AidePage() {
  const firstCategory = await client.fetch(
    `*[_type == "helpCategory"] | order(orderRank asc)[0] {
      _id,
      title,
      slug
    }`
  );

  const articles = await client.fetch(
    `*[_type == "helpArticle" && references($categoryId)] | order(orderRank asc) {
      title,
      slug,
      helpCategory->{
        title,
        slug
      }
    }`,
    { categoryId: firstCategory._id }
  );

  return (
    <div>
      <ArticlesList
        articles={articles}
        categorySlug={firstCategory.slug.current}
      />
    </div>
  );
}
