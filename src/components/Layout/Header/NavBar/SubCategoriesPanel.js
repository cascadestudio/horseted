import ProductCategories from "./ProductCategories";
import { useEffect, useState, useRef } from "react";
import fetchHorseted from "@/utils/fetchHorseted";

export default function SubCategoriesPanel({ parentId, panelRef, setIsOpen }) {
  const [selectedSubCategoriesId, setSelectedSubCategoriesId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const isSubCategories = subCategories.length > 0;

  function handleClick(id) {
    setSelectedSubCategoriesId(id);
  }

  useEffect(() => {
    const fetchSubCategories = async () => {
      const query = `/categories?parentId=${parentId}`;
      try {
        const data = await fetchHorseted(query);
        setSubCategories(data);
      } catch (error) {
        console.error(`Error fetching ${query}:`, error);
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (subCategories.length > 0) {
      setSelectedSubCategoriesId(subCategories[0].id);
    }
  }, [subCategories]);

  console.log(subCategories);

  if (isSubCategories) {
    return (
      <div
        ref={panelRef}
        className="absolute top-[44px] bg-white border border-dark-green rounded-b-[20px] flex z-10 py-2"
      >
        <ul className="border-r px-2">
          {subCategories?.map((category) => {
            const { name, id } = category;
            const isActive = selectedSubCategoriesId === id;
            return (
              <li key={name}>
                <button
                  className={`text-left w-full px-6 pt-4 pb-3 mb-1 capitalize whitespace-nowrap font-semibold ${
                    isActive && "border-b border-light-green text-light-green"
                  }`}
                  onClick={() => handleClick(id)}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedSubCategoriesId !== null && (
          <ProductCategories
            parentId={selectedSubCategoriesId}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    );
  }
}
