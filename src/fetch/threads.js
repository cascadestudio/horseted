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

export const postThread = async (
  accessToken,
  { userId, productId, content, medias }
) => {
  const thread = await fetchHorseted(
    `/threads`,
    accessToken,
    "POST",
    { userId, productId, content, medias },
    true,
    true
  );
  return thread;
};

export const postMessage = async (accessToken, { content, medias }) => {
  const body = { content, medias };
  await fetchHorseted(
    `/threads/${activeThread.id}/messages`,
    accessToken,
    "POST",
    body,
    true
  );
};
