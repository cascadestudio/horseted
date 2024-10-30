import { useEffect, useState } from "react";
import PrevArrow from "@/assets/icons/PrevArrow";
import capitalizeText from "@/utils/capitalizeText";
import Category from "./Category";

export default function SubCategorySelect({
  // subCategories,
  setExpandedCategoryId,
  expandedCategoryId,
  activeParentCategory,
}) {
  // console.log("activeParentCategory =>", activeParentCategory);
  return (
    <>
      {/* <button
        className="flex items-center w-full border-b border-black pb-4 mb-4"
        onClick={() => onClickPrev()}
      >
        <PrevArrow />
        <p className="ml-3 basis-full justify-self-center font-bold">
          {capitalizeText(activeParentCategory.name)}
        </p>
      </button> */}
      <div className="flex flex-col gap-y-4">
        {activeParentCategory.subCategories.map((category) => {
          // console.log("category =>", category.id);
          const isActive = expandedCategoryId === category.id;
          if (expandedCategoryId === null || isActive) {
            return (
              <Category
                isActive={isActive}
                key={category.id}
                category={category}
                expandedCategoryId={expandedCategoryId}
                setExpandedCategoryId={setExpandedCategoryId}
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
    </>
  );
}
