import { client } from "../../../../../../sanity/lib/client";
import Image from "next/image";
import { urlForImage } from "../../../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";
import BurstIcon from "@/assets/icons/BurstIcon";
import FacebookIconNoBorder from "@/assets/icons/FacebookIconNoBorder";
import LinkedInIconNoBorder from "@/assets/icons/LinkedInIconNoBorder";
import XIcon from "@/assets/icons/XIcon";
import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import MailIcon from "@/assets/icons/MailIcon";
import CategoryBlogSection from "../../CategoryBlogSection";

async function getArticleData(slug) {
  const articles = await client.fetch(
    `*[_type == "article" && slug.current == $slug]{
    title,
    body,
    image,
    "category": category->{title, _id, slug}
  }`,
    { slug }
  );

  const categoryArticles = await client.fetch(
    `*[_type == "article" && references($categoryId)]{
      title,
      body,
      image,
      slug,
      "category": category->{title, _id, slug}
    }`,
    { categoryId: articles[0].category._id }
  );

  return { article: articles[0], categoryArticles };
}

export default async function ArticlePage({ params }) {
  const { articleSlug } = params;
  const { article, categoryArticles } = await getArticleData(articleSlug);

  if (article.notFound) {
    return <div>Article not found</div>;
  }

  const { title, body, image, category } = article;

  return (
    <div className="bg-light-grey">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2/3 bg-dark-green"></div>
        <div className="relative container mx-auto px-5 py-9 text-white flex flex-col items-center">
          <h1 className="font-mcqueen font-bold text-3xl text-center mb-5 lg:text-4xl max-w-[610px]">
            {title}
          </h1>
          <div className="grid grid-cols-2 lg:grid-cols-[1fr,auto,1fr] items-center gap-7">
            <BurstIcon className="transform scale-x-[-1] h-10 w-10 lg:mt-9 col-start-1 row-start-1 lg:self-start  lg:place-self-end " />
            <div className="relative col-span-3 lg:col-span-1">
              {image && (
                <Image
                  src={urlForImage(image)}
                  alt={title}
                  width={610}
                  height={320}
                  className="object-cover lg:h-[320px] lg:w-[610px] rounded-[32px] border border-white"
                />
              )}
              <span className="absolute bottom-2 right-2 bg-light-green rounded-[20px] border border-white px-4 py-2">
                {category.title}
              </span>
            </div>
            <div className="row-start-1 row-span-1 col-start-1 col-span-2 place-self-center lg:col-start-3 lg:pb-16 ">
              <span className="font-extrabold">Partager :</span>
              <div className="flex items-center space-x-3 mt-2">
                <FacebookIconNoBorder className="h-4" />
                <LinkedInIconNoBorder className="h-4" />
                <XIcon className="h-4" />
                <WhatsAppIcon className="h-4" />
                <MailIcon className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5">
        <div className="prose max-w-none mb-10 text-black">
          <PortableText value={body} components={PortableTextComponents} />
        </div>
        <CategoryBlogSection
          category={category}
          articles={categoryArticles}
          customTitle="Sur le même sujet"
        />
      </div>
    </div>
  );
}
