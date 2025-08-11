import DisplayMedia from "@/components/DisplayMedia";

import OrderInfoMessage from "./OrderInfoMessage";
import { useThreadsContext } from "../../context/ThreadsContext";
import { useEffect } from "react";
import { markMessageAsSeen } from "@/fetch/threads";

export default function MessageBlock({ message }) {
  const { content, type, medias, offerId, senderId } = message;
  const { user, activeThread,  accessToken } = useThreadsContext();

  const isMessageFromRecipient = user?.id === senderId;

  useEffect(() => {
    if (!message.seen) {
      message.seen = true;
      markMessageAsSeen(accessToken, activeThread.id, message.id);
    }
  }, [])

  if (type === "message") {
    return (
      <li
        className={`message-container ${
          isMessageFromRecipient ? "self-end" : "self-start"
        }`}
      >
        <p>{content}</p>
        {medias?.length > 0 && <DisplayMedia medias={medias} />}
      </li>
    );
  } else {
    return <OrderInfoMessage message={message} offerId={offerId} />;
  }
}
