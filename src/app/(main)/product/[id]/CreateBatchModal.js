"use client";

import { useState, useEffect, useRef } from "react";
import BatchSummaryModal from "./BatchSummaryModal";
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";
import profilePicture from "@/assets/images/profilePicture.jpg";
import Image from "next/image";
import { useIsClickOutsideElement } from "@/libs/hooks";
import StarIcon from "@/assets/icons/StarIcon";
import ProductCard from "@/components/ProductCard";
import ProductImage from "./ProductImage";

export default function CreateBatchModal({ userData, userProducts, onClose }) {
  const modalRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(modalRef);
  const [isBatchSummaryModalOpen, setIsBatchSummaryModalOpen] = useState(false);
  const [batch, setBatch] = useState([]);

  useEffect(() => {
    if (isClickOutside) {
      onClose();
      setIsClickOutside(false);
    }
  }, [isClickOutside, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpenBatchSummaryModal = () => {
    setIsBatchSummaryModalOpen(true);
  };

  const handleCloseBatchSummaryModal = () => {
    setIsBatchSummaryModalOpen(false);
  };

  const handleAddToBatch = (product) => {
    setBatch((prevBatch) => {
      if (prevBatch.find((p) => p.id === product.id)) {
        return prevBatch.filter((p) => p.id !== product.id);
      }
      return [...prevBatch, product];
    });
  };

  const isProductInBatch = (productId) => {
    return batch.some((product) => product.id === productId);
  };

  const totalBatchPrice = batch.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-grey">
      <div ref={modalRef} className="w-full h-full flex flex-col">
        <div className="bg-white">
          <div className="flex justify-between container mx-auto px-5 py-2">
            <div className="flex items-center">
              <div onClick={onClose}>
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
        <div className="flex-grow container mx-auto px-5 pt-5 overflow-y-auto grid grid-cols-1 lg:grid-cols-4">
          {userProducts.items.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} className="border-none" />
              <Button
                onClick={() => handleAddToBatch(product)}
                variant={
                  isProductInBatch(product.id)
                    ? "transparent-red"
                    : "transparent-green"
                }
              >
                {isProductInBatch(product.id) ? "Retirer" : "Ajouter"}
              </Button>
            </div>
          ))}
        </div>
        <div className="border-t border-black bg-white">
          <div className="flex justify-between items-center container mx-auto px-5 py-2 lg:py-6">
            <span className="font-bold text-lg">
              Total: {totalBatchPrice} €
            </span>
            <div className="flex items-center mt-4">
              {batch.map((product) =>
                // <ProductImage key={product.id} media={product.media} />
                console.log(product)
              )}
              <span className="ml-2">Produits ajoutés: {batch.length}</span>
              <Button onClick={handleOpenBatchSummaryModal}>Voir le lot</Button>
            </div>
          </div>
        </div>
      </div>
      {isBatchSummaryModalOpen && (
        <BatchSummaryModal onClose={handleCloseBatchSummaryModal} />
      )}
    </div>
  );
}
