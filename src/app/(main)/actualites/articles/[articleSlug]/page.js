import { client } from "../../../../../../sanity/lib/client";
import Image from "next/image";
import { urlForImage } from "../../../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Button from "@/components/Button";
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

  const { title, body, image, category } = article;

  return (
    <div className="bg-light-grey">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-2/3 bg-dark-green"></div>
        <div className="relative container mx-auto px-5 py-12 text-white flex flex-col items-center">
          <h1 className="font-mcqueen font-bold text-3xl text-center mb-5 lg:text-4xl max-w-[610px]">
            {title}
          </h1>
          <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-7">
            <BurstIcon className="transform scale-x-[-1] self-start h-10 w-10 mt-9" />
            <div className="relative">
              {image && (
                <Image
                  src={urlForImage(image)}
                  alt={title}
                  width={610}
                  height={320}
                  className="object-cover rounded-[32px] border border-white"
                />
              )}
              <span className="absolute bottom-2 right-2 bg-light-green rounded-[20px] border border-white px-4 py-2">
                {category.title}
              </span>
            </div>
            <div>
              <span>Partager :</span>
              <div className="flex space-x-2 mb-5">
                <FacebookIconNoBorder />
                <LinkedInIconNoBorder />
                <XIcon />
                <WhatsAppIcon />
                <MailIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 py-12">
        <div className="prose max-w-none mb-10">
          <PortableText value={body} />
        </div>
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            <div className="mb-10">
              <h3 className="font-mcqueen font-semibold text-lg mb-3">
                Sur le même sujet
              </h3>
              {/* <CategoryBlogSection category={category}  /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
