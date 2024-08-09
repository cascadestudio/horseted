import AvatarDisplay from "@/components/AvatarDisplay";
import getImage from "@/utils/getImage";
import { useEffect, useState } from "react";

export default function ThreadList({ threads, handleThreadClick }) {
  const [avatarSrc, setAvatarSrc] = useState(null);

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
        const { id, productId, authors } = thread;
        return (
          <li key={id}>
            <button
              onClick={() => handleThreadClick(id, productId)}
              className="flex p-4 items-center gap-4 border-b border-pale-grey w-full"
            >
              <AvatarDisplay avatarSrc={avatarSrc} size="sm" />
              <h2 className="font-bold">{authors[0].username}</h2>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
