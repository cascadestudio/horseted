import ItemCategories from "./ItemCategories";
import { useState } from "react";
import { useFetchCategories } from "@/libs/hooks";

export default function SubCategories({ className, parentId }) {
  const [subCategories, setSubCategories] = useFetchCategories(parentId);
  const [selectedItemCategories, setSelectedItemCategories] = useState(null);

  return (
    <div className="absolute bg-white p-5">
      <ul>
        {subCategories.map((category) => {
          const { name, id } = category;
          return (
            <li
              key={name}
              className="mr-5"
              onClick={() => setSelectedItemCategories(id)}
            >
              {name}
              {selectedItemCategories === id && (
                <ItemCategories parentId={id} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
