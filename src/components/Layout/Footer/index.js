import HorsetedBlackIcon from "@/assets/logos/HorsetedBlackIcon";
import Button from "@/components/Button";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container mx-auto pt-20 px-5">
      <div className="flex flex-col">
        <HorsetedBlackIcon className="h-24 self-center mb-3" />
        <Button className="">Vendre maintenant</Button>
      </div>
      <div>
        <h4 className="uppercase">Horseted</h4>
        <a href="">À propos</a>
        <a href="">Aide</a>
        <a href="">Vendre</a>
        <a href="">Acheter</a>
        <a href="">Livraisons & retours</a>
        <a href="">Articles</a>
        <a href="">Écurie</a>
      </div>
      <div>
        <h4 className="uppercase">Notre sélection</h4>
        <a href="">Vêtements pour la cavalière</a>
        <a href="">Boots en cuir pour la cavalière</a>
        <a href="">Casques</a>
        <a href="">Sangles et accessoires</a>
        <a href="">Enrênements</a>
        <a href="">Selles et accessoires</a>
        <a href="">Brosses</a>
      </div>
      <div>
        <h4 className="uppercase">Légal</h4>
        <a href="">Mentions Légales</a>
        <a href="">Conditions générales des ventes</a>
        <a href="">Conditions d’utilisation</a>
        <a href="">Charte Vendeur</a>
      </div>
      <div>
        <p>SAS HORSETED copyright {currentYear}</p>
        <p>
          Site créé par <a href="">Citron Noir</a>
        </p>
      </div>
    </footer>
  );
}
