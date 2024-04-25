import getCategories from "./getCategories";

export default async function SubCategories({ className, parentId }) {
  const subCategories = await getCategories(parentId);

  return (
    <ul>
      {subCategories.map((category) => {
        const { name, id } = category;
        return (
          <li key={name} className="mr-5">
            {name}
          </li>
        );
      })}
    </ul>
  );
}
