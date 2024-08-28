import fetchHorseted from "@/utils/fetchHorseted";
import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import Link from "next/link";
import AccountHandler from "./AccountHandler";
import MobileMenu from "./MobileMenu";
import MessageIcon from "@/assets/icons/MessageIcon";

export default async function Header() {
  const categories = await fetchHorseted("/categories");

  return (
    <header className="lg:border-b border-b-light-green h-[var(--header-height)]">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center gap-x-7 py-5">
          <MobileMenu categories={categories} />
          <Link href="/">
            <Image
              src={HorsetedLogoBlackHorizontal}
              alt="Horseted Logo"
              priority
              className="w-[210px] h-[45px]"
            />
          </Link>
          <SearchBar className="hidden lg:block" />
          <Button href="/vendre" className="hidden lg:flex">
            Vendre
          </Button>
          <AccountHandler className={"hidden lg:block"} />
          <Link className="lg:hidden" href="/messagerie">
            <MessageIcon />
          </Link>
        </div>
        <SearchBar className="lg:hidden mt-4" />
      </div>
      <NavBar categories={categories} className="hidden lg:flex" />
    </header>
  );
}
