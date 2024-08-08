import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.svg";

export default function AvatarDisplay({ avatarSrc }) {
  return avatarSrc ? (
    <Image
      src={avatarSrc}
      className="h-21 w-21 object-cover rounded-full"
      width={84}
      height={84}
      alt="Avatar"
    />
  ) : (
    <Image
      src={placeholderImage}
      className="h-21 w-21 object-cover rounded-full"
      width={84}
      height={84}
      alt="Avatar"
      priority
    />
  );
}
