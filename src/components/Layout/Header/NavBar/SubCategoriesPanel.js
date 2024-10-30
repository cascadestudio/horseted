import ProductCategories from "./ProductCategories";
import { useEffect, useState } from "react";

export default function SubCategoriesPanel({
  subCategories,
  panelRef,
  setIsOpen,
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubCategory(subCategories[0]);
    }
  }, [subCategories]);

  return (
    <div
      ref={panelRef}
      className="absolute top-[48px] bg-white border border-light-green rounded-b-[20px] flex z-30 py-2"
    >
      <ul className="border-r px-2">
        {subCategories?.map((category) => {
          const { name, id } = category;
          const isActive = selectedSubCategory?.id === id;
          return (
            <li key={name}>
              <button
                className={`text-left w-full px-6 pt-4 pb-3 mb-1 capitalize whitespace-nowrap font-semibold ${
                  isActive && "border-b border-light-green text-light-green"
                }`}
                onClick={() => {
                  setSelectedSubCategory(category);
                  setExpandedCategoryId(null);
                }}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
      {selectedSubCategory !== null && (
        <ProductCategories
          subCategories={subCategories}
          selectedSubCategory={selectedSubCategory}
          setIsOpen={setIsOpen}
          expandedCategoryId={expandedCategoryId}
          setExpandedCategoryId={setExpandedCategoryId}
        />
      )}
    </div>
  );
}
