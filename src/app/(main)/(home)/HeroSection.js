import Button from "@/components/Button";
import HeroCarousel from "@/components/HeroCarousel";

export default function HeroSection() {
  return (
    <div className="relative">
      <HeroCarousel />
      <div className="text-white absolute top-1/2 px-8 lg:left-32">
        <h1 className="font-mcqueen font-bold mb-2 text-3xl text-center lg:text-left lg:text-5xl">
          Articles d’équitation <br /> de seconde main
        </h1>
        <p className="max-w-[610px] text-center lg:text-left">
          Achetez et vendez votre matériel d’équitation avec Horseted. Donnez
          une seconde vie à vos articles d’équitation en vendant votre matériel
          sur Horseted
        </p>
        <div className="mt-5 flex flex-col items-center w-full px-9 lg:px-0 lg:mt-10 lg:flex-row gap-2">
          <Button className="w-full justify-center lg:w-auto">
            Vendre un article
          </Button>
          <Button variant="white" className="w-full justify-center lg:w-auto">
            Parcourir les articles
          </Button>
        </div>
      </div>
    </div>
  );
}
