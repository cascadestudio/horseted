import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function useHandleSignout() {
  const router = useRouter();
  const auth = getAuth();
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return handleSignout;
}
