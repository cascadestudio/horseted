import { fetchData } from "@/libs/fetch";
import { useEffect, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";

export default function CategorySelect({ onCategoryChange, activeCategory }) {
  const [isCategoryDropdown, setIsCategoryDropdown] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories`;
        const data = await fetchData(query);
        console.log("init =>", data);
        setParentCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `/categories?parentId=${activeSubCategory}`;
        const data = await fetchData(query);
        console.log("setProductCategory =>", data);
        setProductCategory(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    activeSubCategory && fetchCategories();
  }, [activeSubCategory]);

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

      {activeSubCategory !== null && (
        <div className="flex flex-col">
          {productCategory.map(({ id, name }) => {
            return (
              <button
                onClick={() => onCategoryChange(id)}
                className={activeSubCategory === id ? "active" : ""}
                key={id}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
