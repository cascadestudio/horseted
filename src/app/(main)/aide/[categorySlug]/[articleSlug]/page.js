import { client } from "../../../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";
import Breadcrumbs from "@/components/Breadcrumbs";

// GROQ query to fetch article based on the helpArticle schema
async function getHelpArticleData(slug) {
  const articles = await client.fetch(
    `*[_type == "helpArticle" && slug.current == $slug]{
      title,
      content,
      "category": helpCategory->{title, _id, slug}
    }`,
    { slug }
  );

  return { article: articles[0] };
}

export default async function HelpArticlePage({ params }) {
  const { articleSlug } = params;
  const { article } = await getHelpArticleData(articleSlug);

  if (!article) {
    return <div>Article not found</div>;
  }

  const { title, content, category } = article;

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Centre d'aide", href: "/aide" },
    { label: category?.title, href: `/aide/${category?.slug?.current}` },
    { label: title },
  ];

  return (
    <div className="bg-light-grey">
      <div className="relative container mx-auto px-5 py-9">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="font-mcqueen font-bold text-3xl text-center mb-5 lg:text-4xl max-w-[610px]">
          {title}
        </h1>
      </div>
      <div className="container mx-auto px-5">
        <div className="prose max-w-none mb-10 text-black">
          {/* Render article content using PortableText */}
          <PortableText value={content} components={PortableTextComponents} />
        </div>
      </div>
    </div>
  );
}
