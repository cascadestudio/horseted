"use client";

import { useState, useEffect, useRef } from "react";
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";
import profilePicture from "@/assets/images/profilePicture.jpg";
import Image from "next/image";
import { useIsClickOutsideElement } from "@/utils/hooks";
import StarIcon from "@/assets/icons/StarIcon";
import ProductCard from "@/components/ProductCard";
import ClientProductImage from "@/components/ClientProductImage";
import { formatNumber } from "@/utils/formatNumber";
import BundleSummaryModal from "./BundleSummaryModal";
import OfferModal from "../OfferModal";

export default function CreateBundleModal({
  userData,
  userProducts,
  bundle,
  setBundle,
  bundlePrice,
  setBundlePrice,
  onCloseCreateBundleModal,
  shippingPrice,
  setShippingPrice,
  isCreateBundleModalOpen,
}) {
  const modalRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(modalRef);

  const [isBundleSummaryModalOpen, setIsBundleSummaryModalOpen] =
    useState(false);
  const [isBundleOfferModalOpen, setIsBundleOfferModalOpen] = useState(false);

  const handleOpenBundleSummaryModal = () => {
    console.log("open bundle summary modal");
    setIsBundleSummaryModalOpen(true);
  };
  const handleCloseBundleSummaryModal = () => {
    console.log("close bundle summary modal");
    setIsBundleSummaryModalOpen(false);
  };

  const handleOpenBundleOfferModal = () => {
    console.log("open bundle offer modal");
    setIsBundleOfferModalOpen(true);
    console.log("close bundle summary modal");
    setIsBundleSummaryModalOpen(false);
  };
  const handleCloseBundleOfferModal = () => {
    console.log("close bundle offer modal");
    setIsBundleOfferModalOpen(false);
  };

  useEffect(() => {
    if (
      isClickOutside &&
      !isBundleOfferModalOpen &&
      !isBundleSummaryModalOpen
    ) {
      onCloseCreateBundleModal();
      setIsClickOutside(false);
    }
  }, [
    isClickOutside,
    onCloseCreateBundleModal,
    isBundleOfferModalOpen,
    isBundleSummaryModalOpen,
  ]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleAddToBundle = (product) => {
    setBundle((prevBundle) => {
      let newBundle;
      if (prevBundle.find((p) => p.id === product.id)) {
        newBundle = prevBundle.filter((p) => p.id !== product.id);
      } else {
        newBundle = [...prevBundle, product];
      }

      const newBundlePrice = newBundle.reduce((total, p) => total + p.price, 0);
      setBundlePrice(newBundlePrice);

      const largestItem = newBundle.reduce((prev, current) => {
        return prev.shippingSize > current.shippingSize ? prev : current;
      }, product);

      setShippingPrice(5.99); // TODO: Calculate shipping price

      return newBundle;
    });
  };

  const isProductInBundle = (productId) => {
    return bundle.some((product) => product.id === productId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-grey">
      <div ref={modalRef} className="w-full h-full flex flex-col">
        <div className="bg-white">
          <div className="flex justify-between container mx-auto px-5 py-2">
            <div className="flex items-center">
              <div onClick={onCloseCreateBundleModal}>
                <CloseButton className="cursor-pointer h-7 w-7 lg:h-10 lg:w-10" />
              </div>
              <span className="font-mcqueen font-bold lg:text-[24px] lg:leading-[48px] ml-4 lg:ml-10">
                Créer un lot
              </span>
            </div>
            <div className="flex items-center">
              <Image
                src={profilePicture}
                alt="Profile Picture"
                className="h-14 w-14 rounded-full"
              />
              <div className="ml-4">
                <h4 className="font-bold">Alexandra-ast</h4>
                <div className="flex items-center">
                  <StarIcon className="h-3 w-auto lg:h-5" />
                  <StarIcon className="h-3 w-auto lg:h-5" />
                  <StarIcon className="h-3 w-auto lg:h-5" />
                  <StarIcon className="h-3 w-auto lg:h-5" />
                  <StarIcon className="h-3 w-auto lg:h-5" />
                  <span className="text-sm ml-2">(6)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-5 pt-5">
          <h2 className="text-[24px] font-bold font-mcqueen">
            La sellerie de {userData.username}
          </h2>
          <p className="font-mcqueen font-medium text-lg">
            {userProducts.items.length} articles
          </p>
        </div>
        <div className="flex-grow container mx-auto px-5 pt-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-8 justify-between">
            {userProducts.items.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center mb-0 w-[280px] justify-self-center"
              >
                <ProductCard product={product} className="border-none mb-0" />
                <Button
                  onClick={() => handleAddToBundle(product)}
                  variant={
                    isProductInBundle(product.id)
                      ? "transparent-red"
                      : "transparent-green"
                  }
                  className="w-full max-w-[280px] text-xl"
                >
                  {isProductInBundle(product.id) ? "Retirer" : "Ajouter"}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-black bg-white">
          <div className="flex justify-between items-center container mx-auto px-5 py-2 h-28 lg:py-6">
            <div className="flex flex-col">
              <span className="font-poppins font-semibold text-[28px] leading-10">
                {formatNumber(bundlePrice)} €
              </span>
              <div>
                <span className="font-poppins font-medium text-sm">
                  {formatNumber(shippingPrice)} €
                </span>
                <span className="text-sm"> - Livraison à domicile</span>
              </div>
            </div>
            <div className="flex items-center mt-4">
              {bundle.map((product) => (
                <ClientProductImage
                  product={product}
                  key={product.id}
                  className="w-10 h-12 mr-1 hidden lg:block"
                  size="small"
                />
              ))}
              <div className="mx-7">
                <span className="text-sm font-poppins font-medium">
                  {bundle.length}
                </span>{" "}
                <span className="text-sm font-medium">articles</span>
              </div>
              <Button
                onClick={handleOpenBundleSummaryModal}
                bundle={bundle}
                className="text-sm"
              >
                Voir le lot
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isBundleSummaryModalOpen && (
        <BundleSummaryModal
          bundle={bundle}
          bundlePrice={bundlePrice}
          shippingPrice={shippingPrice}
          onCloseBundleSummaryModal={handleCloseBundleSummaryModal}
          onOpenBundleSummaryModal={handleOpenBundleSummaryModal}
          onOpenOfferModal={handleOpenBundleOfferModal}
        />
      )}
      {isCreateBundleModalOpen && isBundleOfferModalOpen && (
        <OfferModal
          price={bundlePrice}
          onClose={handleCloseBundleOfferModal}
          handleOpenBundleOfferModal={handleOpenBundleOfferModal}
        />
      )}
    </div>
  );
}
