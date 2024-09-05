import AvatarDisplay from "@/components/AvatarDisplay";
import { ISOtoLastMessageDate } from "@/utils/formatDate";
import { useThreadsContext } from "./context/ThreadsContext";

export default function ThreadList() {
  const {
    threads,
    activeThread,
    setActiveThread,
    setProduct,
    getMessages,
    getProduct,
    user,
    setIsInfo,
  } = useThreadsContext();

  // console.log("threads =>", threads);

  function handleThreadClick(id, productId) {
    setActiveThread(threads.find((thread) => thread.id === id));
    getMessages(id);
    setProduct(null);
    setIsInfo(false);
    if (productId) {
      getProduct(productId);
    }
  }

  return (
    <ul className="overflow-y-scroll">
      {threads.map((thread) => {
        const { id, productId, authors, lastMessage } = thread;
        const isActive = id === activeThread?.id;
        const avatar = thread.authors[0].avatar;
        const threadTitle = authors.find(
          (authors) => authors.id !== user.id
        ).username;
        return (
          <li key={id}>
            <button
              onClick={() => handleThreadClick(id, productId)}
              className={`flex p-4 items-center justify-start gap-4 border-b border-pale-grey w-full text-left ${
                isActive && "bg-white"
              }`}
            >
              <AvatarDisplay avatar={avatar} size={54} className="flex-none" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h2 className="font-bold mr-2">{threadTitle}</h2>
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
                {/* TODO date in hours if less than one day ago and in nb of days if less than one week */}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
