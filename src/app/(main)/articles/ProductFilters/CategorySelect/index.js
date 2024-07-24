import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import SubCategorySelect from "./SubCategorySelect";
import ProductCategorySelect from "./ProductCategorySelect";
import Dropdown from "@/components/Dropdown";
import capitalizeText from "@/utils/capitalizeText";
import slugify from "@/utils/slugify";
import NextArrow from "@/assets/icons/NextArrow";

export default function CategorySelect({ onClickProductCategory }) {
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
    <Dropdown className="mr-5" title="Catégorie">
      {activeParentCategory === null &&
        (activeParentCategory === null || activeSubCategory === null) && (
          <div className="flex flex-col gap-y-4">
            {parentCategories.map((parentCategorie) => {
              const { id, name } = parentCategorie;
              return (
                <button
                  className="flex items-center justify-between"
                  onClick={() =>
                    setActiveParentCategory({ id: id, name: name })
                  }
                  key={id}
                >
                  <div className="flex mr-14">
                    <img src={`/icons/${slugify(name)}.svg`} alt={name} />
                    <p className="ml-3 font-semibold">{capitalizeText(name)}</p>
                  </div>
                  <NextArrow className="" />
                </button>
              );
            })}
          </div>
        )}

      {activeParentCategory !== null && activeSubCategory === null && (
        <SubCategorySelect
          activeParentCategory={activeParentCategory}
          onClickSubCategory={onClickSubCategory}
          activeSubCategory={activeSubCategory}
          onClickPrev={showParentCategories}
        />
      )}

      {activeSubCategory !== null && (
        <ProductCategorySelect
          activeSubCategory={activeSubCategory}
          onClickProductCategory={onClickProductCategory}
          onClickPrev={showSubCategories}
        />
      )}
    </Dropdown>
  );
}
