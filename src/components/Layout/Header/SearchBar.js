"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ className }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/articles?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <input
      className={
        className +
        " grow border border-black rounded-full h-11 w-full lg:w-auto"
      }
      type="text"
      placeholder="Rechercher un article ou un membre"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
