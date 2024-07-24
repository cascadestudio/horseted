import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import PrevArrow from "@/assets/icons/PrevArrow";
import capitalizeText from "@/utils/capitalizeText";
import Radio from "@/components/input/Radio";

export default function ProductCategorySelect({
  activeSubCategory,
  onClickProductCategory,
  onClickPrev,
  activeCategory,
}) {
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeSubCategory.id}`;
        const data = await fetchHorseted(query);
        setProductCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeSubCategory !== null && fetchCategories();
  }, [activeSubCategory]);

  return (
    <>
      <button
        className="flex items-center w-full border-b border-black pb-4 mb-4"
        onClick={() => onClickPrev()}
      >
        <PrevArrow />
        <p className="ml-3 basis-full justify-self-center font-bold">
          {capitalizeText(activeSubCategory.name)}
        </p>
      </button>
      {activeSubCategory !== null && (
        <div className="flex flex-col gap-y-4">
          {productCategory.map(({ id, name }, index) => {
            return (
              <label
                key={index}
                className="flex justify-between items-center cursor-pointer font-semibold"
              >
                {name}
                <Radio
                  className="ml-10"
                  value={name}
                  checked={activeCategory?.name === name || false}
                  onChange={() => onClickProductCategory(id, name)}
                />
              </label>
            );
          })}
        </div>
      )}
    </>
  );
}
