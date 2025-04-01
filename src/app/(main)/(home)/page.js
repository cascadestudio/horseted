import ProductsSection from "@/components/ProductsSection";
import BlogSection from "./BlogSection";
import { client } from "../../../../sanity/lib/client";
import Button from "@/components/Button";
import Image from "next/image";
import missionImage1 from "@/assets/images/missionImage1.jpg";
import missionImage2 from "@/assets/images/missionImage2.jpg";
import PlayAppStoreIcons from "@/assets/icons/PlayAppStoreIcons";
import StarsGroup from "@/assets/icons/StarsGroup";
import appReviewImage1 from "@/assets/images/appReviewImage1.jpg";
import WhiteThreeStripesIcon from "@/assets/icons/WhiteThreeStripesIcon";
import appReviewImage2 from "@/assets/images/appReviewImage2.jpg";
import CategoriesSection from "./CategoriesSection";
import HeroCarousel from "@/components/HeroCarousel";
// import RightArrow from "@/assets/icons/RightArrow";
import horsetedApp from "@/assets/images/horsetedApp.png";
import EmailVerification from "./EmailVerification";
import { Suspense } from "react";
import NewPasswordModal from "./NewPasswordModal";

export default async function Home() {
  const articles = await client.fetch(`*[_type == "article"]`, {
    cache: "no-store",
  });
  const featuredArticles = articles.filter((article) => article.isFeatured);

  return (
    <main>
      <div className="relative">
        <HeroCarousel />
        <div className="text-white absolute top-1/3 px-8 lg:left-32">
          <h1 className="font-mcqueen font-bold mb-2 text-3xl text-center lg:text-left lg:text-5xl">
            Articles d’équitation <br /> de seconde main
          </h1>
          <p className="max-w-[610px] text-center lg:text-left">
            Vendez et achetez votre matériel d’équitation avec Horseted. Donnez
            une seconde vie à vos articles d’équitation en vendant votre
            matériel sur Horseted
          </p>
          <div className="mt-5 flex flex-col items-center w-full px-9 lg:px-0 lg:mt-10 lg:flex-row gap-2">
            <Button withAuth href="/vendre" className="w-full lg:w-auto">
              Vendre un article
            </Button>
            <Button
              href="/articles"
              variant="white"
              className="w-full lg:w-auto"
            >
              Parcourir les articles
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-dark-green">
        {/* V2 ? */}
        {/* <div className="container mx-auto px-5 py-10 text-white lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="font-mcqueen font-bold text-2xl mb-3 lg:text-4xl lg:mb-1">
              Personnalisez votre Horseted
            </h3>
            <p className="mb-7 lg:mb-0 text-sm">
              Personnalisez votre expérience et trouvez les articles faits pour
              vous ! Ajoutez votre pointure, tailles et préférences
            </p>
          </div>
          <Button
            variant="transparent-green"
            className=" text-white border-white"
            href="/parametres"
          >
            Personnaliser <RightArrow color="white" className="ml-2" />
          </Button>
        </div> */}
        <div className="bg-light-grey pb-12 lg:pb-20"></div>
      </div>
      <ProductsSection title="Récemment ajouté" orderBy="createdAt;desc" />
      <CategoriesSection />
      <ProductsSection
        title="Pour la cavalière"
        categoryId="1066"
        // categoryId="1160"
        categoryName="La Cavalière"
      />
      <ProductsSection
        title="Pour le cavalier"
        categoryId="1078"
        categoryName="le cavalier"
      />
      <ProductsSection
        title="Accessoires et Selles"
        categoryId="1275"
        categoryName="selles"
      />
      <div className="bg-white">
        <div className="container mx-auto px-5 py-16 lg:py-24 lg:flex lg:flex-row-reverse lg:gap-24">
          <div className="lg:w-1/2 lg:pt-20">
            <h2 className="font-mcqueen font-bold text-2xl mb-3 lg:hidden">
              Notre mission : Développement durable et passion
            </h2>
            <h2 className="font-mcqueen font-bold hidden lg:block lg:mb-4 lg:text-4xl">
              Notre mission : Agir pour le développement durable et rendre
              accessible l’équitation à tous les budgets !
            </h2>
            <p className="lg:text-[18px] mb-6">
              Nous sommes convaincus que l'équitation ne devrait pas être un
              privilège réservé à quelques-uns. En donnant une seconde vie aux
              équipements équestres, nous contribuons non seulement à rendre
              cette passion plus abordable, mais aussi à préserver les
              ressources de notre planète. Acheter et vendre des articles
              d'équitation de seconde main permet de réduire le gaspillage tout
              en maintenant un haut niveau de qualité. Ensemble, nous pouvons
              faire de l'équitation une activité plus responsable et accessible
              à tous les budgets.
            </p>
            <Button
              variant="transparent-black"
              className="w-full mb-7 lg:w-fit lg:mb-24"
              href="/a-propos"
            >
              En savoir plus
            </Button>
            <Image
              src={missionImage2}
              alt="Photo de cheval"
              sizes="(min-width: 1024px) 590px, 100vw"
              className="hidden lg:block object-cover rounded-lg lg:h-[820px] w-full lg:mx-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <div className="relative w-full h-[380px] mb-7 lg:h-[820px] lg:mb-44 lg:mx-auto">
              <Image
                src={missionImage1}
                alt="Selles et accessoires"
                fill
                sizes="(min-width: 1024px) 590px, 100vw"
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-mcqueen font-bold text-2xl mb-3 lg:mb-4 lg:text-4xl">
                Une plateforme conçue pour les acheteurs et les vendeurs
              </h2>
              <p className="lg:text-[18px]">
                Que vous soyez acheteur ou vendeur, notre plateforme est pensée
                pour offrir une expérience fluide, sécurisée et agréable. Nous
                mettons un point d'honneur à faciliter chaque étape, depuis la
                création de l'annonce jusqu'à la finalisation de la transaction.
                Vous pouvez parcourir des milliers d'articles, comparer les prix
                et trouver l'équipement qui correspond parfaitement à vos
                besoins.  
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container mx-auto px-5 pb-14 lg:pb-24">
          <div className="flex flex-col items-center lg:rounded-[56px] lg:border lg:border-black">
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:w-full">
              <PlayAppStoreIcons className="lg:w-[90px] lg:h-[33px] lg:ml-11 lg:mb-7" />
              <div className="flex flex-col items-center lg:mt-11">
                <h3 className="font-mcqueen font-bold text-2xl text-center py-2 lg:text-4xl">
                  Vous hésitez encore ?
                </h3>
                <StarsGroup className="w-[110px] mb-10 lg:w-[170px]" />
              </div>
              {/* Hidden div for now */}
              <div className="hidden lg:hidden lg:items-center lg:justify-center lg:py-7 lg:px-4 lg:bg-dark-green lg:rounded-full lg:mb-7 lg:mr-5">
                <p className="font-mcqueen font-bold text-[30px] text-center text-white">
                  4,6/5
                </p>
              </div>
              {/* Empty div for the layout */}
              <div className="lg:w-[120px]"></div>
            </div>
            <div className="lg:flex lg:items-stretch lg:mx-5 lg:gap-8 lg:pb-5">
              <div className="flex-1 relative w-full">
                <Image
                  src={appReviewImage1}
                  alt="Saut d'obstacle"
                  sizes="(min-width: 1024px) 410px, 100vw"
                  className="rounded-[32px]"
                />
                <div className="block absolute inset-0 via-transparent via-70% bg-gradient-to-tr from-black/70 to-transparent rounded-[32px]"></div>
                <WhiteThreeStripesIcon className="absolute top-52 left-8" />
                <h4 className="absolute top-60 left-10 font-black italic text-[28px] text-white">
                  La meilleure App pour l’équitation
                </h4>
              </div>
              <div className="flex-1 bg-dark-green rounded-[32px] mt-6 w-full text-white text-center py-14 px-9 flex flex-col items-center gap-10 lg:mt-0 lg:max-w-96">
                <WhiteThreeStripesIcon />
                <p>
                  J’ai acheté un équipement d’équitation de seconde main à
                  moitié prix. Je recommande !
                </p>
                <p className="font-extrabold text-lg">Élodie M</p>
              </div>
              <div className="flex-1 w-full bg-dark-grey text-white text-end rounded-[32px] mt-6 lg:mt-0">
                <Image
                  src={appReviewImage2}
                  alt="Brossage de cheval"
                  className="w-full rounded-[32px] h-[185px] object-cover"
                  sizes="(min-width: 1024px) 410px, 100vw"
                />
                <p className="px-7 mt-5">
                  Une super application pour vendre le matériel d’équitation
                  dont je ne me sers plus. Rapide et efficace !
                </p>
                <div className="mt-7 px-7 pb-3 flex flex-row-reverse justify-between">
                  <p className="font-extrabold text-lg ">Marion J</p>
                  <WhiteThreeStripesIcon className="rotate-[215deg]" />
                </div>
              </div>
            </div>
          </div>
          {/* Hidden div for now */}
          <div className="hidden items-center justify-center py-7 px-4 bg-dark-green rounded-full my-5 lg:hidden">
            <p className="font-mcqueen font-bold text-[30px] text-center text-white">
              4,6/5
            </p>
          </div>
          <div className="hidden font-mcqueen text-center leading-7 lg:leading-10 lg:mt-10">
            <p className="font-bold text-[30px]">+200 avis</p>
            <p className="text-sm lg:text-xl">
              TrustPilot - Apple Store - Play store
            </p>
          </div>
        </div>
      </div>
      <BlogSection articles={featuredArticles} />
      <div className="bg-dark-green">
        <div className="container mx-auto px-5 py-14 flex flex-col gap-14 lg:flex-row lg:gap-44 lg:py-36">
          <div>
            <h4 className="font-mcqueen font-bold text-2xl text-white mb-1 lg:text-3xl lg:mb-5">
              Pourquoi choisir des produits d'équitation de seconde main ?
            </h4>
            <p className="text-white lg:text-[18px]">
              Opter pour des équipements d'équitation de seconde main, c'est
              faire le choix de la durabilité et de l'écoresponsabilité. En
              achetant d'occasion, vous contribuez à la réduction des déchets et
              au prolongement de la vie des produits. Un équipement équestre,
              souvent conçu pour durer, peut parfaitement être utilisé par
              plusieurs cavaliers au cours de sa vie, sans perdre de sa qualité
              ou de son efficacité. Acheter des produits de seconde main permet
              également d’accéder à des marques et des équipements de qualité à
              des prix réduits, sans compromettre le confort ou la performance.
            </p>
          </div>
          <div>
            <h4 className="font-mcqueen font-bold text-2xl text-white mb-1 lg:text-3xl lg:mb-5">
              Comment bien préparer son équipement avant de le vendre ?
            </h4>
            <p className="text-white lg:text-[18px]">
              Votre équipement est trop petit ? il ne correspond plus à votre
              pratique ? Vous souhaitez le renouveler ? Mettez-le en vente
              simplement sur Horseted ! Pour réussir la vente de votre
              équipement d’équitation, il est essentiel de le préparer avec
              soin. Un nettoyage complet, en particulier pour le cuir et les
              textiles, de jolies photos, une description détaillée et un prix
              correct sont indispensables pour réaliser une vente.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-light-grey px-5 pt-16 lg:pt-32 lg:px-64">
        <div className="max-w-[920px]">
          <h3 className="font-mcqueen font-bold text-3xl text-center mb-5 lg:text-4xl">
            Téléchargez l’application Horseted
          </h3>
          <p className="font-mcqueen font-medium text-center text-lg mb-10 lg:px-7">
            Avec l’application Horseted, accédez en quelques clics à tout ce
            dont vous avez besoin pour vendre et acheter du matériel
            d’équitation où que vous soyez. Vous pouvez parcourir les annonces,
            mettre en ligne vos équipements ou encore suivre vos ventes en temps
            réel.
          </p>
          <Image
            sizes="(min-width: 1024px) 920px, 100vw"
            src={horsetedApp}
            alt="App Horseted"
            className="w-full h-auto"
          />
        </div>
      </div>
      <Suspense>
        <EmailVerification />
        <NewPasswordModal />
      </Suspense>
    </main>
  );
}
