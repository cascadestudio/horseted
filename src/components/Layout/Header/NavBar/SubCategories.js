import ItemCategories from "./ItemCategories";
import { useEffect, useState } from "react";
import { useFetchCategories } from "@/libs/hooks";

export default function SubCategories({ parentId }) {
  const [subCategories, isLoading] = useFetchCategories(parentId);
  const [selectedSubCategoriesId, setSelectedSubCategoriesId] = useState(null);
  const isSubCategories = subCategories.length > 0;

  useEffect(() => {
    isSubCategories &&
      !isLoading &&
      setSelectedSubCategoriesId(subCategories[0].id);
  }, [isLoading]);

  if (isSubCategories) {
    return (
      <div className="absolute top-[51px] bg-white p-5 border border-dark-green rounded-b-[20px]">
        <ul>
          {subCategories?.map((category) => {
            const { name, id } = category;
            const isActive = selectedSubCategoriesId === id;
            return (
              <li key={name} className="mr-5">
                <button
                  className={`${
                    isActive && " border-b-2 border-dark-green text-dark-green"
                  }`}
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
