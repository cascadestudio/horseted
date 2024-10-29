import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Link from "next/link";
import AccountHandler from "./AccountHandler";
import MobileMenu from "./MobileMenu";
import { getAllCategories } from "@/fetch/categories";

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <header className="xl:border-b border-b-light-green h-[var(--header-height)]">
      <div className="container mx-auto lg:px-5">
        <div className="flex justify-between items-center xl:gap-x-[0.6rem] py-5">
          <MobileMenu categories={categories} />
          <Link href="/">
            <Image
              src={HorsetedLogoBlackHorizontal}
              alt="Logo Horseted"
              priority
              className="hidden xl:block w-[210px] h-[45px] xl:mr-1"
            />
          </Link>
          <SearchBar className="hidden xl:block" />
          <Button withAuth href="/vendre" className="hidden xl:flex">
            Vendre
          </Button>
          <AccountHandler className="hidden xl:block" />
        </div>
      </div>
      <NavBar categories={categories} className="hidden xl:flex" />
    </header>
  );
}
