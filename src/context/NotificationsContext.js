"use client";

import { createContext, useContext, useState, useEffect } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";

export const NotificationsContext = createContext({});
export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsContextProvider = ({ children }) => {
  const { accessToken } = useAuthContext();

  const [threads, setThreads] = useState([]);
  const [unseenMessagesNb, setUnseenMessagesNb] = useState(0);

  useEffect(() => {
    if (accessToken) handleUnseenMessagesNb();
  }, [accessToken]);

  async function handleUnseenMessagesNb() {
    const threads = await getThreads();
    const unseenThreads = threads.filter((thread) => thread.lastMessage && !thread.lastMessage.seen);

    setThreads(threads);
    setUnseenMessagesNb(unseenThreads.length);
  }

  async function markThreadAsSeen(threadId) {
    const thread = threads.find(t => t.id == threadId);
    
    if (!thread) {
      handleUnseenMessagesNb();
    } else if (thread?.lastMessage?.seen === false) {
      thread.lastMessage.seen = true;      
      const unseenThreads = threads.filter((thread) => thread.lastMessage && !thread.lastMessage.seen);
      
      setThreads(threads);
      setUnseenMessagesNb(unseenThreads.length);    
    }    
  }

  async function getThreads() {
    const threads = await fetchHorseted(
      "/threads",
      accessToken,
      "GET",
      null,
      true
    );
    return threads;
  }

  async function getMessages(threadId) {
    const messages = await fetchHorseted(
      `/threads/${threadId}/messages`,
      accessToken
    );
    return messages;
  }

  return (
    <NotificationsContext.Provider
      value={{
        unseenMessagesNb,
        handleUnseenMessagesNb,
        markThreadAsSeen       
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
