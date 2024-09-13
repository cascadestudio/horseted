"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChevronRight from "@/assets/icons/ChevronRight";

const helpCategoriesQuery = groq`
  *[_type == "helpCategory"]{
    title,
    slug,
    "articles": *[_type == "helpArticle" && references(^._id)]{
      title,
      slug
    }
  }
`;

export default function HelpCenter() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchHelpCategories = async () => {
      const result = await client.fetch(helpCategoriesQuery);
      setCategories(result);

      if (result.length > 0 && pathname === "/aide") {
        setActiveCategory(result[0]);
      }
    };

    fetchHelpCategories();
  }, [pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const breadcrumbs = () => {
    return [{ label: "Accueil", href: "/" }, { label: "Centre d'aide" }];
  };

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <Breadcrumbs breadcrumbs={breadcrumbs()} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Centre d'aide</h1>
        <aside className="bg-light-grey flex flex-col border border-lighter-grey">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`cursor-pointer border-lighter-grey py-5 px-9 ${
                activeCategory &&
                activeCategory.slug.current === category.slug.current
                  ? "font-extrabold border-y bg-pale-grey"
                  : "font-medium"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <h2>{category.title}</h2>
            </div>
          ))}
        </aside>
      </div>

      <div className="col-span-3 lg:col-span-2 pt-32">
        {activeCategory && (
          <div>
            <ul>
              {activeCategory.articles.length > 0 ? (
                activeCategory.articles.map((article, i) => (
                  <li
                    key={i}
                    className="font-medium border-b border-lighter-grey"
                  >
                    <a
                      href={`/aide/${activeCategory.slug.current}/${article.slug.current}`}
                      className="w-full py-4 px-6 flex items-center justify-between hover:bg-pale-grey"
                    >
                      {article.title}
                      <ChevronRight />
                    </a>
                  </li>
                ))
              ) : (
                <p>Pas d'article dans cette catégorie</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
