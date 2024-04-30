import Image from "next/image";
import HorsetedBlackIcon from "@/assets/logos/HorsetedBlackIcon";
import Button from "@/components/Button";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import PlayStoreButton from "@/assets/buttons/PlayStoreButton.svg";
import AppStoreButton from "@/assets/buttons/AppStoreButton.svg";
import BurstIcon from "@/assets/icons/BurstIcon.svg";
import HorsetedApp from "@/assets/images/HorsetedApp.png";
import RightArrow from "@/assets/icons/RightArrow.js";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
        <div className="flex flex-col items-center bg-light-grey px-5 pt-16 lg:pt-32 lg:px-64">
          <div className="max-w-[920px]">
            <h3 className="font-mcqueen font-bold text-3xl text-center mb-5 lg:text-4xl">
              Téléchargez l’application Horseted
            </h3>
            <p className="font-mcqueen font-medium text-center text-lg mb-10 lg:px-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation
            </p>
            <Image
              width={920}
              height={580}
              sizes="(min-width: 1024px) 920px, 100vw"
              src={HorsetedApp}
              alt="App Horseted"
            />
          </div>
        </div>
        <div className="hidden lg:block lg:bg-[#E8E5DB] lg:border-t lg:border-light-green">
          <div className=" lg:container lg:mx-auto lg:flex lg:py-11 lg:justify-between lg:items-center lg:px-5">
            <div>
              <h3 className="font-mcqueen font-bold text-2xl text-center lg:text-4xl">
                Vendez votre matériel dès maintenant
              </h3>
              <p>
                Vendez gratuitement votre matériel d’équitation et gagnez de
                l’argent dès maintenant !
              </p>
            </div>
            <Button className="lg:flex lg:items-center" variant="black">
              Vendre un équipement{" "}
              <RightArrow stroke="black" className="lg:ml-3" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center bg-light-grey border-t border-b border-light-green pb-14 pt-12 lg:pb-16 lg:pt-11">
          <div className="flex flex-col mb-7 lg:mb-5">
            <Image
              className="self-end mr-3 lg:w-12 lg:-mr-20 lg:-mb-3"
              src={BurstIcon}
              alt="Burst Icon"
            />
            <p className="text-center -mt-3 font-bold text-2xl lg:text-4xl">
              Achetez et vendez <br />
              votre matériel d’équitation
            </p>
          </div>
          <div className="lg:flex lg:gap-6">
            <a href="#">
              <Image
                className="pb-3 lg:pb-0"
                src={PlayStoreButton}
                alt="Télécharger sur Play Store"
              />
            </a>
            <a href="#">
              <Image src={AppStoreButton} alt="Télécharger sur App Store" />
            </a>
          </div>
        </div>
        <div className="container mx-auto pt-20 px-11 lg:flex lg:justify-around lg:px-0">
          <div className="flex flex-col mb-8">
            <HorsetedBlackIcon className="h-24 self-center mb-3 lg:h-40 lg:mb-7" />
            <Button className="px-16">Vendre maintenant</Button>
          </div>
          <div className="pb-7">
            <h4 className="uppercase font-extrabold pb-2 text-lg">Horseted</h4>
            <ul className="[&>li]:pb-2 [&>li]:font-semibold">
              <li>
                <a href="#">À propos</a>
              </li>
              <li>
                <a href="#">Aide</a>
              </li>
              <li>
                <a href="#">Vendre</a>
              </li>
              <li>
                <a href="#">Acheter</a>
              </li>
              <li>
                <a href="#">Livraisons & retours</a>
              </li>
              <li>
                <a href="#">Articles</a>
              </li>
              <li>
                <a href="#">Écurie</a>
              </li>
            </ul>
          </div>
          <div className="pb-7">
            <h4 className="uppercase font-extrabold pb-2 text-lg">
              Notre sélection
            </h4>
            <ul className="[&>li]:pb-2 [&>li]:font-semibold">
              <li>
                <a href="#">Vêtements pour la cavalière</a>
              </li>
              <li>
                <a href="#">Boots en cuir pour la cavalière</a>
              </li>
              <li>
                <a href="#">Casques</a>
              </li>
              <li>
                <a href="#">Sangles et accessoires</a>
              </li>
              <li>
                <a href="#">Enrênements</a>
              </li>
              <li>
                <a href="#">Selles et accessoires</a>
              </li>
              <li>
                <a href="#">Brosses</a>
              </li>
            </ul>
          </div>
          <div className="lg:flex lg:flex-col lg:justify-between lg:pb-7">
            <div>
              <h4 className="uppercase font-extrabold pb-2 text-lg">Légal</h4>
              <ul className="pb-9 lg:pb-0 [&>li]:pb-2 [&>li]:font-semibold">
                <li>
                  <a href="#">Mentions légales</a>
                </li>
                <li>
                  <a href="#">Conditions générales des ventes</a>
                </li>
                <li>
                  <a href="#">Conditions d’utilisation</a>
                </li>
                <li>
                  <a href="#">Charte vendeur</a>
                </li>
              </ul>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex justify-center items-center gap-5 px-5 py-3 bg-light-grey border border-black rounded-full lg:bg-transparent lg:border-none lg:px-0 lg:py-0 lg:pb-2 [&>a>svg]:h-6">
                <a href="#">
                  <InstagramIcon />
                </a>
                <a href="#">
                  <YoutubeIcon />
                </a>
                <a href="#">
                  <FacebookIcon />
                </a>
                <a href="#">
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-light-grey">
          <div className="text-center pt-8 pb-16 lg:container lg:flex lg:justify-between lg:mx-auto lg:px-5 lg:pb-8">
            <p>SAS HORSETED copyright {currentYear}</p>
            <p className="hidden lg:block">
              Site créé par{" "}
              <a href="https://citronnoir.com/" className="underline">
                Citron Noir
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
