"use client";
import NextArrow from "@/assets/icons/NextArrow";
import AvatarDisplay from "@/components/AvatarDisplay";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";

export default function NewMessageSearch({ threads, handleClick }) {
  const [users, setUsers] = useState([]);

  const handleSearchChange = (e) => {
    getUsers(e.target.value);
  };

  async function getUsers(searchTerm) {
    const users = await fetchHorseted(`/users?terms=${searchTerm}`);
    const usersWithoutThreads = users.items.filter(
      (user) => !threads.some((thread) => thread.authors[0].id === user.id)
    );
    setUsers(usersWithoutThreads);
  }

  return (
    <div className="p-7 flex flex-col">
      <input
        className="pl-5 border border-pale-grey rounded-full h-11 w-full"
        type="text"
        placeholder="Rechercher un membre"
        onChange={(e) => handleSearchChange(e)}
      />
      <ul className="overflow-y-scroll h-[500px] mt-3">
        {users.length > 0 ? (
          users.map((user) => {
            const { id, username, avatar } = user;
            return (
              <li key={id} className="px-5 py-3 border-b">
                <button
                  className="flex items-center w-full"
                  onClick={() => handleClick(user)}
                >
                  <AvatarDisplay avatar={avatar} size={43} className="mr-4" />
                  <p className="font-semibold">{username}</p>
                  <NextArrow className="ml-auto" />
                </button>
              </li>
            );
          })
        ) : (
          <p className="p-5">Aucun résultat</p>
        )}
      </ul>
    </div>
  );
}
