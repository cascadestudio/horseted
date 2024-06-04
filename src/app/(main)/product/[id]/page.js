import { getApi } from "@/libs/fetch";
import OfferButton from "./OfferButton";
import placeholderImage from "@/assets/images/placeholder.svg";
import Image from "next/image";
import Button from "@/components/Button";
import ProductImagesCarousel from "./ProductImagesCarousel";
import ProductImage from "./ProductImage";
import ShareIcon from "@/assets/icons/ShareIcon.svg";
import Link from "next/link";
import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon.svg";
import HeartIcon from "@/assets/icons/HeartIcon";
import profilePicture from "@/assets/images/profilePicture.jpg";
import StarIcon from "@/assets/icons/StarIcon.svg";
import MessageGreenIcon from "@/assets/icons/MessageGreenIcon.svg";
import ProductsSection from "@/components/ProductsSection";

export default async function ProductPage({ params }) {
  const product = await getApi(`products/${params.id}`);
  const {
    title,
    price,
    userId,
    description,
    status,
    createdAt,
    shipping,
    brand,
    material,
    favoritCount,
    color,
    category,
    state,
    medias,
  } = product;
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(createdAt));
  return (
    <div className="bg-light-grey">
      <div className="container mx-auto px-5 ">
        <div className="flex items-start border-b border-grey mb-11 py-12">
          <div className="w-3/5">
            {product.hasOwnProperty("medias") ? (
              <ProductImagesCarousel>
                {medias.map((media) => {
                  return (
                    <div key={media.id}>
                      <ProductImage media={media} />
                    </div>
                  );
                })}
              </ProductImagesCarousel>
            ) : (
              <div className="flex justify-center items-center w-full h-[calc(100vh_-_var(--header-height)-120px)]">
                <Image
                  className="aspect-[280/340] object-cover w-20"
                  src={placeholderImage}
                  alt="Image du produit"
                />
              </div>
            )}
          </div>
          <section className="flex flex-col ml-16 max-w-[430px]">
            <div className="flex items-center justify-between mb-2">
              <Link
                key={category.id}
                href="#"
                className="text-[13px] leading-4 border border-black rounded-3xl py-1 px-3"
              >
                {category.name}
              </Link>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                  <HeartIcon />
                  <span className="text-sm font-poppins">{favoritCount}</span>
                </div>
                <Link href="#">
                  <Image src={ShareIcon} alt="ShareIcon" />
                </Link>
                <Link href="#">
                  <Image src={ThreeDotsIcon} alt="ThreeDotsIcon" />
                </Link>
              </div>
            </div>
            <h1 className="font-mcqueen font-bold text-4xl mb-2">{title}</h1>
            <p className="mb-6">{description}</p>
            <p className="font-poppins font-semibold text-[28px] leading-[42px]">
              {price} €
            </p>
            <p className="font-poppins text-light-green text-sm mb-2">
              5,90€ <span className="font-sans">- Livraison à domicile</span>
            </p>
            <Button
              href="/checkout"
              className="w-full flex justify-center mb-3 h-[52px]"
            >
              Acheter
            </Button>
            <OfferButton />
            <div className="flex justify-between items-center mt-3 border border-light-green rounded-2xl pl-6 py-6 pr-3">
              <div>
                <h4 className="font-mcqueen font-bold text-lg leading-5">
                  Acheter un lot
                </h4>
                <p className="text-sm">Économisez sur les frais de livraison</p>
              </div>
              <Button href="#" className="text-sm whitespace-nowrap h-8">
                Créer un lot
              </Button>
            </div>
            <table className="table-auto mt-5">
              <tbody className="[&>tr]:flex [&>tr]:justify-between [&>tr]:border-b [&>tr]:border-grey [&>tr]:py-2 [&_td] [&_td]:font-semibold [&_td]:text-sm [&_td]:leading-6 [&_a]:text-light-green [&_a]:underline">
                <tr>
                  <td>Catégorie</td>
                  <td>
                    <Link href="#">{category.name}</Link>
                  </td>
                </tr>
                <tr>
                  <td>État</td>
                  <td>
                    <Link href="#">{state}</Link>
                  </td>
                </tr>
                <tr>
                  <td>Couleurs</td>
                  <td>
                    <Link href="#">{color.name}</Link>
                  </td>
                </tr>
                <tr>
                  <td>Marque</td>
                  <td>
                    <Link href="#">{brand}</Link>
                  </td>
                </tr>
                <tr>
                  <td>Matières</td>
                  <td>
                    <Link href="#">{material}</Link>
                  </td>
                </tr>
                <tr>
                  <td>Taille</td>
                  <td>
                    <Link href="#">16 ans</Link>
                  </td>
                </tr>
                <tr>
                  <td>Taille du colis</td>
                  <td>
                    <Link href="#">{shipping}</Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between w-full mt-3 mb-5">
              <div className="flex">
                <Image
                  src={profilePicture}
                  alt="Photo de profil"
                  className="h-14 w-14 object-cover rounded-full"
                />
                <div>
                  <h4 className="font-mcqueen font-bold text-lg leading-5 ml-3">
                    Alexandra-ast
                  </h4>
                  <div className="flex items-center ml-3">
                    <Image src={StarIcon} alt="StarIcon" />
                    <Image src={StarIcon} alt="StarIcon" />
                    <Image src={StarIcon} alt="StarIcon" />
                    <Image src={StarIcon} alt="StarIcon" />
                    <Image src={StarIcon} alt="StarIcon" />
                    <span className="ml-2">(6)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  href="#"
                  className="h-8 w-8 pr-4 box-content mr-4 border-r border-grey flex justify-center items-center "
                >
                  <Image src={MessageGreenIcon} alt="Écrire un message" />
                </Link>
                <Button
                  href="#"
                  className="text-sm whitespace-nowrap h-8 px-4 py-2 flex justify-center max-w-[110px]"
                >
                  Voir le profil
                </Button>
              </div>
            </div>
            <p className="self-end">Ajouté le {formattedDate}</p>
          </section>
        </div>
      </div>
      <ProductsSection title="Sellerie de" />
      <ProductsSection title="Articles similaires" />
    </div>
  );
}
