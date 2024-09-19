import Alert from "@/components/Alert";
import Spinner from "@/components/Spinner";
import {
  getAuth,
  linkWithPopup,
  unlink,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect, useState } from "react";

export default function LinkAccount() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const checkIfGoogleLinked = () => {
      const user = auth.currentUser;
      console.log("user =>", user);
      if (user) {
        const googleProvider = user.providerData.find(
          (provider) => provider.providerId === "google.com"
        );

        if (googleProvider) {
          console.log("Google account is already linked.");
          setIsGoogleLinked(true);
          return;
        } else {
          console.log("Google account is not linked.");
          setIsGoogleLinked(false);
          return;
        }
      }
    };
    checkIfGoogleLinked();
  }, []);

  const linkGoogleAccount = async () => {
    try {
      setIsLoading(true);
      const result = await linkWithPopup(auth.currentUser, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const linkedUser = result.user;
      console.log("Google account linked:", linkedUser);
    } catch (error) {
      if (error.code === "auth/credential-already-in-use") {
        setIsLoading(false);
        return setAlert({
          type: "error",
          message: "Ce compte Google est déjà lié",
        });
      } else {
        setIsLoading(false);
        setAlert({
          type: "error",
          message: error,
        });
        return console.error("Error linking Google account:", error);
      }
    }
    setIsLoading(false);
    setIsGoogleLinked(true);
    return setAlert({
      type: "success",
      message: "Compte Google lié",
    });
  };

  const unlinkGoogleAccount = async () => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;
      if (user) {
        await unlink(user, "google.com");
        setIsGoogleLinked(false);
        console.log("Google account unlinked.");
        setIsLoading(false);
        return setAlert({
          type: "success",
          message: "Compte Google dissocié",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error unlinking Google account:", error);
    }
  };

  const handleClick = () => {
    if (isGoogleLinked) {
      unlinkGoogleAccount();
    } else {
      linkGoogleAccount();
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      className="flex items-center border border-black lg:w-[350px] rounded-[50px] p-1 h-14"
    >
      <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
        <img src="/icons/google-logo.svg" alt="Logo Google" />
      </div>
      {isLoading ? (
        <Spinner className="m-auto" />
      ) : (
        <span className="font-semibold pl-3 pr-10 lg:pl-6">
          {isGoogleLinked
            ? "Dissocier un compte Google"
            : "Associer un compte Google"}
        </span>
      )}
      {alert && (
        <Alert type={alert.type} setAlert={setAlert}>
          {alert.message}
        </Alert>
      )}
    </button>
  );
}
