import ItemCategories from "./ItemCategories";
import { useEffect, useState, useRef } from "react";
import { useFetchCategories } from "@/libs/hooks";
import { useIsClickOutsideElement } from "@/libs/hooks";

export default function SubCategoriesPanel({ parentId }) {
  const panelRef = useRef();
  const [subCategories, isLoading] = useFetchCategories(parentId);
  const [selectedSubCategoriesId, setSelectedSubCategoriesId] = useState(null);
  const isSubCategories = subCategories.length > 0;
  const isClickOutside = useIsClickOutsideElement(panelRef);

  useEffect(() => {
    if (isSubCategories && !isLoading) {
      setSelectedSubCategoriesId(subCategories[0].id);
    }
  }, [isLoading]);

  if (isSubCategories && !isClickOutside) {
    return (
      <div
        ref={panelRef}
        className="absolute top-[51px] bg-white border border-dark-green rounded-b-[20px] flex"
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
                  onClick={() => setSelectedSubCategoriesId(id)}
                >
                  {name}
                </button>
              </li>
            );
          })}
        </ul>
        {selectedSubCategoriesId !== null && (
          <ItemCategories parentId={selectedSubCategoriesId} />
        )}
      </div>
    );
  }
}