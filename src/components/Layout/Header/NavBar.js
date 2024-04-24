async function getCategories() {
  const res = await fetch(`${process.env.HORSETED_API_BASE_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.HORSETED_API_KEY,
      body: {
        parentId: 1,
      },
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function NavBar({ className }) {
  const categories = await getCategories();

  return (
    <nav className={className + " flex py-4 border-t"}>
      <ul className="flex">
        {categories.map((category) => (
          <>
            <li className="font-raleway font-semibold mr-5">{category.name}</li>
          </>
        ))}
      </ul>
    </nav>
  );
}
