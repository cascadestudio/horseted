"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import Breadcrumbs from "@/components/Breadcrumbs";

// GROQ Query to fetch help categories and articles
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
  const router = useRouter();

  useEffect(() => {
    const fetchHelpCategories = async () => {
      const result = await client.fetch(helpCategoriesQuery);
      setCategories(result);

      // Set the first category as the default if none is selected
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
    const base = [
      {
        label: "Accueil",
        href: "/",
      },
    ];
    if (!activeCategory) {
      return [
        ...base,
        {
          label: "Centre d'aide",
        },
      ];
    } else {
      return [
        ...base,
        {
          label: "Centre d'aide",
          href: "/aide",
        },
        {
          label: activeCategory.title,
        },
      ];
    }
  };

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pt-11 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <Breadcrumbs breadcrumbs={breadcrumbs()} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">
          {activeCategory ? activeCategory.title : "Centre d'aide"}
        </h1>
        <aside className="bg-light-grey flex flex-col border border-lighter-grey">
          {categories.map((category, index) => (
            <div key={index} className="p-4">
              {/* Make category title clickable */}
              <h2
                className="font-semibold cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleCategoryClick(category)}
              >
                {category.title}
              </h2>
            </div>
          ))}
        </aside>
      </div>

      {/* Second Column: Show articles of the clicked category */}
      <div className="col-span-3 lg:col-span-2">
        {activeCategory ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Articles in {activeCategory.title}
            </h2>
            <ul>
              {activeCategory.articles.length > 0 ? (
                activeCategory.articles.map((article, i) => (
                  <li key={i} className="mb-2">
                    <a
                      className="text-blue-600 hover:underline"
                      href={`/aide/${activeCategory.slug.current}/${article.slug.current}`}
                    >
                      {article.title}
                    </a>
                  </li>
                ))
              ) : (
                <p>No articles available in this category.</p>
              )}
            </ul>
          </div>
        ) : (
          <p>Please select a category to view articles.</p>
        )}
      </div>
    </div>
  );
}
