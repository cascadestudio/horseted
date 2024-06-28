"use client";

import { useEffect, useRef } from "react";
import { useIsClickOutsideElement } from "@/libs/hooks";
import CloseButton from "@/assets/icons/CloseButton";

export default function BatchSummaryModal({ onClose }) {
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
        <button
          className="absolute top-4 right-4 text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4">Batch Summary</h1>
        {/* Replace with actual batch summary content */}
        <p>Batch summary content goes here...</p>
      </div>
    </div>
  );
}
