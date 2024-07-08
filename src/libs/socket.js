import io from "socket.io-client";

let socket;

export const initializeSocket = () => {
  if (!socket) {
    const baseUrl = process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL;
    socket = io(baseUrl);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};
