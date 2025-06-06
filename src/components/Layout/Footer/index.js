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
import FooterLink from "./FooterLink";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer>
        <div className="hidden lg:block lg:bg-[#E8E5DB] lg:border-t lg:border-light-green">
          <div className=" lg:container lg:mx-auto lg:flex lg:py-11 lg:justify-between lg:items-center lg:px-5">
            <div>
              <p className="font-mcqueen font-bold text-2xl text-center lg:text-4xl">
                Vendez votre matériel dès maintenant
              </p>
              <p>
                Vendez gratuitement votre matériel d’équitation et gagnez de
                l’argent dès maintenant !
              </p>
            </div>
            <Button withAuth href="/vendre" variant="transparent-black">
              Vendre un équipement{" "}
              <RightArrow color="black" className="lg:ml-3" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center bg-light-grey border-t border-b border-light-green pb-14 pt-12 lg:pb-[70px] lg:pt-11">
          <div className="flex flex-col mb-7 lg:mb-5">
            <BurstIcon className="self-end mr-3 lg:w-12 lg:-mr-20 lg:-mb-3" />
            <p className="text-center -mt-3 font-bold text-2xl lg:text-4xl">
              Vendez et achetez <br />
              votre matériel d’équitation
            </p>
          </div>
          <div className="lg:flex lg:gap-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.citronnoir.horseted"
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
              href="https://apps.apple.com/fr/app/horseted-mat%C3%A9riel-%C3%A9quitation/id6670403795"
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
              alt="Application Horseted"
              className="h-24 w-24 self-center mb-3 lg:h-40 lg:w-40 lg:mb-7"
            />
            <Button withAuth href="/vendre" className="px-16 w-full lg:w-auto">
              Vendre maintenant
            </Button>
          </div>
          <div className="pb-7">
            <p className="uppercase font-extrabold pb-2 text-lg">Horseted</p>
            <ul className="[&>li]:pb-2 [&>li]:font-semibold">
              <li>
                <Link href="/a-propos">À propos</Link>
              </li>
              <li>
                <Link href="/aide">Aide</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Button noStyle withAuth href="/vendre">
                  Vendre
                </Button>
              </li>
              <li>
                <Link href="/aide">Livraisons & retours</Link>
              </li>
              <li>
                <Link href="/articles">Articles</Link>
              </li>
              <li>
                <Link href="/mon-compte">Écurie</Link>
              </li>
            </ul>
          </div>
          <div className="pb-7">
            <p className="uppercase font-extrabold pb-2 text-lg">
              Notre sélection
            </p>
            <ul className="[&>li]:pb-2 [&>li]:font-semibold">
              <FooterLink
                id={1066}
                name={"Cavalière"}
                title={"Vêtements pour la cavalière"}
              />
              <FooterLink
                id={1119}
                name={"Boots pour la cavalière"}
                title={"Boots pour la cavalière"}
              />
              <FooterLink id={1147} name={"Bombes"} title={"Bombes"} />
              <FooterLink
                id={1186}
                name={"Sangles et bavettes"}
                title={"Sangles et bavettes"}
              />
              <FooterLink id={1279} name={"Licols et longes "} title={"Licols et longes "} />
              <FooterLink
                id={1264}
                name={"Selles"}
                title={"Selles"}
              />
              <FooterLink id={1360} name={"Brosse"} title={"Brosse"} />
            </ul>
          </div>
          <div className="lg:flex lg:flex-col lg:justify-between lg:pb-7">
            <div>
              <p className="uppercase font-extrabold pb-2 text-lg">Légal</p>
              <ul className="pb-9 lg:pb-0 [&>li]:pb-2 [&>li]:font-semibold">
                <li>
                  <Link href="/mentions-legales">Mentions légales</Link>
                </li>
                <li>
                  <Link href="/cgv">Conditions générales des ventes</Link>
                </li>
                <li>
                  <Link href="/cgu">Conditions d’utilisation</Link>
                </li>
                <li>
                  <Link href="/politique-de-confidentialite">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex justify-center items-center gap-5 px-5 py-3 bg-light-grey border border-black rounded-full lg:bg-transparent lg:border-none lg:px-0 lg:py-0 lg:pb-2 [&>a>svg]:h-6">
                <a
                  href="https://www.instagram.com/horseted_fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez-nous sur Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.facebook.com/horseted/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez-nous sur Facebook"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-light-grey">
          <div className="text-center pt-8 pb-16 lg:container lg:flex lg:justify-between lg:mx-auto lg:px-5 lg:pb-8">
            <p>
              SAS HORSETED copyright {currentYear} -{" "}
              <Link className="underline" href="/contact">
                Signaler un bug
              </Link>
            </p>
            <p className="hidden lg:block">
              Site créé par{" "}
              <a
                href="https://citronnoir.com/"
                className="underline"
                target="_blank"
                rel="noopener noreferrer nofollow"
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
