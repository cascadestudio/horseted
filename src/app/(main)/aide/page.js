import { client } from "../../../../sanity/lib/client";
import ArticlesList from "./ArticlesList";

export default async function AidePage() {
  const firstCategory = await client.fetch(
    `*[_type == "helpCategory"] | order(orderRank asc)[0] {
      _id,
      title,
      slug
    }`,
    { cache: "no-store" }
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
    { categoryId: firstCategory._id },
    { cache: "no-store" }
  );

  return (
    <div>
      <div className="col-span-3 lg:col-span-1">
        {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Centre d'aide</h1>
      </div>
      <ArticlesList
        articles={articles}
        categorySlug={firstCategory.slug.current}
      />
    </div>
  );
}
