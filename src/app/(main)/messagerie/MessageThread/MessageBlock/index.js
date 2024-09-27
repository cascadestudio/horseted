import DisplayMedia from "@/components/DisplayMedia";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";

import OrderInfoMessage from "./OrderInfoMessage";

export default function MessageBlock({ message }) {
  const { content, type, medias, offerId } = message;

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
    return <OrderInfoMessage type={type} offerId={offerId} />;
  }
}
