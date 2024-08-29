import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import AvatarDisplay from "@/components/AvatarDisplay";
import ClientProductImage from "@/components/ClientProductImage";
import React, { useEffect, useRef, useState } from "react";
import SignalementModal from "../Modals/SignalementModal";
import { useAuthContext } from "@/context/AuthContext";
import UserBlockModal from "../Modals/UserBlockModal";
import NextArrow from "@/assets/icons/NextArrow";
import OrderInfo from "./OrderInfo";
import Link from "next/link";
import { useIsClickOutsideElement } from "@/utils/hooks";

export default function ThreadInfo({
  seller,
  product,
  orderTracking,
  onDeleteThread,
  orderId,
}) {
  const { user, accessToken } = useAuthContext();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isSignalementModal, setIsSignalementModal] = useState(false);
  const [isUserBlockModal, setIsUserBlockModal] = useState(false);
  const dropdownRef = useRef();
  const [isClickOutside, setIsClickOutside] =
    useIsClickOutsideElement(dropdownRef);

  // console.log("order =>", order);

  useEffect(() => {
    if (isClickOutside) {
      setIsDropdown(false);
      setIsClickOutside(false);
    }
  }, [isClickOutside, setIsClickOutside]);

  function handleClick() {
    setIsDropdown(!isDropdown);
    setIsClickOutside(false);
  }

  const userType = user.id === seller.id ? "seller" : "buyer";

  return (
    <>
      <div className="flex flex-col w-full px-10 py-4">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center py-2 border-b w-full">
            <Link
              // href={`/vendeur/${seller.id}`}
              href={`/vendeur`}
              className="flex items-center w-full"
            >
              <AvatarDisplay
                avatar={seller.avatar}
                size={54}
                className="flex-none mr-4"
              />
              {seller.username}
              <NextArrow className="ml-auto mr-10" />
            </Link>
            <button className="p-2" onClick={handleClick}>
              <ThreeDotsIcon />
            </button>
          </div>
          {isDropdown && (
            <div
              ref={dropdownRef}
              className="flex flex-col items-start absolute bg-white border border-dark-grey rounded-lg p-4 font-semibold gap-3 right-0 top-14"
            >
              <button
                onClick={() => setIsSignalementModal(!isSignalementModal)}
                className="flex items-center gap-2"
              >
                <img src="/icons/signaler.svg" alt="" />
                Signaler
              </button>
              <button
                onClick={() => setIsUserBlockModal(!isUserBlockModal)}
                className="flex items-center gap-2"
              >
                <img src="/icons/bloquer.svg" alt="" />
                Bloquer
              </button>
              {!orderTracking && (
                <button
                  onClick={onDeleteThread}
                  className="flex items-center gap-2"
                >
                  <img src="/icons/supprimer-conversation.svg" alt="" />
                  Supprimer la conversation
                </button>
              )}
            </div>
          )}
        </div>
        {product && (
          <div className="flex items-start py-5">
            <ClientProductImage
              className="w-12 mr-4"
              product={product}
              size="small"
            />
            <div>
              <h3 className="text-lg font-mcqueen font-bold capitalize">
                {product.title}
              </h3>
              <p className="text-sm font-poppins">{product.price}€</p>
            </div>
          </div>
        )}
        {orderTracking && (
          <OrderInfo
            userType={userType}
            orderTracking={orderTracking}
            accessToken={accessToken}
            orderId={orderId}
          />
        )}
      </div>
      {isSignalementModal && (
        <SignalementModal
          accessToken={accessToken}
          setIsSignalementModal={setIsSignalementModal}
          sellerId={seller.id}
          productId={product.id || null}
        />
      )}
      {isUserBlockModal && (
        <UserBlockModal
          accessToken={accessToken}
          setIsUserBlockModal={setIsUserBlockModal}
          userId={user.id}
          seller={seller}
        />
      )}
    </>
  );
}
