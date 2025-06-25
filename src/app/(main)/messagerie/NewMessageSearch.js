import { useThreadsContext } from "./context/ThreadsContext";
import NextArrow from "@/assets/icons/NextArrow";
import AvatarDisplay from "@/components/AvatarDisplay";
import fetchHorseted from "@/utils/fetchHorseted";
import { useState } from "react";

export default function NewMessageSearch() {
  const {
    threads,
    accessToken,
    setProduct,
    setMessages,
    setRecipient,
    setIsNewMessageSearch,
    user,
  } = useThreadsContext();

  const [users, setUsers] = useState([]);

  const handleSearchChange = (e) => {
    getUsers(e.target.value);
  };

  async function getUsers(searchTerm) {
    const searchedUsers = await fetchHorseted(`/users?terms=${searchTerm}`, accessToken);
    const usersWithoutThreads = searchedUsers.items.filter(
      (searchedUser) =>
        searchedUser.id !== user.id &&
        !threads.some((thread) => thread.authors[0].id === searchedUser.id)
    );
    
    setUsers(usersWithoutThreads);
  }

  const handleClick = (user) => {
    setRecipient(user);
    setIsNewMessageSearch(false);
    setMessages([]);
    setProduct(null);
  };

  return (
    <div className="p-7 flex flex-col">
      <input
        className="pl-5 border border-pale-grey rounded-full h-11 w-full"
        type="text"
        placeholder="Rechercher un membre"
        onChange={handleSearchChange}
        onFocus={handleSearchChange}
      />
      <ul className="overflow-y-scroll h-[500px] mt-3">
        {users.length > 0 &&
          users.map((user) => {
            const { id, username, avatar } = user;
            return (
              <li key={id} className="px-5 py-3 border-b">
                <button
                  className="flex items-center w-full"
                  onClick={() => handleClick(user)}
                >
                  <AvatarDisplay avatar={avatar} size={43} className="mr-4" />
                  <p className="font-semibold capitalize">{username}</p>
                  <NextArrow className="ml-auto" />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
