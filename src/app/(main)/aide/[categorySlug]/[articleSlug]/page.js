import { client } from "../../../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import PortableTextComponents from "@/components/PortableTextComponents";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryList from "../CategoryList";

export default async function HelpArticlePage({ params }) {
  const { categorySlug, articleSlug } = params;

  const article = await client.fetch(
    `*[_type == "helpArticle" && slug.current == $articleSlug && helpCategory->slug.current == $categorySlug][0] {
      title,
      content
    }`,
    { categorySlug, articleSlug }
  );

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Centre d'aide", href: "/aide" },
    { label: categorySlug, href: `/aide/${categorySlug}` },
    { label: article.title, href: `/aide/${categorySlug}/${articleSlug}` },
  ];

  if (!article) {
    return <div>Cet article n'existe plus.</div>;
  }

  const { title, content } = article;

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Centre d'aide</h1>
        <CategoryList activeSlug={categorySlug} />
      </div>
      <div className="col-span-3 lg:col-span-2 pt-5 lg:pt-32">
        <h1 className="font-mcqueen font-bold text-3xl mb-5 lg:text-4xl">
          {title}
        </h1>
        <div className="prose max-w-none mb-10 text-black">
          <PortableText value={content} components={PortableTextComponents} />
        </div>
      </div>
    </div>
  );
}
