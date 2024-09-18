import Alert from "@/components/Alert";
import { getAuth, linkWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";

export default function LinkAccount() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const [alert, setAlert] = useState({
    type: "",
    message: "",
  });

  const linkGoogleAccount = async () => {
    try {
      const result = await linkWithPopup(auth.currentUser, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const linkedUser = result.user;
      console.log("Google account linked:", linkedUser);
    } catch (error) {
      if (error.code === "auth/credential-already-in-use") {
        return setAlert({
          type: "error",
          message: "Ce compte Google est déjà lié",
        });
      } else {
        setAlert({
          type: "error",
          message: error,
        });
        return console.error("Error linking Google account:", error);
      }
    }
    return setAlert({
      type: "success",
      message: "Compte Google lié",
    });
  };

  return (
    <button
      onClick={() => linkGoogleAccount()}
      className="flex items-center border border-black lg:w-fit rounded-[50px] p-1 h-14 w-full"
    >
      <div className="bg-white rounded-full h-[41px] w-[41px] flex items-center justify-center mr-3 lg:h-[50px] lg:w-[50px]">
        <img src="/icons/google-logo.svg" alt="Logo Google" />
      </div>
      <span className="font-semibold pl-3 pr-10 lg:pl-6">
        Associer un compte Google
      </span>
      {alert.message && <Alert type={alert.type}>{alert.message}</Alert>}
    </button>
  );
}
