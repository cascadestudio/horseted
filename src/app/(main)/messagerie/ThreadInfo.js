import ThreeDotsIcon from "@/assets/icons/ThreeDotsIcon";
import AvatarDisplay from "@/components/AvatarDisplay";
import ClientProductImage from "@/components/ClientProductImage";
import React, { useState } from "react";
import SignalementModal from "./Modals/SignalementModal";
import { useAuthContext } from "@/context/AuthContext";
import UserBlockModal from "./Modals/UserBlockModal";

export default function threadInfo({ seller, product, order }) {
  // console.log("order =>", order);
  const { user, accessToken } = useAuthContext();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isSignalementModal, setIsSignalementModal] = useState(false);
  const [isUserBlockModal, setIsUserBlockModal] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex items-center p-5 justify-between">
          <div className="flex items-center">
            <AvatarDisplay
              avatar={seller.avatar}
              size={54}
              className="flex-none"
            />
            {seller.username}
          </div>
          <button className="px-2" onClick={() => setIsDropdown(!isDropdown)}>
            <ThreeDotsIcon />
          </button>
          {isDropdown && (
            <div className="flex flex-col items-start">
              <button
                onClick={() => setIsSignalementModal(!isSignalementModal)}
              >
                Signaler
              </button>
              <button onClick={() => setIsUserBlockModal(!isUserBlockModal)}>
                Bloquer
              </button>
              <button>Supprimer la conversation</button>
            </div>
          )}
        </div>
        <div className="flex items-center p-5">
          <ClientProductImage product={product} size={"small"} />
          {product.title}
          {product.price}€
        </div>
        {order && order.statuses[0].status === "readyToSend" && (
          <div>
            <p>Commande validée !</p>
            <p>La commande est validée et en attente de livraison.</p>
            <div>
              <p>Numéro de suivi colissimo créé</p>
              <p>{order.number}</p>
              <p>{order.createdAt}</p>
              <p>Colis en attente de livraison</p>
              <p>{order.statuses[0].updatedAt}</p>
            </div>
          </div>
        )}
      </div>
      {isSignalementModal && (
        <SignalementModal
          accessToken={accessToken}
          setIsSignalementModal={setIsSignalementModal}
          sellerId={seller.id}
          productId={product.id}
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
