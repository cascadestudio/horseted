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
    <div className={`${className} relative grow`}>
      <input
        className="grow border border-black rounded-full h-11 w-full pl-16 py-0 text-base placeholder:text-sm lg:placeholder:text-base"
        type="text"
        placeholder="Rechercher des articles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <img
        className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 "
        src="/icons/search.svg"
        alt=""
      />
      <span className="bg-black h-5 w-px absolute left-12 top-1/2 -translate-y-1/2"></span>
      {/* <img className="absolute" src="/icons/search-arrow-mobile.svg" alt="" /> */}
    </div>
  );
}
