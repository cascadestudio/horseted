import ProductCategories from "./ProductCategories";
import { useEffect, useState } from "react";

export default function SubCategoriesPanel({
  subCategories,
  panelRef,
  setIsOpen,
}) {
  const [selectedSubCategoriesId, setSelectedSubCategoriesId] = useState(null);

  function handleClick(id) {
    setSelectedSubCategoriesId(id);
  }

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubCategoriesId(subCategories[0].id);
    }
  }, [subCategories]);

  return (
    <div
      ref={panelRef}
      className="absolute top-[48px] bg-white border border-dark-green rounded-b-[20px] flex z-10 py-2"
    >
      <ul className="border-r px-2">
        {subCategories?.map((category) => {
          const { name, id } = category;
          const isActive = selectedSubCategoriesId === id;
          return (
            <li key={name}>
              <button
                className={`text-left w-full px-6 pt-4 pb-3 mb-1 capitalize whitespace-nowrap font-semibold ${
                  isActive && "border-b border-light-green text-light-green"
                }`}
                onClick={() => handleClick(id)}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
      {selectedSubCategoriesId !== null && (
        <ProductCategories
          subCategories={subCategories}
          selectedSubCategoriesId={selectedSubCategoriesId}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
