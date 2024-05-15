import { getApi } from "@/libs/fetch";
import Image from "next/image";
import GreenThreeStripesIcon from "@/assets/icons/GreenThreeStripesIcon.svg";
import CategoryImage from "@/assets/images/CategoryImage.jpg";
import Link from "next/link";
import RightArrow from "@/assets/icons/RightArrow";
export default async function CategoriesSection() {
  const categories = await getApi("categories");
  return (
    <section className=" bg-light-grey">
      <div className="container mx-auto px-5 pt-6 pb-10 lg:pb-20 lg:pt-0">
        <h2 className="relative font-mcqueen font-bold text-2xl text-center pb-9 lg:text-4xl">
          Achetez et vendez du matériel d'équitation de qualité
          <Image
            src={GreenThreeStripesIcon}
            alt="GreenThreeStripesIcon"
            className="absolute -top-6 right-0 h-8 lg:-top-10 lg:right-24 lg:h-10"
          />
        </h2>
        <div className="grid gap-3 mb-8 lg:mb-12 lg:grid-cols-4 lg:auto-rows-[minmax(0,_0.5fr)]">
          {categories.splice(0, 4).map((category, index) => {
            return (
              <Link
                href="#"
                key={category.name}
                className={`relative border border-light-green ${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                } ${index === 1 ? "lg:col-span-2 lg:row-span-1" : ""}`}
              >
                <Image
                  src={CategoryImage}
                  alt={category.name}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="w-full object-cover h-full"
                />
                <div className="absolute bottom-0 right-0 bg-white flex items-center font-mcqueen text-[20px] gap-2 p-4">
                  {category.name}
                  <RightArrow color="black" />
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          {categories.map((category) => {
            return (
              <Link
                key={category}
                href="#"
                className="border border-black rounded-3xl py-2 px-3 mt-2 mr-2"
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
