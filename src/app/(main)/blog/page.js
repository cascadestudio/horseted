import CategoryBlogSection from "./CategoryBlogSection";
import { client } from "../../../../sanity/lib/client";
import Button from "@/components/Button";

export default async function BlogPage() {
  const articles = await client.fetch(`*[_type == "article"]`);
  const categories = await client.fetch(`*[_type == "category"]`);
  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 py-12">
        <h2 className="font-mcqueen font-bold text-2xl mb-5 lg:text-4xl">
          L'équitation, notre passion : tous les articles
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sodales ut
          eu sem integer vitae justo eget. Nibh mauris cursus mattis molestie a.
          Tristique nulla aliquet enim tortor at auctor urna nunc. Id diam
          maecenas ultricies mi. Risus viverra adipiscing at in tellus integer
          feugiat. Ut consequat semper viverra nam libero. In cursus turpis
          massa tincidunt dui ut ornare lectus. Elit pellentesque habitant morbi
          tristique senectus et netus et. Purus faucibus ornare suspendisse sed
          nisi. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu.
          Mauris rhoncus aenean vel elit. Non consectetur a erat nam at lectus.
        </p>
        <span className="font-semibold text-sm leading-[48px] uppercase tracking-[0.2em]">
          Sujets :
        </span>
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.length > 0 &&
            categories.map((category) => (
              <Button
                key={category._id}
                variant="transparent-grey"
                className="mb-2"
              >
                {category.title}
              </Button>
            ))}
        </div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryBlogSection
              key={category._id}
              category={category}
              articles={articles}
            />
          ))
        ) : (
          <div className="p-4 text-red-500">Pas d'article trouvé</div>
        )}
      </div>
    </div>
  );
}
