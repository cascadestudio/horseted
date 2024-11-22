import { useNotificationsContext } from "@/context/NotificationsContext";

export default function MessageIcon() {
  const { unseenMessagesNb } = useNotificationsContext();

  return (
    <div className="relative">
      <svg
        width="24"
        height="22"
        viewBox="0 0 24 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1.04227C20.5556 1.04227 23 2.11395 23 10.6874C23 19.2608 20.5556 20.3325 12 20.3325C3.44444 20.3325 1 19.1269 1 10.6874C0.999999 2.24791 3.44444 1.04227 12 1.04227Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 8.14917C9.25 12.7179 10.875 14.2408 12.5 14.2408C14.125 14.2408 15.75 12.7179 19 8.14917"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {unseenMessagesNb > 0 && (
        <div className="text-sm flex items-center justify-center bg-red text-white w-5 h-5 rounded-full absolute top-[-10px] right-[-10px] border border-white">
          {unseenMessagesNb > 9 ? "9+" : unseenMessagesNb}
        </div>
      )}
    </div>
  );
}
