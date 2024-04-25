import getCategories from "./getCategories";
import ItemCategories from "./ItemCategories";

export default async function SubCategories({ className, parentId }) {
  const subCategories = await getCategories(parentId);

  return (
    <div className="absolute bg-white p-5">
      <ul>
        {subCategories.map((category) => {
          const { name, id } = category;
          return (
            <li key={name} className="mr-5">
              {name}
              <ItemCategories parentId={id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
