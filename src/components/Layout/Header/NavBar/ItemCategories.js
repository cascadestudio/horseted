import { useFetchCategories } from "@/libs/hooks";

export default function SubCategories({ className, parentId }) {
  const [itemCategories, setItemCategories] = useFetchCategories(parentId);

  return (
    <div className="absolute bg-white p-5">
      <ul>
        {itemCategories.map((category) => {
          const { name, id } = category;
          return (
            <li key={name} className="mr-5">
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
