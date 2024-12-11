import { client } from "../../../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await client.fetch(
    `*[_type == "helpArticle"] {
      slug,
      helpCategory->{
        slug
      }
    }`
  );

  return articles.map((article) => ({
    categorySlug: article.helpCategory.slug.current,
    articleSlug: article.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { categorySlug, articleSlug } = params;

  const article = await client.fetch(
    `*[_type == "helpArticle" && slug.current == $articleSlug && helpCategory->slug.current == $categorySlug][0] {
      metaTitle,
      metaDescription,
    }`,
    { categorySlug, articleSlug }
  );

  if (!article) {
    return {
      title: "Article non trouvé | Horseted",
      description: "Cet article n'existe plus.",
    };
  }

  const { metaTitle, metaDescription } = article;

  return {
    title: metaTitle || "Aide | Horseted",
    description:
      metaDescription || "Découvrez nos articles d'aide sur Horseted.",
    openGraph: {
      title: metaTitle || "Aide | Horseted",
      description:
        metaDescription || "Découvrez nos articles d'aide sur Horseted.",
    },
  };
}

export default async function HelpArticlePage({ params }) {
  const { categorySlug, articleSlug } = params;

  const article = await client.fetch(
    `*[_type == "helpArticle" && slug.current == $articleSlug && helpCategory->slug.current == $categorySlug][0] {
      title,
      content,
      helpCategory->{
        title, slug
      }
    }`,
    { categorySlug, articleSlug }
  );

  if (!article) {
    return <div>Cet article n'existe plus.</div>;
  }

  const { title, content } = article;

  return (
    <div className="col-span-3 lg:col-span-2 pt-5 lg:pt-32">
      <h1 className="font-mcqueen font-bold text-3xl mb-5 lg:text-4xl">
        {title}
      </h1>
      <div className="prose max-w-none mb-10 text-black">
        <PortableText value={content} components={PortableTextComponents} />
      </div>
    </div>
  );
}
