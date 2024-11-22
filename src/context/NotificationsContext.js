"use client";

import { createContext, useContext, useState, useEffect } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import { useAuthContext } from "@/context/AuthContext";

export const NotificationsContext = createContext({});
export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsContextProvider = ({ children }) => {
  const { accessToken } = useAuthContext();

  const [unseenMessagesNb, setUnseenMessagesNb] = useState(0);

  useEffect(() => {
    if (accessToken) handleUnseenMessagesNb();
  }, [accessToken]);

  async function handleUnseenMessagesNb() {
    const threads = await getThreads();
    const unseenThreads = threads.filter((thread) => !thread.lastMessage.seen);
    const messages = await Promise.all(
      unseenThreads.map(async (thread) => {
        return await getMessages(thread.id);
      })
    );
    const unseenMessagesNb = messages
      .flat()
      .filter((message) => !message.seen).length;
    setUnseenMessagesNb(unseenMessagesNb);
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

  // const [unseenNotificationsNb, setUnseenNotificationsNb] = useState(0);

  // useEffect(() => {
  //   if (accessToken) handleUnseenNotificationsNb();
  // }, [accessToken]);

  // async function handleUnseenNotificationsNb() {
  //   const notifications = await getNotifications();
  //   console.log("notifications =>", notifications);

  //   const unseenNotifications = notifications.filter(
  //     (notification) => notification.seen === "false"
  //   );
  //   const unseenNotificationsNb = unseenNotifications.length;
  //   console.log("unseenNotificationsNb =>", unseenNotificationsNb);
  //   setUnseenNotificationsNb(unseenNotificationsNb);
  // }

  // async function getNotifications() {
  //   const notifications = await fetchHorseted("/notifications", accessToken);
  //   return notifications;
  // }

  return (
    <NotificationsContext.Provider
      value={{ unseenMessagesNb, handleUnseenMessagesNb }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
