import HorsetedLogo from "@/assets/logos/HorsetedLogo";
import Button from "@/components/Button";

export default function Header() {
  return (
    <header className="container mx-auto py-5 flex">
      <HorsetedLogo />
      <Button>Vendre</Button>
      <Button variant="white">Vendre</Button>
    </header>
  );
}
