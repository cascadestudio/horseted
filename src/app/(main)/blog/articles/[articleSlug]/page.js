import { client } from "../../../../../../sanity/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Button from "@/components/Button";
import RightArrow from "@/assets/icons/RightArrow";

async function getArticleData(slug) {
  const articles = await client.fetch(
    `*[_type == "article" && slug.current == $slug]{
    title,
    body,
    image,
    "categories": categories[]->{title, _id, slug}
  }`,
    { slug }
  );

  if (!articles.length) {
    return { notFound: true };
  }

  return articles[0];
}

export default async function ArticlePage({ params }) {
  const { articleSlug } = params;
  const article = await getArticleData(articleSlug);

  if (article.notFound) {
    return <div>Article not found</div>;
  }

  const { title, body, image, categories } = article;

  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 py-12">
        <h1 className="font-mcqueen font-bold text-2xl mb-5 lg:text-4xl">
          {title}
        </h1>
        <div className="mb-8">
          {image && (
            <Image
              src={image}
              alt={title}
              width={800}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          )}
        </div>
        <div className="prose max-w-none mb-10">
          <PortableText value={body} />
        </div>
        <div className="mb-10">
          <h3 className="font-mcqueen font-semibold text-lg mb-3">
            Categories:
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category._id}
                href={`/blog/${category.slug.current}`}
                variant="transparent-grey"
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
        <Button href="/blog" className="mt-10">
          Tous les articles
          <RightArrow color="white" className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
