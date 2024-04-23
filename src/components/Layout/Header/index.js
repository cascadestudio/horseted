import HorsetedLogo from "@/assets/logos/HorsetedLogo";
import Button from "@/components/Button";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="container mx-auto py-5 flex">
      <HorsetedLogo />
      <SearchBar />
      <Button>Vendre</Button>
      <Button variant="white">Vendre</Button>
    </header>
  );
}
