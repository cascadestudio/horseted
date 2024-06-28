"use client";

import { useState, useEffect, useRef } from "react";
import BatchSummaryModal from "./BatchSummaryModal";
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";
import profilePicture from "@/assets/images/profilePicture.jpg";
import Image from "next/image";
import { useIsClickOutsideElement } from "@/libs/hooks";
import StarIcon from "@/assets/icons/StarIcon";

export default function CreateBatchModal({ onClose }) {
  const modalRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(modalRef);
  const [isBatchSummaryModalOpen, setIsBatchSummaryModalOpen] = useState(false);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-grey">
      <div ref={modalRef} className="w-full h-full flex flex-col">
        <div className="bg-white">
          <div className="flex justify-between container mx-auto px-5 py-2">
            <div className="flex items-center">
              <CloseButton
                onClick={onClose}
                className="cursor-pointer h-7 w-7 lg:h-10 lg:w-10"
              />
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
        <div className="flex-grow container mx-auto px-5 pt-5 overflow-y-auto">
          {/* Replace with actual content: list of articles */}
          <p>List of articles will go here...</p>
        </div>
        <div className="border-t border-black bg-white">
          <div className="flex justify-between items-center container mx-auto px-5 py-2 lg:py-6">
            <span className="font-bold text-lg">Total: 100€</span>
            <Button onClick={handleOpenBatchSummaryModal}>Voir le lot</Button>
          </div>
        </div>
      </div>
      {isBatchSummaryModalOpen && (
        <BatchSummaryModal onClose={handleCloseBatchSummaryModal} />
      )}
    </div>
  );
}
