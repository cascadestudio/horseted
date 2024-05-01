import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

export default function BlogSection({ articles }) {
  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 py-14 lg:py-28 lg:flex lg:flex-col lg:items-center">
        <h2 className="font-mcqueen font-bold text-2xl text-center mb-14 lg:text-4xl">
          Astuces, Conseils et
          <br />
          Tendances Équestres
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12">
          {articles?.length > 0 ? (
            articles.map((article) => {
              const { title, image, slug, body } = article;
              return (
                <BlogCard
                  key={title}
                  title={title}
                  body={body}
                  image={image}
                  link={slug.current}
                />
              );
            })
          ) : (
            <div className="p-4 text-red-500">No posts found</div>
          )}
        </div>
        <Button
          className="hidden lg:font-mcqueen lg:font-semibold lg:flex lg:items-center lg:mt-10"
          href="#"
        >
          Tous les articles
          <RightArrow stroke="white" className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
