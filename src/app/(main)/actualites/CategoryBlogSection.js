import BlogCard from "@/components/BlogCard";
import CardCarousel from "@/components/CardCarousel";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export default async function CategoryBlogSection({
  category,
  articles,
  customTitle,
  currentArticleSlug,
}) {
  const categoryArticles = articles.filter(
    (article) =>
      article.category &&
      article.category._id === category._id &&
      article.slug.current !== currentArticleSlug
  );
  const title = customTitle || category.title;

  if (categoryArticles.length === 0) {
    return null;
  }

  return (
    <section className="pb-8 bg-light-grey">
      <div className="flex items-center justify-between flex-nowrap mb-4 lg:mb-5">
        <h3 className="font-mcqueen font-bold text-[20px] whitespace-nowrap lg:text-[32px]">
          {title}
        </h3>
        <Button
          href={`/actualites/${category.slug.current}`}
          variant="transparent-green"
          className="border-none px-0 font-bold pr-0 lg:border-solid lg:px-5"
        >
          Voir tout
          <RightArrow className="ml-2" />
        </Button>
      </div>
      <div className="hidden lg:block">
        {categoryArticles.length < 4 ? (
          <div className="grid grid-cols-1 gap-6 justify-items-center sm:justify-items-start mb-8 md:grid-cols-[350px_350px] md:gap-8 lg:gap-[30px] xl:grid-cols-[350px_350px_350px] xl:gap-[38px] 2xl:gap-[66px]">
            {categoryArticles.map((article) => {
              const { title, image, metaDescription, slug } = article;
              return (
                <BlogCard
                  title={title}
                  description={metaDescription}
                  image={image}
                  link={slug.current}
                  key={title}
                />
              );
            })}
          </div>
        ) : (
          <CardCarousel cardType="article">
            {categoryArticles.map((article) => {
              const { title, image, metaDescription, slug } = article;
              return (
                <BlogCard
                  title={title}
                  description={metaDescription}
                  image={image}
                  link={slug.current}
                  key={title}
                  className="mb-8"
                />
              );
            })}
          </CardCarousel>
        )}
      </div>
      <div className="block lg:hidden">
        <CardCarousel className="blog-carousel" cardType="article">
          {categoryArticles.map((article) => {
            const { title, image, metaDescription, slug } = article;
            return (
              <BlogCard
                title={title}
                description={metaDescription}
                image={image}
                link={slug.current}
                key={title}
                className="mb-8"
              />
            );
          })}
        </CardCarousel>
      </div>
    </section>
  );
}
