import { fetchData } from "@/libs/fetch";
import { useEffect, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";
import ProductCategorySelect from "./ProductCategorySelect";

export default function CategorySelect({ onClickProductCategory }) {
  const [isParentCategoryDropdown, setIsParentCategoryDropdown] =
    useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories`;
        const data = await fetchData(query);
        setParentCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function onClickSubCategory(id) {
    setActiveSubCategory(id);
  }

  function showParentCategories() {
    setActiveParentCategory(null);
  }

  function showSubCategories() {
    setActiveSubCategory(null);
  }

  return (
    <div>
      <button
        onClick={() => setIsParentCategoryDropdown(!isParentCategoryDropdown)}
      >
        Catégorie
      </button>

      {isParentCategoryDropdown &&
        (activeParentCategory === null || activeSubCategory === null) && (
          <div className="flex flex-col">
            {parentCategories.map(({ id, name }) => {
              return (
                <button onClick={() => setActiveParentCategory(id)} key={id}>
                  {name}
                </button>
              );
            })}
          </div>
        )}

      {isParentCategoryDropdown &&
        activeParentCategory !== null &&
        activeSubCategory === null && (
          <SubCategorySelect
            activeParentCategory={activeParentCategory}
            onClickSubCategory={onClickSubCategory}
            activeSubCategory={activeSubCategory}
            onClickPrev={showParentCategories}
          />
        )}

      {isParentCategoryDropdown && activeSubCategory !== null && (
        <ProductCategorySelect
          activeSubCategory={activeSubCategory}
          onClickProductCategory={onClickProductCategory}
          onClickPrev={showSubCategories}
        />
      )}
    </div>
  );
}
