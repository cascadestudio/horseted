import { useEffect, useState } from "react";
import PrevArrow from "@/assets/icons/PrevArrow";
import capitalizeText from "@/utils/capitalizeText";
import Radio from "@/components/input/Radio";

export default function ProductCategorySelect({
  activeSubCategory,
  onClickProductCategory,
  onClickPrev,
  activeCategory,
  subCategories,
}) {
  const [productCategory, setProductCategory] = useState([]);

  console.log("subCategories =>", subCategories);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubCategory(subCategories[0]);
    }
  }, [subCategories]);

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
                  checked={activeCategory === id || false}
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
