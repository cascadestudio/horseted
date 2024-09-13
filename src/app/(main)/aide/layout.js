"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";

// Query to fetch categories
const helpCategoriesQuery = groq`
  *[_type == "helpCategory"]{
    title,
    slug
  }
`;

function HelpLayout({ children }) {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await client.fetch(helpCategoriesQuery);
      setCategories(result);

      // Set the active category based on the current pathname
      updateActiveCategory(pathname, result);
    };

    fetchCategories();
  }, []);

  // Updates the active category whenever the pathname changes
  useEffect(() => {
    if (categories.length > 0) {
      updateActiveCategory(pathname, categories);
    }
  }, [pathname, categories]);

  // Function to update the active category based on the current path
  const updateActiveCategory = (path, categoryList) => {
    const pathParts = path.split("/");

    // Check if we are exactly on `/aide`
    if (path === "/aide" && categoryList.length > 0) {
      // If the path is `/aide`, set the first category as active
      setActiveCategory(categoryList[0]);
    } else {
      // Handle both `/aide/[categorySlug]` and `/aide/[categorySlug]/[articleSlug]`
      const categorySlug = pathParts[2] || pathParts[1];
      const activeCat = categoryList.find(
        (cat) => cat.slug.current === categorySlug
      );
      setActiveCategory(activeCat || null); // Update the active category state
    }
  };

  // Build breadcrumbs based on the active category
  const breadcrumbs = () => {
    const base = [
      {
        label: "Accueil",
        href: "/",
      },
      {
        label: "Centre d'aide",
        href: "/aide",
      },
    ];

    if (activeCategory) {
      return [
        ...base,
        {
          label: activeCategory.title,
        },
      ];
    }

    return base;
  };

  return (
    <div className="container mx-auto px-5 grid grid-cols-3 gap-4 lg:gap-14 pb-16">
      <div className="col-span-3 lg:col-span-1">
        <Breadcrumbs breadcrumbs={breadcrumbs()} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Centre d'aide</h1>
        <aside className="bg-light-grey flex flex-col border border-lighter-grey">
          {categories.map((category, index) => {
            const isActive =
              activeCategory &&
              activeCategory.slug.current === category.slug.current;
            return (
              <Link
                key={index}
                href={`/aide/${category.slug.current}`}
                className={`cursor-pointer border-lighter-grey py-5 px-9 font-medium hover:bg-pale-grey ${
                  isActive ? "bg-pale-grey font-extrabold" : ""
                }`}
              >
                {category.title}
              </Link>
            );
          })}
        </aside>
      </div>
      <div className="col-span-3 lg:col-span-2 pt-32">{children}</div>
    </div>
  );
}

export default HelpLayout;
