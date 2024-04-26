import { useFetchCategories } from "@/libs/hooks";

export default function ItemCategories({ parentId }) {
  const [itemCategories] = useFetchCategories(parentId);

  if (itemCategories.length > 0) {
    return (
      <div key={itemCategories} className="p-5">
        <ul>
          {itemCategories.map((category) => {
            const { name, id } = category;
            return (
              <li key={name} className="mr-5 text-red">
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
