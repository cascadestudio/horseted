import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import capitalizeText from "@/utils/capitalizeText";
import slugify from "@/utils/slugify";
import NextArrow from "@/assets/icons/NextArrow";
import PrevArrow from "@/assets/icons/PrevArrow";
import Radio from "@/components/input/Radio";

export default function CategorySelect({
  categories,
  onClickProductCategory,
  activeCategory,
  className,
  isBlack,
  title = "Catégorie",
}) {
  const [categoryStack, setCategoryStack] = useState([]);

  const navigateToCategory = (category) => {
    setCategoryStack([...categoryStack, category]);
  };

  const navigateBack = () => {
    setCategoryStack(categoryStack.slice(0, -1));
  };

  const handleSelectCategory = (id, name) => {
    onClickProductCategory(id, name);
  };

  const currentCategories =
    categoryStack.length === 0
      ? categories
      : categoryStack[categoryStack.length - 1].subCategories;

  const isLastLevel = currentCategories.every(
    (category) => !category.hasChildren
  );

  return (
    <Dropdown
      className={className}
      title={title}
      isActive={activeCategory !== null && activeCategory !== ""}
      isBlack={isBlack}
      onSelect={() => handleSelectCategory()}
    >
      <div className="min-w-64 min-h-64 py-4">
        {categoryStack.length > 0 && (
          <button
            className="flex items-center w-full border-b border-black pb-4 mb-4"
            onClick={navigateBack}
          >
            <PrevArrow />
            <p className="ml-3 basis-full justify-self-center font-bold">
              {capitalizeText(categoryStack[categoryStack.length - 1].name)}
            </p>
          </button>
        )}
        <div className="flex flex-col gap-y-4">
          {currentCategories.map((category) =>
            isLastLevel ? (
              <label
                key={category.id}
                className="flex justify-between items-center cursor-pointer font-semibold"
              >
                {capitalizeText(category.name)}
                <Radio
                  className="ml-10"
                  value={category.name}
                  checked={activeCategory === category.id}
                  onChange={() =>
                    handleSelectCategory(category.id, category.name)
                  }
                />
              </label>
            ) : (
              <button
                key={category.id}
                className="flex items-center justify-between"
                onClick={() => navigateToCategory(category)}
              >
                <div className="flex mr-14">
                  {categoryStack.length === 0 && (
                    <img
                      src={`/icons/${slugify(category.name)}.svg`}
                      alt={category.name}
                    />
                  )}
                  <p
                    className={`ml-${categoryStack.length === 0 ? 3 : 0} font-semibold`}
                  >
                    {capitalizeText(category.name)}
                  </p>
                </div>
                {category.hasChildren ? <NextArrow /> : null}
              </button>
            )
          )}
        </div>
      </div>
    </Dropdown>
  );
}
