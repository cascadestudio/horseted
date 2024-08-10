import fetchHorseted from "@/utils/fetchHorseted";
import { useEffect, useState } from "react";
import MessageBlock from "./messageBlock";

export default function MessageThread({ product, messages, userId }) {
  const [seller, setSeller] = useState({});

  console.log("seller =>", seller);

  useEffect(() => {
    fetchSeller();
  }, [product]);

  async function fetchSeller() {
    const seller = await fetchHorseted(`/users/${product.userId}`);
    setSeller(seller);
  }

  const reversedMessages = [...messages].reverse();
  if (product)
    return (
      <>
        <div className="flex justify-between items-center p-6 border-b border-pale-grey">
          <h2 className="text-xl font-mcqueen font-bold">{product.title}</h2>
          <button>
            <img src="/icons/thread-info.svg" alt="" />
          </button>
        </div>
        <div className="p-10 flex flex-col gap-y-4 max-h-[500px] overflow-y-scroll">
          {messages.length > 0 ? (
            reversedMessages.map((message) => {
              return <MessageBlock message={message} key={id} />;
            })
          ) : (
            <p>Pas de messages</p>
          )}
        </div>
      </>
    );
}
