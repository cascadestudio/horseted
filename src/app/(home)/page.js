import ProductsSection from "./ProductsSection";
import BlogSection from "./BlogSection";
import { client } from "../../../sanity/lib/client";
import Button from "@/components/Button";
import Image from "next/image";
import missionImage1 from "@/assets/images/missionImage1.jpg";
import missionImage2 from "@/assets/images/missionImage2.jpg";
import PlayAppStoreIcons from "@/assets/icons/PlayAppStoreIcons.svg";
import StarsGroup from "@/assets/icons/StarsGroup.svg";
import AppReviewImage1 from "@/assets/images/AppReviewImage1.jpg";
import AppReviewImageMask from "@/assets/images/AppReviewImageMask.png";
import ThreeStripesIcon from "@/assets/icons/ThreeStripesIcon.svg";
import AppReviewImage2 from "@/assets/images/AppReviewImage2.jpg";

export default async function Home() {
  const articles = await client.fetch(`*[_type == "article"]`);

  return (
    <main>
      <ProductsSection />
      <div className="container mx-auto px-5 py-14 lg:flex lg:flex-row-reverse lg:gap-24">
        <div className="lg:pt-20">
          <h2 className="font-mcqueen font-bold text-2xl mb-3 lg:hidden">
            Notre mission : Développement durable et passion{" "}
          </h2>
          <h2 className="font-mcqueen font-bold hidden lg:block lg:mb-4 lg:text-4xl">
            Notre mission : Agir pour le développement durable et rendre
            accessible l’équitation à tous les budgets !
          </h2>
          <p className="lg:text-[18px] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            <br />
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur
          </p>
          <Button
            variant={"black"}
            className="w-full justify-center mb-7 lg:w-auto lg:mb-24"
          >
            En savoir plus
          </Button>
          <Image
            src={missionImage2}
            sizes="(min-width: 1024px) 590px, 100vw"
            className="hidden lg:block object-cover rounded-lg lg:h-[820px]"
          />
        </div>
        <div>
          <div className="relative w-full h-[380px] mb-7 lg:h-[820px] lg:mb-44">
            <Image
              src={missionImage1}
              fill
              sizes="(min-width: 1024px) 590px, 100vw"
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="font-mcqueen font-bold text-2xl mb-3 lg:mb-4 lg:text-4xl">
              Une plateforme conçue pour les acheteurs et les vendeurs
            </h2>
            <p className="lg:text-[18px] mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. 
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-5 py-14">
        <div className="flex flex-col items-center lg:rounded-[56px] lg:border lg:border-black">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:w-full">
            <Image
              className="lg:w-[90px] lg:ml-11 lg:mb-7"
              src={PlayAppStoreIcons}
              alt="PlayAppStoreIcons"
            />
            <div className="flex flex-col items-center lg:mt-11">
              <h3 className="font-mcqueen font-bold text-2xl text-center py-2 lg:text-4xl">
                Vous hésitez encore ?
              </h3>
              <Image
                src={StarsGroup}
                alt="StarsGroup"
                className="w-[110px] mb-10 lg:w-[170px]"
              />
            </div>
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:py-7 lg:px-4 lg:bg-dark-green lg:rounded-full lg:mb-7 lg:mr-5">
              <p className="font-mcqueen font-bold text-[30px] text-center text-white">
                4,6/5
              </p>
            </div>
          </div>
          <div className="lg:flex lg:items-stretch lg:mx-5 lg:gap-8 lg:pb-5">
            <div className="flex-1 relative w-full">
              <Image
                src={AppReviewImage1}
                alt="AppReviewImage1"
                sizes="(min-width: 1024px) 410px, 100vw"
                className="rounded-[32px]"
              />
              <Image
                src={AppReviewImageMask}
                alt="AppReviewImageMask"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[32px]"
              />
              <Image
                src={ThreeStripesIcon}
                alt="ThreeStripesIcon"
                className="absolute top-52 left-8"
              />
              <h4 className="absolute top-60 left-10 font-black italic text-[28px] text-white">
                La meilleure App pour l’équitation
              </h4>
            </div>
            <div className="flex-1 bg-dark-green rounded-[32px] mt-6 w-full text-white text-center py-14 px-9 flex flex-col items-center gap-10 lg:mt-0 lg:max-w-96">
              <Image
                src={ThreeStripesIcon}
                alt="ThreeStripesIcon"
                className=""
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et d
              </p>
              <p className="font-extrabold text-lg">Élodie M</p>
            </div>
            <div className="flex-1 w-full bg-dark-grey text-white text-end rounded-[32px] mt-6 lg:mt-0">
              <Image
                src={AppReviewImage2}
                alt="AppReviewImage2"
                className="w-full rounded-[32px] h-[185px] object-cover"
                sizes="(min-width: 1024px) 410px, 100vw"
              />
              <p className="px-7 mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt{" "}
              </p>
              <div className="mt-7 px-7 pb-3 flex flex-row-reverse justify-between">
                <p className="font-extrabold text-lg ">Marion J</p>
                <Image
                  src={ThreeStripesIcon}
                  alt="ThreeStripesIcon"
                  className="rotate-[215deg]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-7 px-4 bg-dark-green rounded-full my-5 lg:hidden">
            <p className="font-mcqueen font-bold text-[30px] text-center text-white">
              4,6/5
            </p>
          </div>
        </div>
        <div className="font-mcqueen text-center leading-7 lg:leading-10 lg:mt-10">
          <p className="font-bold text-[30px]">+200 avis</p>
          <p className="text-[14px] lg:text-xl">
            TrustPilot - Apple Store - Play store
          </p>
        </div>
      </div>
      <BlogSection articles={articles} />
      <div className="bg-dark-green">
        <div className="container mx-auto px-5 py-14 flex flex-col gap-14 lg:flex-row lg:gap-44 lg:py-36">
          <div>
            <h4 className="font-mcqueen font-bold text-2xl text-white mb-1 lg:text-3xl lg:mb-5">
              Pourquoi choisir des produits d'équitation de seconde main ?
            </h4>
            <p className="text-white lg:text-[18px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur
            </p>
          </div>
          <div>
            <h4 className="font-mcqueen font-bold text-2xl text-white mb-1 lg:text-3xl lg:mb-5">
              Pourquoi choisir des produits d'équitation de seconde main ?
            </h4>
            <p className="text-white lg:text-[18px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
