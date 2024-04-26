"use client";

import Link from "next/link";
import { useFetchCategories } from "@/libs/hooks";
import SubCategories from "./SubCategories";
import { useState } from "react";

export default function NavBar({ className }) {
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [categories] = useFetchCategories();

  return (
    <nav className={className + " border-t font-raleway font-semibold"}>
      <div className="flex container mx-auto">
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
                {isActive && <SubCategories parentId={id} />}
              </li>
            );
          })}
        </ul>
        <div className=" border-l border-black [&>*]:ml-5">
          <Link href="/aide">Aide</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/articles">Articles</Link>
        </div>
      </div>
    </nav>
  );
}
