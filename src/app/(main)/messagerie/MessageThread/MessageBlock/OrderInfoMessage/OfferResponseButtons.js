import { patchOffer } from "@/fetch/offers";
import { useState } from "react";
import { useThreadsContext } from "../../../context/ThreadsContext";

export default function OfferResponseButtons({ offerId, totalPrice }) {
  const { updateMessages, accessToken, products } = useThreadsContext();

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const handleOfferSellerResponse = async (status) => {
    await patchOffer(status, offerId, accessToken);
    updateMessages();
  };

  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    updateMessages();
  };

  return (
    <>
      <div className="flex gap-x-3">
        <Button
          variant={"red"}
          onClick={() => handleOfferSellerResponse("declined")}
        >
          Décliner l'offre
        </Button>
        <Button
          variant={"green"}
          onClick={() => handleOfferSellerResponse("approved")}
        >
          Accepter l'offre
        </Button>
        <button
          className="font-mcqueen font-semibold text-dark-green ml-6"
          onClick={() => setIsOfferModalOpen(true)}
        >
          Contre offre
        </button>
      </div>
      {isOfferModalOpen && (
        <OfferModal
          price={totalPrice}
          onClose={handleCloseOfferModal}
          products={products}
          offerId={offerId}
        />
      )}
    </>
  );
}
