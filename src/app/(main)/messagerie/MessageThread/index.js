import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect } from "react";
import "@/app/styles/globals.css";
import CloseButton from "@/assets/icons/CloseButton";
import ThreadInfo from "./ThreadInfo";
import Message from "./Message";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import capitalizeText from "@/utils/capitalizeText";

export default function MessageThread({
  product,
  messages,
  handleSubmit,
  newMessageSeller,
  order,
  seller,
  setSeller,
  activeThreadId,
  onDeleteThread,
  isInfo,
  setIsInfo,
  userId,
  accessToken,
}) {
  useEffect(() => {
    if (!product) return;
    const fetchSeller = async () => {
      const sellerData = await fetchHorseted(`/users/${product.userId}`);
      setSeller(sellerData);
    };
    fetchSeller();
  }, [product]);

  useEffect(() => {
    setSeller(newMessageSeller);
  }, [newMessageSeller]);

  // const reversedMessages = [...messages].reverse();

  return (
    <div className="flex flex-col min-h-[400px] flex-1">
      <div className="flex justify-between items-center p-6 border-b border-pale-grey">
        {product ? (
          <h2 className="text-xl font-mcqueen font-bold capitalize">
            {product.title}
          </h2>
        ) : seller ? (
          <h2>Nouvelle discussion</h2>
        ) : null}
        <button onClick={() => setIsInfo(!isInfo)}>
          {isInfo ? (
            <CloseButton />
          ) : seller ? (
            <img src="/icons/thread-info.svg" alt="Thread Info" />
          ) : null}
        </button>
      </div>
      <div className="flex-1 flex overflow-y-scroll">
        {isInfo && seller && product ? (
          <ThreadInfo
            seller={seller}
            product={product}
            order={order}
            activeThreadId={activeThreadId}
            onDeleteThread={onDeleteThread}
          />
        ) : (
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
            {messages.length > 0 &&
              messages.map((message) => (
                <Message
                  message={message}
                  key={message.id}
                  userId={userId}
                  accessToken={accessToken}
                  product={product}
                />
              ))}
            {order && order.statuses[0] === "delivered" && (
              <div>Terminé ! Merci pour votre commande sur Horseted</div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
