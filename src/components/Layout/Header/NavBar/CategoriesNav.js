"use client";
import capitalizeText from "@/utils/capitalizeText";
import SubCategoriesPanel from "./SubCategoriesPanel";
import { useState } from "react";

export default function CategoriesNav({ categories }) {
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);

  return (
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
              {capitalizeText(name)}
            </button>
            {isActive && <SubCategoriesPanel parentId={id} />}
          </li>
        );
      })}
    </ul>
  );
}
