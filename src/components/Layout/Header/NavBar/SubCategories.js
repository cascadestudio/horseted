import ItemCategories from "./ItemCategories";
import { useEffect, useState } from "react";
import { useFetchCategories } from "@/libs/hooks";

export default function SubCategories({ parentId }) {
  const [subCategories, isLoading] = useFetchCategories(parentId);
  const [selectedSubCategories, setSelectedSubCategories] = useState();
  const isSubCategories = subCategories.length > 0;

  useEffect(() => {
    isSubCategories &&
      !isLoading &&
      setSelectedSubCategories(subCategories[0].id);
  }, [isLoading]);

  if (isSubCategories) {
    return (
      <div className="absolute top-[51px] bg-white p-5 border border-dark-green rounded-b-[20px]">
        <ul>
          {subCategories?.map((category) => {
            const { name, id } = category;
            const isActive = selectedSubCategories === id;
            return (
              <li key={name} className="mr-5">
                <button
                  className={`  ${
                    isActive && " border-b-2 border-dark-green text-dark-green"
                  }`}
                  onClick={() => setSelectedSubCategories(id)}
                >
                  {name}
                </button>
                {isActive && <ItemCategories parentId={id} />}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
