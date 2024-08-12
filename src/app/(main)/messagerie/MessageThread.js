import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import "@/app/styles/globals.css";

export default function MessageThread({ product, messages, userId }) {
  const [seller, setSeller] = useState({});

  // console.log("seller =>", seller);

  useEffect(() => {
    if (!product) return;

    const fetchSeller = async () => {
      const sellerData = await fetchHorseted(`/users/${product.userId}`);
      setSeller(sellerData);
    };

    fetchSeller();
  }, [product]);

  const reversedMessages = [...messages].reverse();

  if (!product) return null;

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-pale-grey">
        <h2 className="text-xl font-mcqueen font-bold">{product.title}</h2>
        <button>
          <img src="/icons/thread-info.svg" alt="Thread Info" />
        </button>
      </div>
      <div className="p-10 flex flex-col gap-y-4 max-h-[500px] overflow-y-scroll">
        <div className="message-container self-start">
          <p>Bonjour, moi c’est {seller.username}</p>
          {/* TODO Clem : intégration premier message vendeur */}
        </div>
        {messages.length > 0 &&
          reversedMessages.map((message) => {
            const { id, content, senderId } = message;
            const isFromUser = userId === senderId;
            return (
              <div
                key={id}
                className={`message-container ${
                  isFromUser ? "self-end" : "self-start"
                }`}
              >
                <p>{content}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}
