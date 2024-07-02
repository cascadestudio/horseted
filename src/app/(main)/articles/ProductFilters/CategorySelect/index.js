import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";
import ProductCategorySelect from "./ProductCategorySelect";

export default function CategorySelect({ onClickProductCategory }) {
  const [isCategoryDropdown, setIsCategoryDropdown] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories`;
        const data = await fetchHorseted(query);
        setParentCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function onClickSubCategory(id, name) {
    setActiveSubCategory({ id: id, name: name });
  }

  function showParentCategories() {
    setActiveParentCategory(null);
  }

  function showSubCategories() {
    setActiveSubCategory(null);
  }

  return (
    <div className="p-5">
      <button onClick={() => setIsCategoryDropdown(!isCategoryDropdown)}>
        Catégorie
      </button>

      {isCategoryDropdown &&
        activeParentCategory === null &&
        (activeParentCategory === null || activeSubCategory === null) && (
          <div className="flex flex-col">
            {parentCategories.map(({ id, name }) => {
              return (
                <button
                  onClick={() =>
                    setActiveParentCategory({ id: id, name: name })
                  }
                  key={id}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

      {isCategoryDropdown &&
        activeParentCategory !== null &&
        activeSubCategory === null && (
          <SubCategorySelect
            activeParentCategory={activeParentCategory}
            onClickSubCategory={onClickSubCategory}
            activeSubCategory={activeSubCategory}
            onClickPrev={showParentCategories}
          />
        )}

      {isCategoryDropdown && activeSubCategory !== null && (
        <ProductCategorySelect
          activeSubCategory={activeSubCategory}
          onClickProductCategory={onClickProductCategory}
          onClickPrev={showSubCategories}
        />
      )}
    </div>
  );
}
