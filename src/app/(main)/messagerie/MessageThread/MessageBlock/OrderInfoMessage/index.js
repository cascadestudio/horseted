import ClientProductImage from "@/components/ClientProductImage";
import Button from "@/components/Button";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Link from "next/link";
import { getOffer } from "@/fetch/offers";
import { useEffect, useState } from "react";
import OrderStatusText from "./OrderStatusText";
import OfferResponseButtons from "./OfferResponseButtons";
import { patchOrderIsReceived } from "@/fetch/orders";
import ReviewModal from "../../../ThreadInfo/ReviewModal";

export default function OrderInfoMessage({ type, offerId }) {
  console.log("type =>", type);
  const { order, user, accessToken, products, updateMessages, recipient } =
    useThreadsContext();

  const [offer, setOffer] = useState(null);
  const [isReviewModal, setIsReviewModal] = useState(false);

  useEffect(() => {
    if (!offerId) return;
    handleGetOffer(offerId);
  }, [offerId]);

  const handleGetOffer = async (offerId) => {
    const offer = await getOffer(accessToken, offerId);
    setOffer(offer);
  };

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  const isBuyButton =
    offer?.status === "approved" &&
    user?.id === offer?.userId &&
    order?.status !== "paid";

  const handleConfirmOrderDelivered = async () => {
    await patchOrderIsReceived(order.id, accessToken);
    updateMessages();
  };

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
          isSeller={user?.id === offer?.userId}
        />
      </li>
      {type === "newOffer" && // is a new offer and
        user?.id !== offer?.userId && ( // user is not the offer owner
          <OfferResponseButtons offerId={offerId} totalPrice={totalPrice} />
        )}
      {type === "orderDeliveredConfirmationRequired" && (
        <Button variant={"green"} onClick={handleConfirmOrderDelivered}>
          Confirmer la réception
          <Link className="text-dark-green text-xs underline" href="/contact">
            Ouvrir un litige
          </Link>
        </Button>
      )}
      {type === "addReview" && user?.id !== offer?.userId && (
        <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
          Ajouter une évaluation
        </Button>
      )}
      {type === "newBuyerReview" && user?.id === offer?.userId && (
        <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
          Ajouter une évaluation
        </Button>
      )}
      {isBuyButton && (
        <div className="flex">
          <Button
            withAuth
            href={`/checkout?orderId=${order.id}&offerId=${offer.id}&productIds=${products
              .map((product) => product.id)
              .join(",")}`}
          >
            Acheter
          </Button>
        </div>
      )}
      {isReviewModal && (
        <ReviewModal
          setIsReviewModal={setIsReviewModal}
          orderId={order.id}
          recipient={recipient}
        />
      )}
    </>
  );
}
