"use client";

import Link from "next/link";
import { useFetchCategories } from "@/libs/hooks";
import SubCategoriesPanel from "./SubCategoriesPanel";
import { useState } from "react";

export default function NavBar({ className }) {
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [categories] = useFetchCategories();

  return (
    <nav
      className={className + " border-t font-raleway font-semibold capitalize"}
    >
      <div className="flex items-center container mx-auto">
        <ul className="flex">
          {categories.map((category) => {
            const { name, id } = category;
            const isActive = selectedSubCategories === id;
            return (
              <li key={name} className="relative">
                <button
                  onClick={() => setSelectedSubCategories(id)}
                  className={` capitalize py-3 px-6 text-center ${
                    isActive && " border-b-2 border-dark-green text-dark-green"
                  }`}
                >
                  {name}
                </button>
                {isActive && <SubCategoriesPanel parentId={id} />}
              </li>
            );
          })}
        </ul>
        <div className="h-8 flex items-center border-l border-black [&>*]:block [&>*]:py-3 [&>*]:px-6 ">
          <Link href="/aide">Aide</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/articles">Articles</Link>
        </div>
      </div>
    </nav>
  );
}
