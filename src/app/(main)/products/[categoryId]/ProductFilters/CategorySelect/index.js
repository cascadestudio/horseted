import { fetchData } from "@/libs/fetch";
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

  return (
    <div>
      <button onClick={() => setIsCategoryDropdown(!isCategoryDropdown)}>
        Catégorie
      </button>

      {isCategoryDropdown && (
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

      <SubCategorySelect
        activeParentCategory={activeParentCategory}
        onClickSubCategory={onClickSubCategory}
        activeSubCategory={activeSubCategory}
      />

      <ProductCategorySelect
        activeSubCategory={activeSubCategory}
        onClickProductCategory={onClickProductCategory}
      />
    </div>
  );
}
