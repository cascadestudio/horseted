"use client";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";

export default function SearchBar({ className }) {
  const [users, setUsers] = useState([]);
  const handleSearchChange = (e) => {
    getUsers(e.target.value);
  };

  async function getUsers(searchTerm) {
    const users = await fetchHorseted(`/users?terms=${searchTerm}`);
    setUsers(users.items);
  }

  return (
    <div className="p-7">
      <input
        className={`pl-5 border border-pale-grey rounded-full h-11 w-full ${className}`}
        type="text"
        placeholder="Rechercher un membre"
        onChange={(e) => handleSearchChange(e)}
      />
      {users.length > 0 ? (
        users.map(({ id, username }) => <div key={id}>{username}</div>)
      ) : (
        <p>Aucun résultat</p>
      )}
    </div>
  );
}
