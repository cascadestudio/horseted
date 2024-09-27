import ClientProductImage from "@/components/ClientProductImage";
import Button from "@/components/Button";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Link from "next/link";
import { patchOffer } from "@/fetch/offers";
import OfferModal from "@/app/(main)/product/[id]/ProductInfoSection/OfferModal";
import { useState } from "react";
import OrderStatusText from "./OrderStatusText";

export default function OrderInfoMessage({ type, offerId }) {
  const { order, updateMessages, user, accessToken, products } =
    useThreadsContext();

  // console.log("order =>", order);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const offer = order?.offers.find((offer) => offer.id === offerId);
  // console.log("offer =>", offer);

  const isExpectedOfferResponse =
    offer &&
    type === "newOffer" &&
    user?.id !== offer.userId && // not the offer owner
    offer.status !== "sent";

  const handleOfferSellerResponse = async (status) => {
    await patchOffer(status, offer.id, accessToken);
    updateMessages();
  };

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    updateMessages();
  };

  // if (!totalPrice) return;
  return (
    <>
      <li className="w-full border-y py-2 border-pale-grey flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col gap-y-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex items-center"
            >
              <ClientProductImage
                key={product.id}
                product={product}
                size="small"
                className="w-24 h-14"
              />
              <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
                {product.title}
              </div>
              <img
                src="/icons/external-link.svg"
                alt="Chevron"
                className="w-3 h-3 ml-1 mb-3"
              />
            </Link>
          ))}
        </div>
        <OrderStatusText
          type={type}
          totalPrice={totalPrice}
          offerPrice={offer?.price}
        />
      </li>
      {isExpectedOfferResponse && type === "newOffer" && (
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
      )}
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
