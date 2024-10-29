import { useEffect, useState } from "react";
import PrevArrow from "@/assets/icons/PrevArrow";
import capitalizeText from "@/utils/capitalizeText";
import Category from "./Category";

export default function SubCategorySelect({
  activeParentCategory,
  onClickPrev,
  subCategories,
}) {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubCategory(subCategories[0]);
    }
  }, [subCategories]);

  const handleCategoryClick = (id) => {
    setExpandedCategoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <button
        className="flex items-center w-full border-b border-black pb-4 mb-4"
        onClick={() => onClickPrev()}
      >
        <PrevArrow />
        <p className="ml-3 basis-full justify-self-center font-bold">
          {capitalizeText(activeParentCategory.name)}
        </p>
      </button>
      {subCategories !== null && (
        <div className="flex flex-col gap-y-4">
          {subCategories.map((category) => {
            const isActive = selectedSubCategory?.id === category.id;
            if (expandedCategoryId === null || isActive) {
              return (
                <Category
                  isActive={isActive}
                  key={category.id}
                  category={category}
                  expandedCategoryId={expandedCategoryId}
                  onCategoryClick={handleCategoryClick}
                />

                // <button
                //   onClick={() => onClickSubCategory(id, name)}
                //   className="flex items-center justify-between"
                //   key={id}
                // >
                //   <p className="font-semibold mr-14">{name}</p>
                //   <NextArrow />
                // </button>
              );
            }
          })}
        </div>
      )}
    </>
  );
}
