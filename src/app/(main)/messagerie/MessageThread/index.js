import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import "@/app/styles/globals.css";
import MessageBlock from "./MessageBlock";
import StarRating from "@/components/StarRating";
import CityIcon from "@/assets/icons/CityIcon";
import capitalizeText from "@/utils/capitalizeText";
import Spinner from "@/components/Spinner";

export default function MessageThread() {
  const { messages, recipient, loading } = useThreadsContext();

  const reversedMessages = [...messages].reverse();

  return (
    <div className="flex flex-col min-h-[400px] flex-1">
      {loading ? (
        <Spinner isFullScreen />
      ) : (
        <div className="flex-1 flex overflow-y-scroll">
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
            {/* {orderTracking && orderTracking.statuses[0] === "delivered" && (
              <div>Terminé ! Merci pour votre commande sur Horseted</div>
            )} */}
          </ul>
        </div>
      )}
    </div>
  );
}
