import Link from "next/link";

async function getCategories() {
  const res = await fetch(`${process.env.HORSETED_API_BASE_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.HORSETED_API_KEY,
      body: {
        // parentId: 167,
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
  // console.log(categories);
  return (
    <nav className={className + " py-4 border-t font-raleway font-semibold"}>
      <ul className="flex">
        {categories.map((category) => {
          const { name } = category;
          return (
            <li key={name} className="mr-5">
              {name}
            </li>
          );
        })}
      </ul>
      <div className=" border-l border-black [&>*]:ml-5">
        <Link href="/aide">Aide</Link>
        <Link href="/a-propos">À propos</Link>
        <Link href="/articles">Articles</Link>
      </div>
    </nav>
  );
}
