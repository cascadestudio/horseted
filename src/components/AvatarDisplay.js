import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.svg";
import getImage from "@/utils/getImage";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function AvatarDisplay({
  avatar,
  className = "",
  size,
  isLoading,
}) {
  const [avatarSrc, setAvatarSrc] = useState(null);

  useEffect(() => {
    if (!avatar) return;
    const file = avatar.files.thumbnail200;
    fetchAvatar(file);
  }, [avatar]);

  async function fetchAvatar(file) {
    const avatarSrc = await getImage(file, "client");
    setAvatarSrc(avatarSrc);
  }
  const stringSize = size.toString() + "px";

  return (
    <div
      style={{ width: stringSize, height: stringSize }}
      className={`flex-shrink-0 ${className}`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Image
          src={avatarSrc || placeholderImage}
          style={{ width: stringSize, height: stringSize }}
          className={`object-cover rounded-full`}
          width={size}
          height={size}
          alt="Avatar"
        />
      )}
    </div>
  );
}
