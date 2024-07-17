import fetchHorseted from "@/utils/fetchHorseted";
import Categories from "./Categories";
import Link from "next/link";

export default async function NavBar({ className }) {
  const categories = await fetchHorseted("/categories");

  return (
    <nav
      className={className + " border-t font-raleway font-semibold capitalize"}
    >
      <div className="flex items-center container mx-auto">
        <Categories categories={categories} />
        <div className="h-8 flex items-center border-l border-black [&>*]:block [&>*]:py-3 [&>*]:px-6 ">
          <Link href="/aide">Aide</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/actualites">Actualités</Link>
        </div>
      </div>
    </nav>
  );
}
