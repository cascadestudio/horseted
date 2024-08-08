"use client";
import { useAuthContext } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Button from "@/components/Button";
import AvatarDisplay from "@/components/AvatarDisplay";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

function AccountPage() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("products");

  // Add fetchAvatar()
  if (user)
    return (
      <div className="container mx-auto pt-7 pb-12 px-5 lg:px-0">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <AvatarDisplay avatarSrc={user?.avatar} className="h-32 w-32" />
          <div className="flex flex-col items-center lg:items-start lg:pt-12">
            <StarRating rating="4.5" count="6" />
            <p className="text-[22px] font-mcqueen font-semibold">
              {user?.username}
            </p>
            <div className="flex gap-2 items-center font-medium text-sm mb-4">
              <CityIcon className="w-3" />
              <p>Montpellier (34)</p>
            </div>
            {/* {user?.description} */}
            <p className="text-sm leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip
            </p>
          </div>
          <Button href="/parametres" className="lg:ml-36">
            Modifier mon profil
          </Button>
        </div>
        <div className="mt-8">
          <div className="flex border-b border-lighter-grey">
            <button
              className={`px-4 py-2 text-lg font-medium font-mcqueen ${
                activeTab === "products"
                  ? "text-light-green border-b-[3px] border-light-green"
                  : "text-grey"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Products
            </button>
            <button
              className={`px-4 py-2 text-lg font-medium font-mcqueen ${
                activeTab === "reviews"
                  ? "text-light-green border-b-[3px] border-light-green"
                  : "text-grey"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          <div className="mt-4">
            {activeTab === "products" && (
              <div>
                {/* Render product cards here */}
                {/* <ProductCard title="Product 1" description="Description of product 1" />
                <ProductCard title="Product 2" description="Description of product 2" /> */}
                Products
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                {/* Render reviews here */}
                {/* <ReviewCard reviewer="Reviewer 1" review="This is a review." />
                <ReviewCard reviewer="Reviewer 2" review="This is another review." /> */}
                Reviews
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default withAuth(AccountPage);
