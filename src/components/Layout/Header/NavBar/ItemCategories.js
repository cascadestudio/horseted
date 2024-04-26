import { useFetchCategories } from "@/libs/hooks";

export default function SubCategories({ parentId }) {
  const [itemCategories] = useFetchCategories(parentId);

  return (
    <div className="p-5">
      <ul>
        {itemCategories?.map((category) => {
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
