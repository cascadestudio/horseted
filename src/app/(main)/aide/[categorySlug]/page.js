import CategoryList from "./CategoryList";
import Breadcrumbs from "@/components/Breadcrumbs";
import { client } from "../../../../../sanity/lib/client";
import ChevronRight from "@/assets/icons/ChevronRight";

export default async function CategoryPage({ params }) {
  const { categorySlug } = params;

  const articles = await client.fetch(
    `*[_type == "helpArticle" && helpCategory->slug.current == $categorySlug] | order(orderRank asc) {
      title,
      slug,
      helpCategory->{
        title,
        slug
      }
    }`,
    { categorySlug }
  );

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Centre d'aide", href: "/aide" },
    { label: articles[0]?.helpCategory.title, href: `/aide/${categorySlug}` },
  ];

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Centre d'aide</h1>
        <CategoryList activeSlug={categorySlug} />
      </div>
      <div className="col-span-3 lg:col-span-2 pt-5 lg:pt-[134px]">
        <ul>
          {articles.map((article) => (
            <li
              key={article.slug.current}
              className="font-medium border-b border-lighter-grey"
            >
              <a
                href={`/aide/${categorySlug}/${article.slug.current}`}
                className="w-full py-4 px-6 flex items-center justify-between hover:bg-pale-grey"
              >
                {article.title}
                <ChevronRight />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
