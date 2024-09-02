import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import "@/app/styles/globals.css";
import Message from "./Message";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import capitalizeText from "@/utils/capitalizeText";
import Spinner from "@/components/Spinner";

export default function MessageThread({
  product,
  messages,
  order,
  orderTracking,
  seller,
  setSeller,
  accessToken,
  recipient,
  updateMessages,
}) {
  const [loading, setLoading] = useState(false);

  // console.log("recipient =>", recipient);

  useEffect(() => {
    setSeller(null);
    fetchSeller();
  }, [recipient]);

  const fetchSeller = async () => {
    if (!recipient) return;
    setLoading(true);
    const sellerData = await fetchHorseted(`/users/${recipient.id}`);
    setSeller(sellerData);
    setLoading(false);
  };

  const reversedMessages = [...messages].reverse();

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col min-h-[400px] flex-1">
      <div className="flex-1 flex overflow-y-scroll">
        <ul className="flex flex-col gap-y-4 flex-1 p-10">
          {seller && (
            <li className="message-container self-start">
              <p className="font-medium text-sm">
                <span className="font-bold">Bonjour</span>, moi c’est{" "}
                {seller?.username}
              </p>
              <StarRating review={seller?.review} />
              <div className="text-grey flex items-center gap-2 mt-3">
                <CityIcon className="h-3 stroke-current fill-none" />
                <span className="text-xs font-medium">
                  {seller?.city ? capitalizeText(seller?.city) : ""}
                </span>
              </div>
            </li>
          )}
          {reversedMessages.length > 0 &&
            reversedMessages.map((message) => (
              <Message
                updateMessages={updateMessages}
                message={message}
                key={message.id}
                accessToken={accessToken}
                product={product}
                order={order}
              />
            ))}
          {orderTracking && orderTracking.statuses[0] === "delivered" && (
            <div>Terminé ! Merci pour votre commande sur Horseted</div>
          )}
        </ul>
      </div>
    </div>
  );
}
