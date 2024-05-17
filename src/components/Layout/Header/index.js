import HorsetedLogo from "@/assets/logos/HorsetedLogo";
import HeartIcon from "@/assets/icons/HeartIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";
import BurgerIcon from "./BurgerIcon";
import NavBar from "./NavBar";
import Account from "./Account";

export default function Header() {
  return (
    <header className="lg:border-b border-b-light-green h-[var(--header-height)]">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center gap-x-7 py-5 ">
          <BurgerIcon className="lg:hidden" />
          <HorsetedLogo className="h-8 lg:h-auto" />
          <SearchBar className="hidden lg:block" />
          <Button className="hidden lg:block">Vendre</Button>
          <Account />
          <HeartIcon className="hidden lg:block" />
          <span className="bg-black h-5 w-px hidden lg:block"></span>
          <MessageIcon />
        </div>
        <SearchBar className="lg:hidden mt-4" />
      </div>
      <NavBar className="hidden lg:flex" />
    </header>
  );
}
