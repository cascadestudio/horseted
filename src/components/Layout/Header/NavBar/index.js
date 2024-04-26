"use client";

import Link from "next/link";
import { useFetchCategories } from "@/libs/hooks";
import SubCategories from "./SubCategories";
import { useState } from "react";

export default function NavBar({ className }) {
  const [isSubCategories, setIsSubCategories] = useState(false);
  const [categories, setCategories] = useFetchCategories();

  return (
    <nav className={className + " py-4 border-t font-raleway font-semibold"}>
      <ul className="flex">
        {categories.map((category) => {
          const { name, id } = category;
          return (
            <li
              key={name}
              className="mr-5"
              onClick={() => setIsSubCategories(true)}
            >
              {name}
              {isSubCategories && <SubCategories parentId={id} />}
            </li>
          );
        })}
      </ul>
      <div className=" border-l border-black [&>*]:ml-5">
        <Link href="/aide">Aide</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/articles">Articles</Link>
      </div>
    </nav>
  );
}
