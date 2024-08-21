import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";

export default function NewMessageForm({
  getThreads,
  setActiveThreadId,
  activeThreadId,
  getMessages,
  accessToken,
}) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (activeThreadId === null) {
      await postThread(message);
      await getThreads();
      // router.replace("/messagerie", undefined, { shallow: true });
    } else {
      await postMessage(message);
      getMessages(activeThreadId);
    }
    setMessage("");
  }

  async function postThread(message) {
    const body = {
      userId: seller?.id,
      productId: product ? product.id : null,
      content: message,
    };
    const newThread = await fetchHorseted(
      `/threads`,
      accessToken,
      "POST",
      body,
      true,
      true
    );
    setActiveThreadId(newThread.id);
  }

  async function postMessage(message) {
    const body = {
      content: message,
    };
    await fetchHorseted(
      `/threads/${activeThreadId}/messages`,
      accessToken,
      "POST",
      body,
      true
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 p-4 border-t border-darker-grey bg-white sticky bottom-0"
    >
      <button>
        <img src="/icons/media-message.svg" alt="" />
      </button>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Aa"
        id="content"
        name="content"
        className="flex-1 border border-pale-grey rounded-full resize-none ps-4 pt-[5px] h-[38px]"
        rows="1"
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="flex border border-light-green sm:border-none sm:bg-dark-green text-white rounded-full p-1 sm:ps-6 font-bold items-center"
      >
        <span className="hidden sm:inline">Envoyer</span>
        <span className="sm:ml-2 bg-white rounded-full h-7 w-7 flex items-center justify-center">
          <img src="/icons/send-message.svg" alt="" />
        </span>
      </button>
    </form>
  );
}
