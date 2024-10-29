import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";
import ProductCategorySelect from "./ProductCategorySelect";
import Dropdown from "@/components/Dropdown";
import capitalizeText from "@/utils/capitalizeText";
import slugify from "@/utils/slugify";
import NextArrow from "@/assets/icons/NextArrow";

export default function CategorySelect({
  onClickProductCategory,
  activeCategory,
  className,
  isBlack,
  title = "Catégorie",
  categories,
}) {
  // const [parentCategories, setParentCategories] = useState(categories);
  // const [activeSubCategory, setActiveSubCategory] = useState(null);

  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  // console.log("expandedCategoryId =>", expandedCategoryId);

  // function onClickSubCategory(id, name) {
  //   setActiveSubCategory({ id: id, name: name });
  // }

  function showParentCategories() {
    setActiveParentCategory(null);
  }

  // function showSubCategories() {
  //   setActiveSubCategory(null);
  // }

  // const handleOnClickProductCategory = (id, name) => {
  //   onClickProductCategory(id, name);
  // };

  return (
    <Dropdown
      className={className}
      title={title}
      isActive={activeCategory !== null && activeCategory !== ""}
      isBlack={isBlack}
      onSelect={onClickProductCategory}
    >
      <div className="min-w-64 min-h-64 py-4">
        {activeParentCategory === null && (
          <div className="flex flex-col gap-y-4">
            {categories.map((category) => {
              const { id, name } = category;
              return (
                <button
                  className="flex items-center justify-between"
                  onClick={() => {
                    setActiveParentCategory(category);
                    setExpandedCategoryId(null);
                  }}
                  key={id}
                >
                  <div className="flex mr-14">
                    <img src={`/icons/${slugify(name)}.svg`} alt={name} />
                    <p className="ml-3 font-semibold">{capitalizeText(name)}</p>
                  </div>
                  <NextArrow />
                </button>
              );
            })}
          </div>
        )}
        {activeParentCategory !== null && (
          <SubCategorySelect
            activeParentCategory={activeParentCategory}
            // onClickSubCategory={onClickSubCategory}
            // activeSubCategory={activeSubCategory}
            onClickPrev={showParentCategories}
            // subCategories={activeParentCategory.subCategories || []}
            setExpandedCategoryId={setExpandedCategoryId}
            expandedCategoryId={expandedCategoryId}
          />
        )}
        {/* {activeSubCategory !== null && (
          <ProductCategorySelect
            activeSubCategory={activeSubCategory}
            onClickProductCategory={handleOnClickProductCategory}
            onClickPrev={showSubCategories}
            activeCategory={activeCategory}
          />
        )} */}
      </div>
    </Dropdown>
  );
}
