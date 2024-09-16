import { groq } from "next-sanity";
import { client } from "../../../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";

// Query to fetch the article data along with its category
const articleQuery = groq`
  *[_type == "helpArticle" && slug.current == $articleSlug][0]{
    title,
    content,
    "category": helpCategory->{title, slug, 
      "relatedArticles": *[_type == "helpArticle" && references(^._id)] | order(orderRank asc) {
        title,
        slug
      }
    }
  }
`;

export default async function HelpArticlePage({ params }) {
  const { articleSlug } = params;
  const article = await client.fetch(articleQuery, { articleSlug });

  if (!article) {
    return <div>Cet article n'existe plus.</div>;
  }

  const { title, content, category } = article;

  return (
    <div>
      {/* Layout will handle the breadcrumb using the category */}
      <h1 className="font-mcqueen font-bold text-3xl mb-5 lg:text-4xl">
        {title}
      </h1>
      <div className="prose max-w-none mb-10 text-black">
        <PortableText value={content} components={PortableTextComponents} />
      </div>
    </div>
  );
}
