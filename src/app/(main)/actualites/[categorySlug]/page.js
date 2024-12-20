import { client } from "../../../../../sanity/lib/client";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export async function generateMetadata({ params }) {
  const { categorySlug } = params;
  const { category } = await getData(categorySlug);

  const { metaTitle, metaDescription } = category;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export const revalidate = 3600;

async function getData(categorySlug) {
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $categorySlug][0]{
      _id,
      title,
      metaTitle,
      metaDescription,
      "articles": *[_type == "article" && references(^._id)] | order(orderRank asc) {
        title,
        body,
        metaDescription,
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
          {category.title}
        </h2>
        <p className="mb-8">{category.metaDescription}</p>
        <div className="grid grid-cols-1 gap-6 justify-items-center md:justify-between mb-8 md:grid-cols-[350px_350px] md:gap-8 lg:gap-[30px] xl:grid-cols-[350px_350px_350px] 2xl:grid-cols-4 xl:gap-[38px] 2xl:gap-[66px]">
          {articles.length > 0 ? (
            articles.map((article) => {
              const { title, image, metaDescription, slug } = article;
              return (
                <BlogCard
                  key={title}
                  title={title}
                  description={metaDescription}
                  image={image}
                  link={slug.current}
                />
              );
            })
          ) : (
            <div className="p-4 text-red-500">Pas d'article trouvé</div>
          )}
        </div>
        <Button className="hidden lg:mt-10" href="/actualites">
          Tous les articles
          <RightArrow color="white" className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
