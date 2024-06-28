"use client";

import { useState, useEffect, useRef } from "react";
import BatchSummaryModal from "./BatchSummaryModal";
import CloseButton from "@/assets/icons/CloseButton";
import Button from "@/components/Button";
import profilePicture from "@/assets/images/profilePicture.jpg";
import Image from "next/image";
import { useIsClickOutsideElement } from "@/libs/hooks";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div ref={modalRef} className="w-full h-full flex flex-col">
        <div className="flex justify-between p-4 border-b border-black">
          <div className="flex items-center">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-4">
              <h4 className="font-bold">Alexandra-ast</h4>
              <div className="flex items-center">
                {/* Placeholder for rating stars */}
                <span className="text-sm ml-2">(6)</span>
              </div>
            </div>
          </div>
          <CloseButton onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {/* Replace with actual content: list of articles */}
          <p>List of articles will go here...</p>
        </div>
        <div className="p-4 border-t border-black">
          <div className="flex justify-between items-center">
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
