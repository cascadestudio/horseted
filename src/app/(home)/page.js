import ProductsSection from "./ProductsSection";
import BlogSection from "./BlogSection";
import { client } from "../../../sanity/lib/client";
import Button from "@/components/Button";
import Image from "next/image";
import missionImage1 from "@/assets/images/missionImage1.jpg";
import missionImage2 from "@/assets/images/missionImage2.jpg";

export default async function Home() {
  const articles = await client.fetch(`*[_type == "article"]`);
  console.log(articles);

  return (
    <main>
      <ProductsSection />
      <div className="container mx-auto px-5 py-14">
        <h2 className="font-mcqueen font-bold text-2xl mb-3 lg:mb-4 lg:text-4xl">
          Notre mission : Développement durable et passion
        </h2>
        <p className="lg:text-[18px] mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
          <br />
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur
        </p>
        <Button variant={"black"} className="w-full justify-center mb-7">
          En savoir plus
        </Button>
        <div className="relative w-full h-[380px] mb-7">
          <Image
            src={missionImage1}
            fill
            sizes="(min-width: 1024px) 590px, 100vw"
            className="object-cover rounded-lg"
          />
        </div>
        <h2 className="font-mcqueen font-bold text-2xl mb-3 lg:mb-4 lg:text-4xl">
          Une plateforme conçue pour les acheteurs et les vendeurs
        </h2>
        <p className="lg:text-[18px] mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. 
        </p>
        <Image
          src={missionImage2}
          sizes="(min-width: 1024px) 590px, 100vw"
          className="hidden lg:block object-cover rounded-lg"
        />
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
