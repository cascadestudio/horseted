import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import PrevArrow from "@/assets/icons/PrevArrow";
import capitalizeText from "@/utils/capitalizeText";
import NextArrow from "@/assets/icons/NextArrow";

export default function SubCategorySelect({
  activeParentCategory,
  onClickSubCategory,
  activeSubCategory,
  onClickPrev,
}) {
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeParentCategory.id}`;
        const data = await fetchHorseted(query);
        setSubCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeParentCategory !== null && fetchCategories();
  }, [activeParentCategory]);
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
      {activeParentCategory !== null && (
        <div className="flex flex-col gap-y-4">
          {subCategory.map(({ id, name }) => {
            return (
              <button
                onClick={() => onClickSubCategory(id, name)}
                className="flex items-center justify-between"
                key={id}
              >
                <p className="font-semibold mr-14">{name}</p>
                <NextArrow />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
