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
  return (
    <div className="container mx-auto px-5 flex items-start">
      <div className="w-2/3">
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
          <Image
            className="aspect-[280/340] object-cover w-20"
            src={placeholderImage}
            alt="Image du produit"
          />
        )}
      </div>
      <section className="flex flex-col ml-16">
        <div className="flex justify-between mb-2">
          <Link
            key={category.id}
            href="#"
            className="border border-black rounded-3xl py-2 px-3 mt-2 mr-2"
          >
            {category.name}
          </Link>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <HeartIcon />
              <span>{favoritCount}</span>
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
        <Button href="/checkout">Acheter</Button>
        <OfferButton />
      </section>
    </div>
  );
}
