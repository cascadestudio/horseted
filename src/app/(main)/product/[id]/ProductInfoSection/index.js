"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ShareIcon from "@/assets/icons/ShareIcon";
import Link from "next/link";
import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import profilePicture from "@/assets/images/profilePicture.jpg";
import StarRating from "@/components/StarRating";
import MessageGreenIcon from "@/assets/icons/MessageGreenIcon";
import { formatDate } from "@/utils/formatDate";
import CreateBundleModal from "../CreateBundleModal";
import OfferModal from "./OfferModal";
import { formatNumber } from "@/utils/formatNumber";

export default function ProductPageClient({
  product,
  userData,
  userProducts,
  params,
  className,
}) {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isCreateBundleModalOpen, setIsCreateBundleModalOpen] = useState(false);
  const [isBundleSummaryModalOpen, setIsBundleSummaryModalOpen] =
    useState(false);
  const [isBundleOfferModalOpen, setIsBundleOfferModalOpen] = useState(false);

  const [bundle, setBundle] = useState([]);
  const [bundlePrice, setBundlePrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(5.9);

  const handleOpenOfferModal = () => setIsOfferModalOpen(true);
  const handleCloseOfferModal = () => setIsOfferModalOpen(false);

  const handleOpenCreateBundleModal = () => {
    setIsCreateBundleModalOpen(true);
  };
  const handleCloseCreateBundleModal = () => {
    setIsCreateBundleModalOpen(false);
  };

  const handleOpenBundleSummaryModal = () => {
    setIsBundleSummaryModalOpen(true);
  };
  const handleCloseBundleSummaryModal = () => {
    setIsBundleSummaryModalOpen(false);
  };

  const handleOpenBundleOfferModal = () => {
    setIsBundleOfferModalOpen(true);
    setIsBundleSummaryModalOpen(false);
  };
  const handleCloseBundleOfferModal = () => {
    setIsBundleOfferModalOpen(false);
  };

  const {
    title,
    price,
    description,
    createdAt,
    shipping,
    brand,
    material,
    favoritCount,
    color,
    category,
    state,
    size,
  } = product;

  const formattedDate = formatDate(createdAt);

  const { username, review } = userData;
  return (
    <section className="flex flex-col mt-5 lg:mt-0 lg:ml-16 lg:max-w-[430px]">
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
            <ShareIcon />
          </Link>
          <Link href="#">
            <ThreeDotsIcon />
          </Link>
        </div>
      </div>
      <h1 className="font-mcqueen font-bold text-2xl lg:text-4xl mb-2">
        {title}
      </h1>
      <p className="text-sm leading-5 lg:text-base mb-6">{description}</p>
      <p className="font-poppins font-semibold text-2xl lg:text-[28px] leading-[42px]">
        {price} €
      </p>
      <p className="font-poppins text-light-green text-sm mb-2">
        {formatNumber(shippingPrice)} €{" "}
        <span className="font-sans">- Livraison à domicile</span>
      </p>
      <Button
        className="w-full mb-3 h-[52px] text-lg"
        isAuthProtected
        href={`/checkout?productIds=${params.id}`}
      >
        Acheter
      </Button>

      <Button
        onClick={handleOpenOfferModal}
        price={price}
        variant="transparent-green"
        className={`w-full h-[52px] text-xl ${className}`}
        isAuthProtected
      >
        Faire une offre
      </Button>
      {userProducts.items.lenght > 0 && (
        <div className="flex justify-between items-center mt-3 border border-light-green rounded-2xl pl-6 py-6 pr-3">
          <div>
            <h4 className="font-mcqueen font-bold text-lg leading-5">
              Acheter un lot
            </h4>
            <p className="text-sm">Économisez sur les frais de livraison</p>
          </div>
          <Button
            onClick={handleOpenCreateBundleModal}
            className="text-sm h-8 ml-5"
          >
            Créer un lot
          </Button>
        </div>
      )}
      <table className="table-auto mt-5">
        <tbody className="[&>tr]:flex [&>tr]:justify-between [&>tr]:border-b [&>tr]:border-grey [&>tr]:py-2 [&_td] [&_td]:font-semibold [&_td]:text-sm [&_td]:leading-6 [&_a]:text-light-green [&_a]:underline">
          <tr>
            <td>Catégorie</td>
            <td>{category && <Link href="#">{category.name}</Link>}</td>
          </tr>
          <tr>
            <td>État</td>
            <td>{state && <Link href="#">{state}</Link>}</td>
          </tr>
          <tr>
            <td>Couleurs</td>
            <td>{color && <Link href="#">{color.name}</Link>}</td>
          </tr>
          <tr>
            <td>Marque</td>
            <td>{brand && <Link href="#">{brand}</Link>}</td>
          </tr>
          <tr>
            <td>Matières</td>
            <td>{material && <Link href="#">{material}</Link>}</td>
          </tr>
          <tr>
            <td>Taille</td>
            <td>{size && <Link href="#">{size.value}</Link>}</td>
          </tr>
          <tr>
            <td>Taille du colis</td>
            <td>{shipping && <Link href="#">{shipping}</Link>}</td>
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
          <div className="flex flex-col justify-center min-w-0">
            <h4 className="font-mcqueen font-bold lg:text-lg leading-5 ml-3 truncate">
              {username}
            </h4>
            <StarRating
              className="ml-3"
              rating={review.rating}
              count={review.count}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Link
            href="#"
            className="h-8 w-8 mx-4 lg:pr-4 box-content lg:mr-4 lg:border-r border-grey flex justify-center items-center "
          >
            <MessageGreenIcon />
          </Link>
          <Button
            href="#"
            className="text-xs lg:text-sm h-8 px-4 py-2 max-w-24 lg:max-w-[110px]"
          >
            Voir le profil
          </Button>
        </div>
      </div>
      <p className="self-end text-sm lg:text-base">Ajouté le {formattedDate}</p>
      {isCreateBundleModalOpen && (
        <CreateBundleModal
          username={username}
          review={review}
          userProducts={userProducts}
          isCreateBundleModalOpen={isCreateBundleModalOpen}
          onCloseCreateBundleModal={handleCloseCreateBundleModal}
          bundle={bundle}
          setBundle={setBundle}
          bundlePrice={bundlePrice}
          setBundlePrice={setBundlePrice}
          shippingPrice={shippingPrice}
          setShippingPrice={setShippingPrice}
          isBundleSummaryModalOpen={isBundleSummaryModalOpen}
          handleOpenBundleSummaryModal={handleOpenBundleSummaryModal}
          handleCloseBundleSummaryModal={handleCloseBundleSummaryModal}
          isBundleOfferModalOpen={isBundleOfferModalOpen}
          handleOpenBundleOfferModal={handleOpenBundleOfferModal}
          handleCloseBundleOfferModal={handleCloseBundleOfferModal}
        />
      )}
      {isOfferModalOpen && (
        <OfferModal price={price} onClose={handleCloseOfferModal} />
      )}
    </section>
  );
}
