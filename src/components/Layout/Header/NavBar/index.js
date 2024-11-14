import CategoriesNav from "./CategoriesNav";
import Link from "next/link";

export default function NavBar({ className, categories }) {
  return (
    <nav className={className + " border-t font-raleway font-semibold"}>
      <div className="lg:flex items-center container mx-auto lg:px-5">
        <CategoriesNav categories={categories} />
        <div className="h-8 lg:flex items-center border-t lg:border-t-0 lg:border-l lg:border-black">
          <Link className="block py-3 lg:px-6" href="/aide">
            Aide
          </Link>
          <Link className="block py-3 lg:px-6" href="/a-propos">
            À propos
          </Link>
          <Link className="block py-3 lg:px-6" href="/actualites">
            Actualités
          </Link>
        </div>
      </div>
    </nav>
  );
}
