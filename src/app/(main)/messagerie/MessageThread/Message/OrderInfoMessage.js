import ClientProductImage from "@/components/ClientProductImage";
import Button from "@/components/Button";
import { centsToEuros } from "@/utils/centsToEuros";
import fetchHorseted from "@/utils/fetchHorseted";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";

export default function OrderInfoMessage({ products, type, totalPrice }) {
  // console.log("isMessageFromRecipient =>", isMessageFromRecipient);

  const { order, accessToken, updateMessages, user } = useThreadsContext();

  const isMessageFromRecipient = user.id === order.userId;

  const handleOfferSellerResponse = async (status) => {
    // await getOffer(order.offers[0].id);
    await patchOffer(status, order.offers[0].id);
    updateMessages();
  };

  const patchOffer = async (status, offerId) => {
    const body = {
      status: status,
    };
    const response = await fetchHorseted(
      `/offers/${offerId}`,
      accessToken,
      "PATCH",
      body,
      true,
      true
    );
    console.log("response =>", response);
  };

  const getOffer = async (offerId) => {
    const offer = await fetchHorseted(`/offers/${offerId}`, accessToken);
    console.log("offer =>", offer);
  };

  if (type === "newOffer") {
    return (
      <>
        <li className="w-full h-[70px] border-y border-pale-grey flex items-center justify-between">
          {products.map((product) => (
            <div key={product.id} className="flex items-center">
              <ClientProductImage
                key={product.id}
                product={product}
                size="small"
                className="w-24 h-14"
              />
              <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
                {product.title}
              </div>
            </div>
          ))}
          <p className="font-poppins font-medium text-sm whitespace-nowrap">
            <span className="line-through">{centsToEuros(totalPrice)} €</span>
            {" > "}
            <span className="font-bold text-light-green">
              {centsToEuros(order.offers[0].price)} €
            </span>
          </p>
        </li>
        {!isMessageFromRecipient && (
          <div className="flex">
            <Button
              variant={"red"}
              className="self-start p-3 mr-3"
              onClick={() => handleOfferSellerResponse("declined")}
            >
              Décliner l'offre
            </Button>
            <Button
              className="self-start p-3"
              onClick={() => handleOfferSellerResponse("approved")}
            >
              Accepter l'offre
            </Button>
          </div>
        )}
      </>
    );
  } else {
    return (
      <li className="w-full h-[70px] border-y border-pale-grey flex items-center justify-between">
        <div className="flex items-center">
          {products.map((product) => (
            <div key={product.id} className="flex items-center">
              <ClientProductImage
                key={product.id}
                product={product}
                size="small"
                className="w-24 h-14"
              />
              <div className="font-bold ml-6 overflow-hidden text-ellipsis whitespace-nowrap max-w-[90px] sm:max-w-[415px]">
                {product.title}
              </div>
            </div>
          ))}
        </div>
        <p className="font-poppins font-medium text-sm whitespace-nowrap">
          {type === "orderDeliveredConfirmationRequired"
            ? "Colis en attente de livraison par le vendeur"
            : type === "orderSent"
              ? "Colis envoyé !"
              : type === "orderDelivered"
                ? "Colis livré !"
                : ""}
        </p>
      </li>
    );
  }
}
