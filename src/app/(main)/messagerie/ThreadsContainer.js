import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import Spinner from "@/components/Spinner";

// Local Components
import MessageThread from "./MessageThread";
import ThreadList from "./ThreadList";
import NewMessageSearch from "./NewMessageSearch";
import NewMessageForm from "./NewMessageForm";
import ThreadInfo from "./ThreadInfo";
import MessageThreadHeader from "./MessageThreadHeader";

export default function ThreadsContainer() {
  const {
    threads,
    setActiveThread,
    loading,
    recipient,
    setIsNewMessageSearch,
    isNewMessageSearch,
    isInfo,
    setProducts,
    setProduct,
  } = useThreadsContext();

  // console.log("order =>", order);

  const handleNewMessageSearchClick = () => {
    setIsNewMessageSearch(!isNewMessageSearch);
    setActiveThread(null);
    setProduct([]);
    setProducts([]);
  };

  return (
    <div className="border border-darker-grey rounded-3xl overflow-hidden mt-10 flex flex-col sm:flex-row h-screen sm:h-[580px]">
      <div className="max-h-[calc(50vh-120px)] sm:max-h-none sm:w-1/3 sm:border-e border-darker-grey flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-pale-grey">
          <h1 className="flex-1 flex justify-center text-xl font-mcqueen font-bold">
            Messages
          </h1>
          <button onClick={handleNewMessageSearchClick}>
            <img src="/icons/new-message.svg" alt="Nouveau message" />
          </button>
        </div>
        {loading ? (
          <Spinner isFullScreen />
        ) : threads.length ? (
          <ThreadList />
        ) : (
          <p>Pas de conversations</p>
        )}
      </div>
      <div className="h-full max-h-[520px] sm:max-h-none sm:w-2/3 bg-white flex flex-col flex-1">
        {isNewMessageSearch ? (
          <NewMessageSearch />
        ) : (
          <>
            <MessageThreadHeader />
            {isInfo && recipient ? (
              <ThreadInfo />
            ) : (
              <>
                <MessageThread />
                <NewMessageForm />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
