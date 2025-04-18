"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import ShareIcon from "@/assets/icons/ShareIcon";
import Link from "next/link";
import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import { ISOtoDate } from "@/utils/formatDate";
import CreateBundleModal from "../CreateBundleModal";
import OfferModal from "./OfferModal";
import FavoriteButton from "@/components/FavoriteButton";
import SellerBlock from "./SellerBlock";
import {
  stateTranslations,
  shippingSizeTranslations,
} from "@/utils/translations";
import { centsToEuros } from "@/utils/centsToEuros";
import ShippingInfo from "./ShippingInfo";
import { useIsClickOutsideElement } from "@/utils/hooks";
import ThreeDotsProductDropDown from "./ThreeDotsProductDropDown";
import ShareDropDown from "./ShareDropDown";
import { useRouter } from "next/navigation";
import { getProducts } from "@/fetch/products";

export default function ProductInfoSection({
  product,
  sellerData,
  userProducts,
  params,
  className,
}) {
  const { user } = useAuthContext();
  const dropdownRef = useRef();
  const router = useRouter();

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isCreateBundleModalOpen, setIsCreateBundleModalOpen] = useState(false);
  const [isBundleSummaryModalOpen, setIsBundleSummaryModalOpen] =
    useState(false);
  const [isBundleOfferModalOpen, setIsBundleOfferModalOpen] = useState(false);
  const [bundle, setBundle] = useState([]);
  const [bundlePrice, setBundlePrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [isThreeDotsDropdown, setIsThreeDotsDropdown] = useState(false);
  const [isShareDropdown, setIsShareDropdown] = useState(false);
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(dropdownRef);
  const [isProductSold, setIsProductSold] = useState(false);

  useEffect(() => {
    const handleSoldProduct = async () => {
      const product = await getProducts(params.id);
      const isProductSold = product.status === "sold";
      setIsProductSold(isProductSold);
    };

    handleSoldProduct();
  }, []);

  const handleOpenOfferModal = () => setIsOfferModalOpen(true);
  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    router.push(`/messagerie`);
  };

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

  const handleThreeDotsClick = () => {
    setIsClickOutside(false);
    setIsShareDropdown(false);
    setIsThreeDotsDropdown(!isThreeDotsDropdown);
  };

  const handleShareClick = () => {
    setIsClickOutside(false);
    setIsThreeDotsDropdown(false);
    setIsShareDropdown(!isShareDropdown);
  };

  const {
    id,
    title,
    price,
    description,
    createdAt,
    shipping,
    brand,
    materials,
    favoritCount,
    colors,
    category,
    state,
    size,
  } = product;

  const formattedDate = ISOtoDate(createdAt);

  const { username, review, avatar } = sellerData;

  const isUserSeller = user?.id === sellerData?.id;

  return (
    <section className="flex flex-col mt-5 w-full lg:mt-0 lg:ml-16 lg:min-w-[34%] lg:max-w-[430px]">
      <div className="flex items-center justify-between mb-2">
        {category && (
          <Link
            key={category.id}
            href={`/articles?categoryId=${category.id}&categoryName=${category.name}`}
            className="text-[13px] leading-4 border border-black rounded-3xl py-1 px-3"
          >
            {category.name}
          </Link>
        )}
        <div className="flex items-center ml-5 gap-5 relative">
          <div className="flex items-center gap-1">
            <FavoriteButton favoriteCount={favoritCount} product={product} />
          </div>
          <button onClick={handleShareClick}>
            <ShareIcon />
          </button>
          {isShareDropdown && !isClickOutside && (
            <div className="absolute right-10 top-10" ref={dropdownRef}>
              <ShareDropDown />
            </div>
          )}
          <button onClick={handleThreeDotsClick} className="p-2">
            <ThreeDotsIcon />
          </button>
          {isThreeDotsDropdown && !isClickOutside && (
            <div className="absolute right-0 top-10 w-max" ref={dropdownRef}>
              <ThreeDotsProductDropDown
                isUserSeller={isUserSeller}
                product={product}
              />
            </div>
          )}
        </div>
      </div>
      <h1 className="font-mcqueen font-bold text-2xl lg:text-4xl mb-2 capitalize">
        {title}
      </h1>
      <p className="text-sm leading-5 lg:text-base mb-6">{description}</p>
      { !isProductSold
        ? <>
            <p className="font-poppins font-semibold text-2xl lg:text-[28px] leading-[42px]">
              {centsToEuros(price)} €
            </p>
            <ShippingInfo product={product} />
            { !isUserSeller && (
              <>
                <Button
                  className="w-full mb-3 h-[52px] text-lg"
                  withAuth
                  href={`/checkout?productIds=${params.id}`}
                >
                  Acheter
                </Button>
                <Button
                  onClick={handleOpenOfferModal}
                  price={price}
                  variant="transparent-green"
                  className={`w-full h-[52px] text-xl ${className}`}
                  withAuth
                >
                  Faire une offre
                </Button>
                {userProducts?.items?.length > 1 && (
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
                      withAuth
                    >
                      Créer un lot
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        : (
            <Button
              className="w-full mb-3 h-[52px] text-lg"
              withAuth
              href=""
              variant={'red'}
            >
              Article vendu
            </Button>
          )
      }
      <table className="table-auto mt-5">
        <tbody className="[&>tr]:flex [&>tr]:justify-between [&>tr]:border-b [&>tr]:border-grey [&>tr]:py-2 [&_td] [&_td]:font-semibold [&_td]:text-sm [&_td]:leading-6 [&_a]:text-light-green [&_a]:underline">
          {category && (
            <tr>
              <td>Catégorie</td>
              <td>
                <Link
                  href={`/articles?categoryId=${category.id}&categoryName=${category.name}`}
                >
                  {category.name}
                </Link>
              </td>
            </tr>
          )}
          {state && (
            <tr>
              <td>État</td>
              <td>
                <Link href={`/articles?state=${state}`}>
                  {stateTranslations[state] || state}
                </Link>
              </td>
            </tr>
          )}
          {colors && (
            <tr>
              <td>Couleurs</td>
              <td>
                {colors.map((color) => (
                  <p
                    key={color.name}
                    className="ml-2"
                    href={`/articles?color=${color.name}`}
                  >
                    {color.name}
                  </p>
                ))}
              </td>
            </tr>
          )}
          {brand && (
            <tr>
              <td>Marque</td>
              <td>
                <Link href={`/articles?brand=${brand}`}>{brand}</Link>
              </td>
            </tr>
          )}
          {materials && (
            <tr>
              <td>Matières</td>
              <td>
                {materials.map((material) => (
                  <Link
                    key={material}
                    href={`/articles?materialId=${material}`}
                  >
                    {material}
                  </Link>
                ))}
              </td>
            </tr>
          )}
          {size && (
            <tr>
              <td>Taille</td>
              <td>
                <Link
                  href={`/articles?categoryId=${category.id}&categoryName=${category.name}&sizeId=${size.id}&sizeName=${size.value}`}
                >
                  {size.value}
                </Link>
              </td>
            </tr>
          )}
          {shipping && (
            <tr>
              <td>Taille du colis</td>
              <td>
                <Link href={`/articles?shipping=${shipping}`}>
                  {shippingSizeTranslations[shipping] || shipping}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <SellerBlock
        sellerData={sellerData}
        productId={id}
        isUserSeller={isUserSeller}
      />
      <p className="self-end text-sm lg:text-base">Ajouté le {formattedDate}</p>
      {isCreateBundleModalOpen && (
        <CreateBundleModal
          avatar={avatar}
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
        <OfferModal
          price={price}
          onClose={handleCloseOfferModal}
          products={product}
        />
      )}
    </section>
  );
}
