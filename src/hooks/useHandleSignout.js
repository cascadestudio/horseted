import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function useHandleSignout() {
  const router = useRouter();
  const auth = getAuth();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        router.push("/"); // Redirect to the home page on successful sign-out
      })
      .catch((error) => {
        console.error("Error signing out:", error); // Log the error if sign-out fails
      });
  };

  return handleSignout;
}
