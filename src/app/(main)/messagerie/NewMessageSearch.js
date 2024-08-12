"use client";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";

export default function SearchBar({ className }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      getUsers();
    }
  };

  async function getUsers() {
    const users = await fetchHorseted(`/users?terms=${searchTerm}`);
    console.log("users =>", users);
  }

  return (
    <div className="p-7">
      <input
        className={`pl-5 border border-pale-grey rounded-full h-11 w-full ${className}`}
        type="text"
        placeholder="Rechercher un membre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
