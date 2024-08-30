import MessageIcon from "@/components/MessageIcon";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

export default function MobileMessageButton() {
  const { user } = useAuthContext();

  if (user) {
    return (
      <Link href="/messagerie">
        <MessageIcon />
      </Link>
    );
  } else {
    return (
      <Link href="/signin">
        <LoginIcon />
      </Link>
    );
  }
}

const LoginIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-black" // Tailwind class example
  >
    <path
      d="M11 1C16.5 1 17 2 17 9C17 16 16.5 17 11 17"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 9L12 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 13L12 9L8 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
