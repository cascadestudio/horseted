import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import "@/app/styles/globals.css";
import CloseButton from "@/assets/icons/CloseButton";
import ThreadInfo from "./ThreadInfo";

export default function MessageThread({
  product,
  messages,
  userId,
  handleSubmit,
  newMessageSeller,
  order,
  seller,
  setSeller,
}) {
  // console.log("order =>", order);

  const [isInfo, setIsInfo] = useState(false);

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

  const reversedMessages = [...messages].reverse();

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-pale-grey">
        {product ? (
          <h2 className="text-xl font-mcqueen font-bold">{product.title}</h2>
        ) : (
          <h2>Nouveau message</h2>
        )}
        <button onClick={() => setIsInfo(!isInfo)}>
          {isInfo ? (
            <CloseButton />
          ) : (
            <img src="/icons/thread-info.svg" alt="Thread Info" />
          )}
        </button>
      </div>
      <div className="p-10 flex-1 flex overflow-y-scroll">
        {isInfo ? (
          <ThreadInfo seller={seller} product={product} order={order} />
        ) : (
          <ul className="flex flex-col gap-y-4  flex-1">
            <li className="message-container self-start">
              <p>Bonjour, moi c’est {seller?.username}</p>
              {/* TODO Clem : intégration premier message vendeur */}
            </li>
            {messages.length > 0 &&
              reversedMessages.map((message) => {
                const { id, content, senderId } = message;
                const isFromUser = userId === senderId;
                return (
                  <li
                    key={id}
                    className={`message-container ${
                      isFromUser ? "self-end" : "self-start"
                    }`}
                  >
                    <p>{content}</p>
                  </li>
                );
              })}
            {order && order.statuses[0] === "delivered" && (
              <div>Terminé ! Merci pour votre commande sur Horseted</div>
            )}
          </ul>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 p-4 border-t border-darker-grey"
      >
        <button>
          <img src="/icons/media-message.svg" alt="" />
        </button>
        <textarea
          placeholder="Aa"
          id="content"
          name="content"
          className="flex-1 border border-pale-grey rounded-full resize-none ps-4 pt-[5px] h-[38px]"
          rows="1"
        />
        <button
          type="submit"
          className="flex bg-dark-green text-white rounded-full p-1 ps-6 font-bold items-center"
        >
          Envoyer
          <span className="ml-2 bg-white rounded-full h-7 w-7 flex items-center justify-center">
            <img src="/icons/send-message.svg" alt="" />
          </span>
        </button>
      </form>
    </>
  );
}
