import io from "socket.io-client";

let socket;

export default function handleSocketPayment(paymentIntentId) {
  if (!socket) {
    const baseUrl = process.env.NEXT_PUBLIC_HORSETED_API_BASE_URL;
    const query = { payment_intent_id: paymentIntentId };

    socket = io(baseUrl, {
      forceNew: true,
      transports: ["websocket"],
      autoConnect: false,
      query,
    });

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("error", (data) => {
      console.error("Socket error:", data);
    });

    socket.on("payment_confirmation_result", async (data) => {
      if (data.status === "succeeded") {
        console.log("Payment successful");
        // Fetch user orders and threads
        await fetchUserOrders();
        await fetchUserThreads();

        // Redirect to payment success page
        window.location.href = "/";
      } else {
        // Show error message
        alert("Payment failed");
      }
    });
  }

  return socket;
}

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initializeSocket first.");
  }
  return socket;
};

const fetchUserOrders = async () => {
  // Implement the function to fetch user orders
  console.log("Fetching user orders...");
};

const fetchUserThreads = async () => {
  // Implement the function to fetch user threads
  console.log("Fetching user threads...");
};
