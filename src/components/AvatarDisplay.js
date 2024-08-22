import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.svg";
import getImage from "@/utils/getImage";
import { useEffect, useState } from "react";

export default function AvatarDisplay({ avatar, className = "", size }) {
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

  return (
    <Image
      src={avatarSrc || placeholderImage}
      style={{ width: size, height: size }}
      className={`${className} object-cover rounded-full`}
      width={size}
      height={size}
      alt="Avatar"
    />
  );
}
