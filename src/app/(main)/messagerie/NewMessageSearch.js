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
    <div className="p-7 flex flex-col">
      <input
        className={`pl-5 border border-pale-grey rounded-full h-11 w-full ${className}`}
        type="text"
        placeholder="Rechercher un membre"
        onChange={(e) => handleSearchChange(e)}
      />
      <ul className="overflow-y-scroll h-[500px]">
        {users.length > 0 ? (
          users.map(({ id, username }) => (
            <li key={id} className="p-5">
              {username}
            </li>
          ))
        ) : (
          <p className="p-5">Aucun résultat</p>
        )}
      </ul>
    </div>
  );
}
