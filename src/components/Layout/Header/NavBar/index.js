import CategoriesNav from "./CategoriesNav";
import Link from "next/link";

export default function NavBar({ className, categories }) {
  return (
    <nav
      className={className + " border-t font-raleway font-semibold capitalize"}
    >
      <div className="lg:flex items-center container mx-auto">
        <CategoriesNav categories={categories} />
        <div className="h-8 lg:flex items-center border-l border-black [&>*]:block [&>*]:py-3 [&>*]:px-6 ">
          <Link href="/aide">Aide</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/actualites">Actualités</Link>
        </div>
      </div>
    </nav>
  );
}
