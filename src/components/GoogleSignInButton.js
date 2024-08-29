import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/libs/firebase/config";
import GoogleIcon from "@/assets/icons/GoogleIcon.svg";
import Image from "next/image";
import { postUser } from "@/utils/postUser";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/getUser";

export default function GoogleSignInButton() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User signed in:", result.user);
      const accessToken = result.user.accessToken;
      const user = await getUser(accessToken);
      if (!user) {
        await postUser({
          firebaseToken: accessToken,
          username: result.user.displayName,
          newsletter: true,
        });
      }
      return router.push("/");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center border border-black w-fit rounded-[50px] p-1 ml-auto mr-auto lg:mb-[55px]"
    >
      <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
        <Image
          src={GoogleIcon}
          alt="Google Icon"
          className="h-5 w-5 lg:h-6 lg:w-6"
          priority
        />
      </div>
      <span className="font-semibold pl-3 pr-8 lg:pr-[70px] lg:pl-[38px]">
        Continuer avec Google
      </span>
    </button>
  );
}
