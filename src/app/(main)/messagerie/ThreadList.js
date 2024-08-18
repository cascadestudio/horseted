import AvatarDisplay from "@/components/AvatarDisplay";
import { ISOtoDate } from "@/utils/formatDate";

export default function ThreadList({
  threads,
  handleThreadClick,
  activeThreadId,
}) {
  const avatar = threads[0].authors[0].avatar;

  return (
    <ul className="overflow-y-scroll">
      {threads.map((thread) => {
        const { id, productId, authors, lastMessage } = thread;
        const isActive = id === activeThreadId;
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
                  <h2 className="font-bold mr-2">{authors[0].username}</h2>
                  {!lastMessage.seen && (
                    <div className="w-[10px] h-[10px] bg-red rounded-full"></div>
                  )}
                </div>
                <p className="text-darker-grey truncate">
                  {lastMessage.content}
                </p>
              </div>
              <p className="font-poppins font-medium self-start flex text-sm">
                {ISOtoDate(lastMessage.createdAt)}
                {/* TODO date in hours if less than one day ago and in nb of days if less than one week */}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
