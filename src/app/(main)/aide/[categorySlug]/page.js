import { client } from "../../../../../sanity/lib/client";
import ArticlesList from "../ArticlesList";

export const revalidate = 3600;

export default async function CategoryPage({ params }) {
  const { categorySlug } = params;

  const articles = await client.fetch(
    `*[_type == "helpArticle" && helpCategory->slug.current == $categorySlug] | order(orderRank asc) {
      title,
      slug,
      helpCategory->{
        title,
        slug
      }
    }`,
    { categorySlug }
  );

  return (
    <div>
      <ArticlesList articles={articles} categorySlug={categorySlug} />
    </div>
  );
}
