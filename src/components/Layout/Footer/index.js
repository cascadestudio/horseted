import HorsetedBlackIcon from "@/assets/logos/HorsetedBlackIcon";
import Button from "@/components/Button";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="container mx-auto pt-20 px-11 md:flex md:justify-around md:px-0">
        <div className="flex flex-col mb-8">
          <HorsetedBlackIcon className="h-24 self-center mb-3 md:h-40 md:mb-7" />
          <Button className="px-16">Vendre maintenant</Button>
        </div>
        <div className="pb-7">
          <h4 className="uppercase font-extrabold pb-2 text-lg">Horseted</h4>
          <ul>
            <li className="pb-2">
              <a href="#">À propos</a>
            </li>
            <li className="pb-2">
              <a href="#">Aide</a>
            </li>
            <li className="pb-2">
              <a href="#">Vendre</a>
            </li>
            <li className="pb-2">
              <a href="#">Acheter</a>
            </li>
            <li className="pb-2">
              <a href="#">Livraisons & retours</a>
            </li>
            <li className="pb-2">
              <a href="#">Articles</a>
            </li>
            <li className="pb-2">
              <a href="#">Écurie</a>
            </li>
          </ul>
        </div>
        <div className="pb-7">
          <h4 className="uppercase font-extrabold pb-2 text-lg">
            Notre sélection
          </h4>
          <ul>
            <li className="pb-2">
              <a href="#">Vêtements pour la cavalière</a>
            </li>
            <li className="pb-2">
              <a href="#">Boots en cuir pour la cavalière</a>
            </li>
            <li className="pb-2">
              <a href="#">Casques</a>
            </li>
            <li className="pb-2">
              <a href="#">Sangles et accessoires</a>
            </li>
            <li className="pb-2">
              <a href="#">Enrênements</a>
            </li>
            <li className="pb-2">
              <a href="#">Selles et accessoires</a>
            </li>
            <li className="pb-2">
              <a href="#">Brosses</a>
            </li>
          </ul>
        </div>
        <div className="md:flex md:flex-col md:justify-between md:pb-7">
          <div>
            <h4 className="uppercase font-extrabold pb-2 text-lg">Légal</h4>
            <ul className="pb-9 md:pb-0">
              <li className="pb-2">
                <a href="#">Mentions légales</a>
              </li>
              <li className="pb-2">
                <a href="#">Conditions générales des ventes</a>
              </li>
              <li className="pb-2">
                <a href="#">Conditions d’utilisation</a>
              </li>
              <li className="pb-2">
                <a href="#">Charte vendeur</a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-start">
            <div className="inline-flex justify-center items-center gap-5 px-5 py-3 bg-light-grey border border-black rounded-full md:bg-transparent md:border-none md:px-0 md:py-0 md:pb-2">
              <a href="#">
                <InstagramIcon className="h-6" />
              </a>
              <a href="#">
                <YoutubeIcon className="h-6" />
              </a>
              <a href="#">
                <FacebookIcon className="h-6" />
              </a>
              <a href="#">
                <LinkedInIcon className="h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-10 bg-light-grey text-center pt-8 pb-16 md:flex md:justify-between md:px-24 md:pb-8">
        <p>SAS HORSETED copyright {currentYear}</p>
        <p className="hidden md:block">
          Site créé par{" "}
          <a href="https://citronnoir.com/" className="underline">
            Citron Noir
          </a>
        </p>
      </div>
    </>
  );
}
