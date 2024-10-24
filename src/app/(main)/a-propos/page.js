import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import GooglePlayIcon from "@/assets/icons/GooglePlayIcon";
import AppleIcon from "@/assets/icons/AppleIcon";

export const metadata = {
  title: "À propos | Horseted",
  description:
    "En facilitant la revente de matériel d’équitation d’occasion, nous rendons accessible l’acquisition d’un matériel de qualité à tous les cavaliers. Cette démarche écoresponsable permet non seulement de limiter la surconsommation, mais aussi de prolonger la durée de vie de votre matériel.",
  openGraph: {
    title: "À propos | Horseted",
    description:
      "En facilitant la revente de matériel d’équitation d’occasion, nous rendons accessible l’acquisition d’un matériel de qualité à tous les cavaliers. Cette démarche écoresponsable permet non seulement de limiter la surconsommation, mais aussi de prolonger la durée de vie de votre matériel.",
  },
};

const breadcrumbs = [{ label: "Accueil", href: "/" }, { label: "Catalogue" }];

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-light-green bg-light-green bg-opacity-10">
        <div className="container mx-auto px-5 pb-8 lg:py-20 flex flex-col items-center">
          <Breadcrumbs breadcrumbs={breadcrumbs} centered />
          <p className="font-medium text-sm uppercase tracking-[0.7em] text-center mt-1 mb-4">
            Notre mission
          </p>
          <h1 className="relative font-mcqueen font-bold text-[38px] leading-10 text-center mb-4">
            Donner une <span className="text-light-green">seconde vie</span>
            <br />à votre matériel d’équitation.
            <img
              src="icons/burst.svg"
              alt="Burst Icon"
              className="absolute top-[-40px] right-0 lg:right-[-20px] "
            />
          </h1>
          <p className="font-medium text-center mb-10 max-w-[750px] ">
            En facilitant la revente de matériel d’équitation d’occasion, nous
            rendons accessible l’acquisition d’un matériel de qualité à tous les
            cavaliers. Cette démarche écoresponsable permet non seulement de
            limiter la surconsommation, mais aussi de prolonger la durée de vie
            de votre matériel.
          </p>
          <Image
            src="/images/about-image.jpg"
            alt="Photo d'une cavalière"
            className="mx-auto max-w-full max-h-[360px] object-cover rounded-[32px] mb-6"
            width={950}
            height={360}
          />
          <div className="bg-dark-green lg:flex justify-between px-7 py-4 rounded-2xl w-full">
            <p className="font-mcqueen font-bold text-[28px] leading-9 text-white text-center lg:text-start mb-4 lg:mb-0">
              Téléchargez l'Application
              <br />
              <span className="font-sans font-medium italic text-[22px] leading-9">
                Dès maintenant
              </span>
            </p>
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
        </div>
      </div>
      <div className="container mx-auto px-5 py-8 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center mb-8 lg:mb-24">
          <div className="max-w-[580px]">
            <h2 className="font-mcqueen font-bold text-[28px] leading-9 mb-5">
              L’histoire de Horseted
            </h2>
            <p className="font-medium">
              En 2022, alors qu’elle termine ses études en Marketing Digital,
              Léa, <strong>passionnée d’équitation</strong> depuis toujours, se
              pose une question :{" "}
              <span className="italic">
                comment rendre le matériel d’équitation de qualité accessible à
                tous, même à ceux qui n'ont pas les moyens d'acheter neuf ?
              </span>
              <br />
              Constatant l’absence de solutions pour la revente de matériel
              d’occasion dans ce secteur, elle décide de créer{" "}
              <strong>Horseted</strong>.
              <br />
              L’idée est simple : offrir une plateforme où les cavaliers peuvent
              vendre et acheter des articles d’équitation en toute sécurité,
              tout en donnant une seconde vie à des équipements qui auraient
              autrement pris la poussière.
            </p>
            <p className="font-medium">
              Pour Léa, cette démarche est bien plus qu'une solution économique
              : elle s’inscrit dans une volonté forte de réduire la
              surconsommation et de promouvoir une consommation plus
              respectueuse de l'environnement.
              <br />
              Avec 3 millions de cavaliers en France, Horseted répond à un
              besoin grandissant :{" "}
              <strong>
                accéder à du matériel de qualité de manière responsable.
              </strong>
            </p>
          </div>
          <Image
            src="/images/about-image-2.jpg"
            alt="Léa Escande, fondatrice de Horseted"
            width={580}
            height={580}
            className="max-w-full h-auto lg:h-[580px] object-cover rounded-[32px] mb-5 lg:mb-0"
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <Image
            src="/images/about-image-3.jpg"
            alt="Horseted, plateforme de vente de matériel d'équitation d'occasion"
            width={580}
            height={580}
            className="max-w-full h-auto lg:h-[580px] object-cover rounded-[32px] mb-5 lg:mb-0"
          />
          <div className="max-w-[580px]">
            <h2 className="font-mcqueen font-bold text-[28px] leading-9 mb-5">
              Un engagement pour l'environnement
            </h2>
            <p className="font-medium">
              Le marché de l'occasion n'est plus seulement une solution
              économique, c’est aussi une démarche responsable. Chaque article
              vendu ou acheté contribue à un mode de consommation plus durable
              en évitant le gaspillage, ls surconsommation, la surproduction
              d’articles, etc.
            </p>
            <p className="font-medium">
              En choisissant Horseted, tu participes activement à la réduction
              de l'empreinte carbone dans le monde de l’équitation. Notre
              mission est de permettre à chaque cavalier de{" "}
              <strong>renouveler son équipement</strong> sans créer de déchets
              inutiles, en prolongeant la vie des articles d’équitation de
              manière simple et efficace.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
