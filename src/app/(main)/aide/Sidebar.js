"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ categories }) {
  const pathname = usePathname();

  return (
    <aside className="bg-light-grey flex flex-col border border-lighter-grey">
      {categories.map((category, index) => {
        const isActive = pathname === `/aide/${category.slug.current}`;
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
  );
}
