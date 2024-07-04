"use client";

import { useEffect, useRef } from "react";
import { useIsClickOutsideElement } from "@/utils/hooks";
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";
import ClientProductImage from "@/components/ClientProductImage";

export default function BatchSummaryModal({
  onClose,
  batch,
  shippingPrice,
  totalBatchPrice,
}) {
  const modalRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(modalRef);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto relative"
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold">Votre lot</h1>
          <button className="text-black" onClick={onClose}>
            <CloseButton className="h-7 w-7" />
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span>3 Articles</span>
          <div className="flex space-x-2">
            {batch.map((product) => (
              <ClientProductImage
                product={product}
                key={product.id}
                className="w-10 h-12 mr-1 hidden lg:block"
                size="small"
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span>Commande</span>
            <span>totalBatchPrice €</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frais de port</span>
            <span>{shippingPrice} €</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{totalBatchPrice + shippingPrice} €</span>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <Button className="w-full text-white bg-green-600">Acheter</Button>
          <Button className="w-full text-green-600 border border-green-600">
            Faire une Offre
          </Button>
          <Button className="w-full text-green-600 border border-green-600">
            Envoyer un message
          </Button>
        </div>
      </div>
    </div>
  );
}
