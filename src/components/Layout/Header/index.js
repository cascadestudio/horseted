import fetchHorseted from "@/utils/fetchHorseted";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Link from "next/link";
import AccountHandler from "./AccountHandler";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const categories = await fetchHorseted("/categories");

  return (
    <header className="xl:border-b border-b-light-green h-[var(--header-height)]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center xl:gap-x-7 py-5">
          <MobileMenu categories={categories} />
          <Link href="/">
            <Image
              src={HorsetedLogoBlackHorizontal}
              alt="Logo Horseted"
              priority
              className="hidden xl:block w-[210px] h-[45px]"
            />
          </Link>
          <SearchBar className="hidden xl:block" />
          <Button href="/vendre" className="hidden xl:flex">
            Vendre
          </Button>
          <AccountHandler className="hidden xl:block" />
        </div>
      </div>
      <NavBar categories={categories} className="hidden xl:flex" />
    </header>
  );
}
