import DisplayMedia from "@/components/DisplayMedia";

import OrderInfoMessage from "./OrderInfoMessage";
import { useThreadsContext } from "../../context/ThreadsContext";

export default function MessageBlock({ message }) {
  const { content, type, medias, offerId, senderId } = message;
  const { user } = useThreadsContext();

  const isMessageFromRecipient = user?.id === senderId;

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
