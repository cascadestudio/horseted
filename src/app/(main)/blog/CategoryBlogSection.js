import BlogCard from "@/components/BlogCard";
import CardCarousel from "@/components/CardCarousel";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export default async function BlogSection({ category, articles }) {
  const categoryArticles = articles.filter((article) =>
    article.categories?.some((cat) => cat._ref === category._id)
  );
  return (
    <section className="pb-14 lg:pb-24 bg-light-grey">
      <div className="flex items-center justify-between flex-nowrap mb-4 lg:mb-5">
        <h3 className="font-mcqueen font-bold text-[20px] whitespace-nowrap lg:text-[32px]">
          {category.title}
        </h3>
        <Button
          href="/blog"
          variant="transparent-green"
          className="border-none px-0 font-bold pr-0 lg:border-solid lg:px-5"
        >
          Voir tout
          <RightArrow className="ml-2" />
        </Button>
      </div>
      <CardCarousel cardType="article">
        {categoryArticles?.length > 0 ? (
          categoryArticles.map((article) => {
            const { title, image, body, slug } = article;
            return (
              <BlogCard
                title={title}
                body={body}
                image={image}
                link={slug.current}
                key={title}
                className="mb-8 mr-6 lg:mr-12"
              />
            );
          })
        ) : (
          <div className="p-4 text-red-500">Pas d'article trouvé</div>
        )}
      </CardCarousel>
    </section>
  );
}
