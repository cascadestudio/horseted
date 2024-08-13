import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import "@/app/styles/globals.css";

export default function MessageThread({
  product,
  messages,
  userId,
  handleSubmit,
  newMessageSeller,
}) {
  const [seller, setSeller] = useState(null);

  // console.log("seller =>", seller);

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
        <button>
          <img src="/icons/thread-info.svg" alt="Thread Info" />
        </button>
      </div>
      <ul className="p-10 flex flex-col gap-y-4 overflow-y-scroll flex-1">
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
      </ul>
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
