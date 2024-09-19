import fetchHorseted from "@/utils/fetchHorseted";

export const getThreads = async (accessToken) => {
  const threads = await fetchHorseted("/threads", accessToken);
  return threads;
};

export const getMessages = async (accessToken, id) => {
  const messages = await fetchHorseted(`/threads/${id}/messages`, accessToken);
  return messages;
};

export const deleteThread = async (activeThreadId) => {
  await fetchHorseted(`/threads/${activeThreadId}`, accessToken, "DELETE");
};
