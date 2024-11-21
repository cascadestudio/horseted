import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, appleProvider } from "@/libs/firebase/config";
import { postUser } from "@/utils/postUser";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/getUser";
import Alert from "@/components/Alert";
import { useState } from "react";

const SignIn = ({ providerName, type, setIsSignInModal }) => {
  const router = useRouter();
  const [isAlert, setIsAlert] = useState(false);

  const getProvider = () => {
    switch (providerName) {
      case "google":
        return googleProvider;
      case "apple":
        return appleProvider;
      default:
        return null;
    }
  };

  const handleExternalProvider = async () => {
    const provider = getProvider();
    setIsAlert(false);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(`User signed in with ${providerName}`, result.user);
      const accessToken = await result.user.getIdToken();
      const user = await getUser(accessToken);

      if (!user) {
        if (type === "signin") {
          console.log("User not found, redirecting to signup...");
          return router.push("/signup");
        }
        if (type === "signup") {
          console.log("User not found, creating an account...");
          await postUser({
            firebaseToken: accessToken,
            username: result.user.displayName,
            newsletter: true,
          });
          console.log("User created successfully");
          if (setIsSignInModal) {
            setIsSignInModal(false);
          } else {
            console.log("Redirecting to home...");
            return router.push("/");
          }
        }
      } else {
        console.log("User already exists");
        if (setIsSignInModal) {
          setIsSignInModal(false);
        } else {
          console.log("Redirecting to home...");
          return router.push("/");
        }
      }
    } catch (error) {
      console.error(`Error during ${providerName} sign-in:`, error);
      setIsAlert(true);
      return;
    }
  };

  return (
    <>
      <button
        onClick={handleExternalProvider}
        className="flex items-center border border-black w-[280px] lg:w-[350px] rounded-[50px] p-1 ml-auto mr-auto mb-5"
      >
        <div className="relative bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center lg:h-[50px] lg:w-[50px]">
          {providerName === "apple" ? (
            <img src="/icons/apple-logo.svg" alt="Logo Apple" />
          ) : (
            <img src="/icons/google-logo.svg" alt="Logo Google" />
          )}
        </div>
        <span className="font-semibold pl-3 pr-7 lg:pr-[70px] lg:pl-[38px]">
          Continuer avec <span className="capitalize">{providerName}</span>
        </span>
      </button>
      {isAlert && (
        <Alert type="error">
          Erreur durant la création de compte avec{" "}
          <span className="capitalize">{providerName}</span>
        </Alert>
      )}
    </>
  );
};

export default SignIn;
