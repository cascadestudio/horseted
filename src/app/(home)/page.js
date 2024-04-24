"use client";
import { useAuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuthContext();
  console.log(user);
  return <main className="font-mcqueen font-thin">Home</main>;
}
