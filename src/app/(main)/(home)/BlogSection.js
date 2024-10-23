import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export default function BlogSection({ articles }) {
  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 py-14 lg:py-28 lg:flex lg:flex-col lg:items-center">
        <h2 className="font-mcqueen font-bold text-2xl text-center mb-14 lg:mb-8 lg:text-4xl">
          Astuces, Conseils et
          <br />
          Tendances Équestres
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12">
          {articles?.length > 0 ? (
            articles.slice(0, 3).map((article) => {
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
            })
          ) : (
            <div className="p-4">Pas d'article trouvé</div>
          )}
        </div>
        <Button className="mt-5 lg:mt-10" href="/actualites">
          Tous les articles
          <RightArrow color="white" className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
