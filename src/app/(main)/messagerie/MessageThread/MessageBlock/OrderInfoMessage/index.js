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
  const { order, user, accessToken, products, updateMessages, recipient } =
    useThreadsContext();
  const [offer, setOffer] = useState(null);
  const [isReviewModal, setIsReviewModal] = useState(false);

  const userRole = getUserRole();

  function getUserRole() {
    if (!order || !user) return;
    if (order.buyer.id === user.id) {
      return "buyer";
    } else if (order.seller.id === user.id) {
      return "seller";
    } else {
      return "unknown";
    }
  }

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

  const isOfferOwner = user?.id === offer?.userId;

  if (type === "addReview" && userRole === "seller") return;

  console.log("orderID =>", order.id);

  return (
    <>
      <li className="w-full border-y py-2 border-pale-grey flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col gap-y-2">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/commandes/${order.id}`}
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
          userRole={userRole}
        />
      </li>
      {type === "newOffer" && // is a new offer and
        !isOfferOwner && ( // user is not the offer owner
          <OfferResponseButtons offerId={offerId} totalPrice={totalPrice} />
        )}
      {type === "orderDeliveredConfirmationRequired" && (
        <div className="flex justify-between	items-center">
          <Button variant={"green"} onClick={handleConfirmOrderDelivered}>
            Confirmer la réception
          </Button>
          <Link className="text-dark-green text-xs underline" href="/contact">
            Ouvrir un litige
          </Link>
        </div>
      )}
      {type === "addReview" && (
        <div className="flex">
          <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
            Ajouter une évaluation
          </Button>
        </div>
      )}
      {type === "newBuyerReview" &&
        userRole === "seller" &&
        !order.reviewedBySeller && (
          <div className="flex">
            <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
              Ajouter une évaluation
            </Button>
          </div>
        )}
      {type === "newSellerReview" &&
        userRole === "buyer" &&
        !order.reviewedByBuyer && (
          <div className="flex">
            <Button variant={"green"} onClick={() => setIsReviewModal(true)}>
              Ajouter une évaluation
            </Button>
          </div>
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
          userRole={userRole}
        />
      )}
    </>
  );
}
