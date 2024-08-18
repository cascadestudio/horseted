import Image from "next/image";
import HorsetedLogoBlackHorizontal from "@/assets/logos/HorsetedLogoBlackHorizontal.svg";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import BurgerIcon from "./BurgerIcon";
import NavBar from "./NavBar";
import Link from "next/link";
import AccountHandler from "./AccountHandler";

export default function Header() {
  return (
    <header className="lg:border-b border-b-light-green h-[var(--header-height)]">
      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-x-7 py-5 ">
          <BurgerIcon className="lg:hidden" />
          <Link href="/">
            <Image
              src={HorsetedLogoBlackHorizontal}
              alt="HorsetedLogoBlackHorizontal"
              priority
              className="w-[210px] h-[45px]"
            />
          </Link>
          <SearchBar className="hidden lg:block" />
          <Button href="/vendre" className="hidden lg:flex">
            Vendre
          </Button>
          <AccountHandler />
        </div>
        <SearchBar className="lg:hidden mt-4" />
      </div>
      <NavBar className="hidden lg:flex" />
    </header>
  );
}
