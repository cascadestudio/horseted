import { client } from "../../../../../sanity/lib/client";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

async function getData(categorySlug) {
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $categorySlug][0]{
      _id,
      title,
      "articles": *[_type == "article" && references(^._id)]{
        title,
        body,
        image,
        slug
      }
    }`,
    { categorySlug }
  );

  if (!category) {
    return { notFound: true };
  }

  return { articles: category.articles, category: category };
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = params;
  const { articles, category, notFound } = await getData(categorySlug);

  if (notFound) {
    return <div>Catégorie introuvable</div>;
  }

  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 py-12">
        <h2 className="font-mcqueen font-bold text-2xl mb-5 lg:text-4xl">
          {category.title} Articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12">
          {articles.length > 0 ? (
            articles.map((article) => {
              const { title, image, body, slug } = article;
              return (
                <BlogCard
                  key={title}
                  title={title}
                  body={body}
                  image={image}
                  link={slug.current}
                  className="mb-8 mr-6 lg:mr-12"
                />
              );
            })
          ) : (
            <div className="p-4 text-red-500">Pas d'article trouvé</div>
          )}
        </div>
        <Button className="hidden lg:mt-10" href="/blog">
          Tous les articles
          <RightArrow color="white" className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
