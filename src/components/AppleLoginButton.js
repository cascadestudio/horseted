// components/SignIn.js
import { signInWithPopup } from "firebase/auth";
import { auth, appleProvider } from "@/libs/firebase/config";

const SignIn = () => {
  const handleAppleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      // User signed in successfully.
      const user = result.user;
      console.log("User info:", user);
    } catch (error) {
      console.error("Apple Sign-In error:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleAppleSignIn}
        className="bg-black text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          {/* SVG path for Apple logo */}
          <path d="..." />
        </svg>
        <span>Sign in with Apple</span>
      </button>
    </div>
  );
};

export default SignIn;
