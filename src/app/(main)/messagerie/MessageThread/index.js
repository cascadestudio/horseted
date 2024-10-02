import { useEffect, useRef } from "react";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import "@/app/styles/globals.css";
import MessageBlock from "./MessageBlock";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import capitalizeText from "@/utils/capitalizeText";
import Spinner from "@/components/Spinner";

export default function MessageThread() {
  const { messages, recipient, isLoading } = useThreadsContext();

  const threadContainerRef = useRef(null);

  const reversedMessages = [...messages].reverse();

  useEffect(() => {
    if (threadContainerRef.current) {
      threadContainerRef.current.scrollTop =
        threadContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col min-h-[400px] pb-5 sm:pb-0 flex-1">
      {isLoading ? (
        <Spinner isFullScreen />
      ) : (
        <div ref={threadContainerRef} className="flex-1 flex overflow-y-scroll">
          <ul className="flex flex-col gap-y-4 flex-1 p-10">
            {recipient && (
              <li className="message-container self-start">
                <p className="font-medium text-sm">
                  <span className="font-bold">Bonjour</span>, moi c’est{" "}
                  {recipient.username}
                </p>
                <StarRating review={recipient.review} />
                {recipient.city && (
                  <div className="text-grey flex items-center gap-1 mt-3">
                    <CityIcon className="h-3 stroke-current fill-none" />
                    <span className="text-xs font-medium">
                      {capitalizeText(recipient.city)}
                    </span>
                  </div>
                )}
              </li>
            )}
            {reversedMessages.length > 0 &&
              reversedMessages.map((message) => (
                <MessageBlock key={message.id} message={message} />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
