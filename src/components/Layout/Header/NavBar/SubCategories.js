import ItemCategories from "./ItemCategories";
import { useEffect, useState } from "react";
import { useFetchCategories } from "@/libs/hooks";

export default function SubCategories({ className, parentId }) {
  const [subCategories, setSubCategories] = useFetchCategories(parentId);

  useEffect(() => {
    fetch(`http://localhost:3000/api?query=${parentId}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(data.data);
      });
  }, []);

  return (
    <div className="absolute bg-white p-5">
      <ul>
        {subCategories.map((category) => {
          const { name, id } = category;
          return (
            <li key={name} className="mr-5">
              {name}
              {/* <ItemCategories parentId={id} /> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
