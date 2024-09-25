import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import { useState } from "react";
import MediaInput from "./MediaInput";
import { postThread, postMessage } from "@/fetch/threads";

export default function NewMessageForm() {
  const {
    setActiveThread,
    activeThread,
    accessToken,
    recipient,
    product,
    updateMessages,
    handleGetTreads,
  } = useThreadsContext();

  const [message, setMessage] = useState({
    content: "",
    medias: [],
  });
  const [imageSrcs, setImageSrcs] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!activeThread) {
      await handlePostThread();
      await handleGetTreads();
    } else {
      await postMessage(accessToken, activeThread.id, {
        content: message.content,
        medias: message.medias,
      });
      await updateMessages();
    }
    resetMessage();
  }

  const resetMessage = () => {
    setMessage({ medias: [], content: "" });
    setImageSrcs([]);
  };

  async function handlePostThread() {
    const newThread = await postThread(accessToken, {
      userId: recipient.id,
      productId: product ? product.id : null,
      content: message.content,
      medias: message.medias,
    });
    setActiveThread(newThread);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 p-4 border-t border-darker-grey bg-white sticky bottom-0 items-center"
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
