import ProductCategories from "./ProductCategories";
import { useEffect, useState, useRef } from "react";
import fetch from "@/utils/fetch";
import { useIsClickOutsideElement } from "@/utils/hooks";

export default function SubCategoriesPanel({ parentId }) {
  const panelRef = useRef();
  const [selectedSubCategoriesId, setSelectedSubCategoriesId] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const isSubCategories = subCategories.length > 0;
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(panelRef);
  const [isClickDropdown, setIsClickDropdown] = useState(false);

  console.log(selectedSubCategoriesId);
  function handleClick(id) {
    setSelectedSubCategoriesId(id);
    if (isClickOutside) {
      setIsClickDropdown(true);
    } else {
      setIsClickDropdown(!isClickDropdown);
    }
    setIsClickOutside(false);
  }

  useEffect(() => {
    const fetchSubCategories = async () => {
      const query = `/categories?parentId=${parentId}`;
      try {
        const data = await fetch(query);
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

  if (isSubCategories && !isClickOutside) {
    return (
      <div
        ref={panelRef}
        className="absolute top-[44px] bg-white border border-dark-green rounded-b-[20px] flex z-10"
      >
        <ul className="border-r">
          {subCategories?.map((category) => {
            const { name, id } = category;
            const isActive = selectedSubCategoriesId === id;
            return (
              <li
                key={name}
                className={`pt-6 pb-4 px-6  ${
                  isActive && " border-b-2 border-dark-green text-dark-green"
                }`}
              >
                <button
                  className={`capitalize`}
                  onClick={() => handleClick(id)}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedSubCategoriesId !== null && (
          <ProductCategories parentId={selectedSubCategoriesId} />
        )}
      </div>
    );
  }
}
