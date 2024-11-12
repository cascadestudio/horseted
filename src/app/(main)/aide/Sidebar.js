"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";

export default function Sidebar({ categories }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = () => {
    const base = [
      {
        label: "Accueil",
        href: "/",
      },
    ];

    if (pathSegments.length === 0 || pathSegments[0] !== "aide") {
      // Not in the help center
      return base;
    }

    // Start with the help center
    const crumbs = [
      ...base,
      {
        label: "Centre d'aide",
        href: "/aide",
      },
    ];

    if (pathSegments.length === 1) {
      // Help center main page
      crumbs[crumbs.length - 1].href = undefined; // Current page
      return crumbs;
    }

    const categorySlug = pathSegments[1];
    const category = categories.find(
      (cat) => (cat.slug.current || cat.slug) === categorySlug
    );

    crumbs.push({
      label: category?.title || categorySlug,
      href: `/aide/${categorySlug}`,
    });

    // If on category page or deeper (including article pages), set the category as current page
    if (pathSegments.length >= 2) {
      // Remove href to indicate current page
      crumbs[crumbs.length - 1].href = undefined;
    }

    // Do not add the article title to the breadcrumbs
    return crumbs;
  };

  // Determine if the first category should be active when on `/aide`
  const isOnRootAide = pathname === "/aide";

  return (
    <div className="col-span-3 lg:col-span-1">
      <div>
        <Breadcrumbs breadcrumbs={breadcrumbs()} />
        <h1 className="font-mcqueen font-bold text-4xl mb-5">Centre d'aide</h1>
      </div>
      <aside className="bg-light-grey flex flex-col border border-lighter-grey">
        {categories.map((category, index) => {
          const categorySlug = category.slug.current || category.slug;
          const categoryPath = `/aide/${categorySlug}`;
          const isFirstCategory = index === 0;
          const isActive =
            pathname === categoryPath ||
            pathname.startsWith(`${categoryPath}/`) ||
            (pathname === "/aide" && isFirstCategory);
          return (
            <Link
              key={index}
              href={`/aide/${category.slug.current}`}
              className={`cursor-pointer border-lighter-grey py-5 px-9 hover:bg-pale-grey ${
                isActive ? " font-extrabold" : "font-medium"
              }`}
            >
              {category.title}
            </Link>
          );
        })}
      </aside>
    </div>
  );
}
