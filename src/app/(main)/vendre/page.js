"use client";

import Image from "next/image";
import CloseButton from "@/assets/icons/CloseButton";
import StarRating from "@/components/StarRating";
import profilePicture from "@/assets/images/profilePicture.jpg";

export default function BundlePage({ username, review }) {
  return (
    <div className="min-h-screen flex flex-col bg-light-grey">
      <div className="bg-white">
        <div className="flex justify-between container mx-auto px-5 py-2">
          <div className="flex items-center">
            <CloseButton className="cursor-pointer h-7 w-7 lg:h-10 lg:w-10" />
            <span className="font-mcqueen font-bold lg:text-[24px] lg:leading-[48px] ml-4 lg:ml-10">
              Créer un lot
            </span>
          </div>
        </div>
      </div>
      {/* Your content goes here */}
      <div className="container mx-auto px-5 pt-5">
        {/* Content for your new page */}
      </div>
    </div>
  );
}
