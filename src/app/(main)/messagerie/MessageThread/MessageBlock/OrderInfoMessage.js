import ClientProductImage from "@/components/ClientProductImage";
import Button from "@/components/Button";
import { centsToEuros } from "@/utils/centsToEuros";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Link from "next/link";
import { patchOffer, postOffer } from "@/fetch/offers";

export default function OrderInfoMessage({
  products,
  type,
  totalPrice,
  offerId,
}) {
  const { order, updateMessages, user, accessToken } = useThreadsContext();
  let offer = {};
  if (offerId && order) {
    offer = order?.offers.find((offer) => offer.id === offerId);
  }
  console.log("offer =>", offer);

  const isMessageFromRecipient = user.id === order.userId;

  const handleOfferSellerResponse = async (status) => {
    await patchOffer(status, offer.id, accessToken);
    updateMessages();
  };

  const handleCounterOffer = async () => {
    await postOffer(accessToken, {
      orderId: order.id,
      price: offer.price - 100,
      declinedOfferId: offer.id,
    });
  };

  const orderMessageText = {
    newOrder: "Nouvelle commande",
    orderSent: "Colis envoyé !",
    orderDelivered: "Colis livré !",
    orderDeliveredConfirmationRequired:
      "Colis en attente de livraison par le vendeur",
    offerAccepted: "Offre acceptée !",
    offerRejected: "Offre déclinée",
  };

  // if (type === "newOffer") {
  if (!totalPrice || !offer.price) return;
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
        <p className="font-poppins font-medium mt-5 lg:mt-0 text-sm whitespace-nowrap">
          {type === "newOffer" ? (
            <>
              <span className="line-through">{centsToEuros(totalPrice)} €</span>
              {" > "}
              <span className="font-bold text-light-green">
                {centsToEuros(offer.price)} €
              </span>
            </>
          ) : type === "offerDeclined" ? (
            <span className="text-red">Offre déclinée</span>
          ) : type === "offerAccepted" ? (
            <span className="text-green">Offre acceptée</span>
          ) : (
            <span>{orderMessageText[type]}</span>
          )}
        </p>
      </li>
      {!isMessageFromRecipient && type === "newOffer" && (
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
          <Button onClick={() => handleCounterOffer()}>Contre offre</Button>
        </div>
      )}
    </>
  );
  // } else {
  //   return (
  //     <li className="w-full border-y py-2 border-pale-grey flex flex-col lg:flex-row items-center justify-between">
  //       <div className="flex flex-col lg:items-center">
  //         {products.map((product) => (
  //           <Link
  //             key={product.id}
  //             href={`/product/${product.id}`}
  //             className="flex items-center"
  //           >
  //             <ClientProductImage
  //               key={product.id}
  //               product={product}
  //               size="small"
  //               className="w-24 h-14"
  //             />
  //             <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
  //               {product.title}
  //             </div>
  //             <img
  //               src="/icons/external-link.svg"
  //               alt="Chevron"
  //               className="w-3 h-3 ml-1 mb-3"
  //             />
  //           </Link>
  //         ))}
  //       </div>
  //       <p className="font-poppins mt-3 lg:mt-0 font-medium text-sm text-center lg:whitespace-nowrap">
  //         {orderMessageText[type]}
  //       </p>
  //     </li>
  //   );
  // }
}
