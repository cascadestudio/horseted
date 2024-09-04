import { useEffect, useState } from "react";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import "@/app/styles/globals.css";
import fetchHorseted from "@/utils/fetchHorseted";
import Message from "./Message";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import capitalizeText from "@/utils/capitalizeText";
import Spinner from "@/components/Spinner";

export default function MessageThread() {
  const {
    product,
    messages,
    order,
    orderTracking,
    accessToken,
    recipient,
    setRecipient,
    updateMessages,
  } = useThreadsContext();

  const [loading, setLoading] = useState(false);

  // console.log("order =>", order);

  useEffect(() => {
    if (!recipient) return;
    getRecipient();
  }, []);

  const getRecipient = async () => {
    setLoading(true);
    const response = await fetchHorseted(`/users/${recipient.id}`);
    setRecipient(response);
    setLoading(false);
  };

  const reversedMessages = [...messages].reverse();

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col min-h-[400px] flex-1">
      <div className="flex-1 flex overflow-y-scroll">
        <ul className="flex flex-col gap-y-4 flex-1 p-10">
          {recipient && (
            <li className="message-container self-start">
              <p className="font-medium text-sm">
                <span className="font-bold">Bonjour</span>, moi c’est{" "}
                {recipient.username}
              </p>
              <StarRating review={recipient.review} />
              <div className="text-grey flex items-center gap-2 mt-3">
                <CityIcon className="h-3 stroke-current fill-none" />
                <span className="text-xs font-medium">
                  {recipient.city ? capitalizeText(recipient.city) : ""}
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
