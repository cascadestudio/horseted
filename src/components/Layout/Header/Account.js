"use client";
import { useAuthContext } from "@/context/AuthContext";
import MyAccountDropDown from "./MyAccountDropDown";

export default function Account() {
  const { user } = useAuthContext();

  // console.log("user =>", user);

  return (
    <>
      {user === null ? (
        <button>Se connecter / S’inscrire</button>
      ) : (
        <MyAccountDropDown />
      )}
    </>
  );
}
