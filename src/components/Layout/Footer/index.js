import Image from "next/image";
import HorsetedLogoBlackIcon from "@/assets/logos/HorsetedLogoBlackIcon.svg";
import Button from "@/components/Button";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import BurstIcon from "@/assets/icons/BurstIcon";
import RightArrow from "@/assets/icons/RightArrow.js";
import GooglePlayIcon from "@/assets/icons/GooglePlayIcon";
import AppleIcon from "@/assets/icons/AppleIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
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
            <Button href="/vendre" variant="transparent-black">
              Vendre un équipement{" "}
              <RightArrow color="black" className="lg:ml-3" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center bg-light-grey border-t border-b border-light-green pb-14 pt-12 lg:pb-[70px] lg:pt-11">
          <div className="flex flex-col mb-7 lg:mb-5">
            <BurstIcon className="self-end mr-3 lg:w-12 lg:-mr-20 lg:-mb-3" />
            <p className="text-center -mt-3 font-bold text-2xl lg:text-4xl">
              Achetez et vendez <br />
              votre matériel d’équitation
            </p>
          </div>
          <div className="lg:flex lg:gap-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-black bg-white px-9 py-3 rounded-xl mb-3 lg:mb-0"
            >
              <GooglePlayIcon className="w-8 h-8 mr-4" />
              <div>
                <p className="text-[16px] leading-6 font-mcqueen">
                  Télécharger sur
                </p>
                <p className="text-2xl leading-6 font-mcqueen font-semibold">
                  Play Store
                </p>
              </div>
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center border border-black bg-white px-9 py-3 rounded-xl"
            >
              <AppleIcon className="w-auto h-8 mr-4" />
              <div>
                <p className="text-[16px] leading-6 font-mcqueen">
                  Télécharger sur
                </p>
                <p className="text-2xl leading-6 font-mcqueen font-semibold">
                  App Store
                </p>
              </div>
            </a>
          </div>
        </div>
        <div className="container mx-auto pt-12 lg:pt-[87px] px-11 lg:flex lg:justify-around lg:px-0">
          <div className="flex items-center flex-col mb-8">
            <Image
              src={HorsetedLogoBlackIcon}
              alt="Horseted Logo"
              className="h-24 w-24 self-center mb-3 lg:h-40 lg:w-40 lg:mb-7"
            />
            <Button href="/vendre" className="px-16 w-full lg:w-auto">
              Vendre maintenant
            </Button>
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
                <a href="/vendre">Vendre</a>
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
                <a href="/articles?categoryId=531&categoryName=Cavalière">
                  Vêtements pour la cavalière
                </a>
              </li>
              <li>
                <a href="/articles?categoryId=585&categoryName=Boots%20cuir">
                  Boots en cuir pour la cavalière
                </a>
              </li>
              <li>
                <a href="/articles?categoryId=614&categoryName=Casques">
                  Casques
                </a>
              </li>
              <li>
                <a href="#">Sangles et accessoires</a>
              </li>
              <li>
                <a href="#">Enrênements</a>
              </li>
              <li>
                <a href="/articles?categoryId=577&categoryName=Selles et Accessoires">
                  Selles et accessoires
                </a>
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
                  <a href="/politique-de-confidentialite">Mentions légales</a>
                </li>
                <li>
                  <a href="/cgv">Conditions générales des ventes</a>
                </li>
                <li>
                  <a href="/cgu">Conditions d’utilisation</a>
                </li>
                <li>
                  <a href="#">Charte vendeur</a>
                </li>
              </ul>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex justify-center items-center gap-5 px-5 py-3 bg-light-grey border border-black rounded-full lg:bg-transparent lg:border-none lg:px-0 lg:py-0 lg:pb-2 [&>a>svg]:h-6">
                <a
                  href="https://www.instagram.com/horseted.fr/"
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
                {/* <a href="#">
                  <YoutubeIcon />
                </a> */}
                <a href="https://www.facebook.com/horseted/" target="_blank">
                  <FacebookIcon />
                </a>
                {/* <a href="#">
                  <LinkedInIcon />
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-light-grey">
          <div className="text-center pt-8 pb-16 lg:container lg:flex lg:justify-between lg:mx-auto lg:px-5 lg:pb-8">
            <p>SAS HORSETED copyright {currentYear}</p>
            <p className="hidden lg:block">
              Site créé par{" "}
              <a
                href="https://citronnoir.com/"
                className="underline"
                target="_blank"
              >
                Citron Noir
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
