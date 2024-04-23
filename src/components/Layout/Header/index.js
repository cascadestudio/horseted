import HorsetedLogo from "@/assets/logos/HorsetedLogo";
import HeartIcon from "@/assets/icons/HeartIcon";
import MessageIcon from "@/assets/icons/MessageIcon";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="container mx-auto py-5 flex justify-between items-center gap-x-7">
      <HorsetedLogo />
      <SearchBar />
      <Button>Vendre</Button>
      <Button variant="white">Vendre</Button>
      <HeartIcon />
      <span className="bg-black h-5 w-px"></span>
      <MessageIcon />
    </header>
  );
}
