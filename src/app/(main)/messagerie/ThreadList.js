import AvatarDisplay from "@/components/AvatarDisplay";
import { ISOtoLastMessageDate } from "@/utils/formatDate";
import { useThreadsContext } from "./context/ThreadsContext";
import { markMessageAsSeen } from "@/fetch/threads";

export default function ThreadList() {
  const {
    threads,
    activeThread,    
    setActiveThread,
    setProduct,
    handleGetProduct,
    user,
    setIsInfo,
    updateMessages,
    setIsNewMessageSearch,
  } = useThreadsContext();

  function handleThreadClick(id, productId) {
    const thread = threads.find((thread) => thread.id === id);
    if (thread?.lastMessage && !thread?.lastMessage.seen) {
      thread.lastMessage.seen = true;
    }

    setActiveThread(thread);    
    updateMessages(id);
    setProduct(null);
    setIsInfo(false);
    setIsNewMessageSearch(false);
    if (productId) {
      handleGetProduct(productId);
    }
  }

  return (
    <ul className="overflow-y-scroll">
      {threads.map((thread) => {
        const { id, productId, authors } = thread;
        const isActive = id === activeThread?.id;
        const { lastMessage } = isActive
          ? activeThread
          : thread;

        const recipient = authors.find((authors) => authors.id !== user.id);

        return (
          <li key={id}>
            <button
              onClick={() => handleThreadClick(id, productId)}
              className={`flex p-4 items-center justify-start gap-4 border-b border-pale-grey w-full text-left ${
                isActive && "bg-white"
              }`}
            >
              <AvatarDisplay
                avatar={recipient.avatar}
                size={54}
                className="flex-none"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h2 className="font-bold mr-2 max-w-[200px] truncate lg:max-w-none capitalize">
                    {recipient.username}
                  </h2>
                  {!lastMessage.seen && (
                    <div className="w-[10px] h-[10px] bg-red rounded-full"></div>
                  )}
                </div>
                <p className="text-darker-grey truncate">
                  {lastMessage.content}
                </p>
              </div>
              <p className="font-poppins font-medium self-start flex text-sm">
                {ISOtoLastMessageDate(lastMessage.createdAt)}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
