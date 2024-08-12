import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.svg";

export default function AvatarDisplay({
  avatarSrc,
  className = "",
  size = "md",
}) {
  const avatarSize = size === "sm" ? 54 : 84;

  return (
    <Image
      src={avatarSrc || placeholderImage}
      className={`${className} object-cover rounded-full`}
      width={avatarSize}
      height={avatarSize}
      alt="Avatar"
    />
  );
}
