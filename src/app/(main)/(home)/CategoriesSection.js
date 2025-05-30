import fetchHorseted from "@/utils/fetchHorseted";
import Image from "next/image";
import GreenThreeStripesIcon from "@/assets/icons/GreenThreeStripesIcon";
import categoryImage from "@/assets/images/categoryImage.jpg";
import categorieAlimentaire from "@/assets/images/categorieAlimentaire.jpg";
import categorieCavalier from "@/assets/images/categorieCavalier.jpg";
import categorieEcurie from "@/assets/images/categorieEcurie.jpg";
import categoriePansage from "@/assets/images/categoriePansage.jpg";
import categoriePoney from "@/assets/images/categoriePoney.jpg";
import categorieSoins from "@/assets/images/categorieSoins.jpg";
import Link from "next/link";
import RightArrow from "@/assets/icons/RightArrow";
import capitalizeText from "@/utils/capitalizeText";

export default async function CategoriesSection() {
  const categories = await fetchHorseted("/categories");

  const categoryImages = {
    1065: categorieCavalier,
    1160: categoriePoney,
    1359: categoriePansage,
    1425: categorieSoins,
    1491: categorieAlimentaire,
    1560: categorieEcurie
  };

  return (
    <section className=" bg-light-grey">
      <div className="container mx-auto px-5 pb-8 lg:pb-24">
        <div className="relative flex justify-center mb-9">
          <h2 className="font-mcqueen font-bold text-2xl text-center lg:text-4xl lg:text-left">
            Vendez et achetez du matériel d'équitation de qualité
          </h2>
          <GreenThreeStripesIcon className="absolute -top-10 -right-1 lg:top-0 lg:right-0 lg:relative lg:mt-[-40px]" />
        </div>
        <div className="grid gap-3 mb-8 lg:mb-12 lg:grid-cols-4 lg:auto-rows-[minmax(0,_0.5fr)]">
          {categories.splice(0, 4).map((category, index) => {
            return (
              <Link
                href={`/articles?categoryId=${category.id}&categoryName=${category.name}`}
                key={category.name}
                className={`relative border border-light-green ${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                } ${index === 1 ? "lg:col-span-2 lg:row-span-1" : ""}`}
              >
                <Image
                  src={categoryImages[category.id] ?? categoryImage}
                  alt={category.name}
                  title="Voir la catégorie"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="w-full object-cover h-full"
                />
                <div className="absolute bottom-0 right-0 bg-white flex items-center font-mcqueen text-[20px] gap-2 p-4">
                  {capitalizeText(category.name)}
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
                key={category.id}
                href={`/articles?categoryId=${category.id}&categoryName=${category.name}`}
                className="border border-black rounded-3xl py-2 px-3 mt-2 mr-2 font-semibold"
              >
                {capitalizeText(category.name)}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
