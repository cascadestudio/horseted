"use client";

import capitalizeText from "@/utils/capitalizeText";
import SubCategoriesPanel from "./SubCategoriesPanel";
import { useRef, useState } from "react";
import { useIsClickOutsideElement } from "@/utils/hooks";

export default function CategoriesNav({ categories }) {
  const buttonRef = useRef();
  const panelRef = useRef();
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClickOutside, setIsClickOutside] = useIsClickOutsideElement(
    panelRef,
    buttonRef
  );

  function handleClick(id) {
    if (isClickOutside) {
      setIsClickOutside(false);
    }
    if (id === selectedSubCategories) {
      setIsOpen(!isOpen);
    } else {
      setSelectedSubCategories(id);
      setIsOpen(true);
    }
  }

  return (
    <ul className="lg:flex">
      {categories.map((category) => {
        const { name, id } = category;
        const isActive = selectedSubCategories === id;
        const activeCategory = categories.find(
          (category) => category.id === id
        );
        return (
          <li key={name} className="relative">
            <button
              ref={buttonRef}
              onClick={() => handleClick(id)}
              className={`relative capitalize  py-3 px-6 text-center ${
                isActive && "text-light-green border-"
              }`}
            >
              {capitalizeText(name)}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-light-green"></span>
              )}
            </button>

            {!isClickOutside && isOpen && isActive && (
              <SubCategoriesPanel
                panelRef={panelRef}
                parentId={id}
                buttonRef={buttonRef}
                setIsOpen={setIsOpen}
                subCategories={activeCategory.subCategories || []}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
