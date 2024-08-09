import AvatarDisplay from "@/components/AvatarDisplay";
import { formatDate } from "@/utils/formatDate";
import getImage from "@/utils/getImage";
import { useEffect, useState } from "react";

export default function ThreadList({ threads, handleThreadClick }) {
  const [avatarSrc, setAvatarSrc] = useState(null);
  console.log("threads =>", threads);
  useEffect(() => {
    const avatarFile = threads[0].authors[0].avatar.files.thumbnail200;
    fetchAvatar(avatarFile);
  }, []);

  async function fetchAvatar(file) {
    const avatarSrc = await getImage(file, "client");
    setAvatarSrc(avatarSrc);
  }

  return (
    <ul>
      {threads.map((thread) => {
        const { id, productId, authors, lastMessage } = thread;
        return (
          <li key={id}>
            <button
              onClick={() => handleThreadClick(id, productId)}
              className="flex p-4 items-center justify-start gap-4 border-b border-pale-grey w-full text-left"
            >
              <AvatarDisplay
                avatarSrc={avatarSrc}
                size="sm"
                className="flex-none"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-bold">{authors[0].username}</h2>
                <p className="text-darker-grey truncate">
                  {lastMessage.content}
                </p>
              </div>
              <p className="font-poppins font-medium self-start flex text-sm">
                {formatDate(lastMessage.createdAt)}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
