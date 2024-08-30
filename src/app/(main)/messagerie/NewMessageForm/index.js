import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";
import MediaInput from "./MediaInput";

export default function NewMessageForm({
  getThreads,
  setActiveThread,
  activeThreadId,
  getMessages,
  accessToken,
  sellerId,
  productId,
}) {
  const [message, setMessage] = useState({
    content: "",
    medias: [],
  });
  const [imageSrcs, setImageSrcs] = useState([]);

  // console.log("activeThreadId =>", activeThreadId);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!activeThreadId) {
      await postThread(message);
      await getThreads();
      // router.replace("/messagerie", undefined, { shallow: true });
    } else {
      await postMessage(message);
      getMessages(activeThreadId);
    }
    setMessage({ medias: [], content: "" });
    setImageSrcs([]);
  }

  async function postThread(message) {
    const body = {
      userId: sellerId,
      productId: productId ? productId : null,
      content: message.content,
      medias: message.medias,
    };
    const newThread = await fetchHorseted(
      `/threads`,
      accessToken,
      "POST",
      body,
      true,
      true
    );
    setActiveThread(newThread);
  }

  async function postMessage(message) {
    const body = {
      content: message.content,
      medias: message.medias,
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
      <MediaInput
        accessToken={accessToken}
        setMessage={setMessage}
        setImageSrcs={setImageSrcs}
        imageSrcs={imageSrcs}
      />
      <textarea
        value={message.content}
        onChange={(e) =>
          setMessage((prev) => ({ ...prev, content: e.target.value }))
        }
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