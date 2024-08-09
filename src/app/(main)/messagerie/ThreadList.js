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
            <button onClick={() => handleThreadClick(id, productId)}>
              <AvatarDisplay avatarSrc={avatarSrc} />
              {authors[0].username}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
