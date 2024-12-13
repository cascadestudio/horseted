"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useNotificationsContext } from "@/context/NotificationsContext";
import { getMessages, getThreads } from "@/fetch/threads";
import { getOrder, getOrderTracking } from "@/fetch/orders";
import { getUser } from "@/fetch/users";
import { getProducts } from "@/fetch/products";
import fetchHorseted from "@/utils/fetchHorseted";
import { useRouter } from "next/navigation";

const ThreadsContext = createContext();

export const ThreadsProvider = ({
  children,
  orderId,
  userIdParam,
  threadIdParam,
}) => {
  const router = useRouter();
  const { user, accessToken } = useAuthContext();
  const { handleUnseenMessagesNb } = useNotificationsContext();

  // States
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderTracking, setOrderTracking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [isInfo, setIsInfo] = useState(false);

  // Initialize threads
  useEffect(() => {
    initThreads(orderId, userIdParam, threadIdParam);
  }, [orderId, user]);

  // Fetch thread-specific data when activeThread changes
  useEffect(() => {
    if (!activeThread) return;
    fetchThreadData();
  }, [activeThread, user]);

  // Fetch products from the order
  useEffect(() => {
    if (order?.items?.length) {
      handleGetProductsFromOrder(order);
    }
  }, [order]);

  // Functions
  const handleGetThreads = useCallback(async () => {
    const response = await getThreads(accessToken);
    setThreads(response);
    return response;
  }, [accessToken]);

  const initThreads = useCallback(
    async (orderId, userIdParam, threadIdParam) => {
      const threadsResponse = await handleGetThreads();
      if (!threadsResponse.length) return;

      const userThreads = threadsResponse.filter((thread) =>
        thread.authors.some(
          (author) => author.id === user.id && !author.deleted
        )
      );
      setThreads(userThreads);

      let thread = null;
      if (orderId) {
        thread = userThreads.find((t) => t.orderId === orderId);
      } else if (threadIdParam) {
        console.log("threadIdParam", threadIdParam);
        thread = userThreads.find((t) => t.id === threadIdParam);
      } else if (userIdParam) {
        thread = userThreads.find((t) =>
          t.authors.some((author) => author.id === userIdParam)
        );
      }
      if (!thread && userIdParam) {
        const recipient = await getUser(accessToken, userIdParam);
        setRecipient(recipient);
        setIsNewMessageSearch(false);
        setMessages([]);
        setProduct(null);
      } else if (!thread && userThreads.length) {
        thread = userThreads[0];
      } else if (thread) setActiveThread(thread);
    },
    [user]
  );

  const fetchThreadData = useCallback(async () => {
    updateMessages(activeThread.id);
    const recipientId = activeThread.authors.find((a) => a.id !== user.id)?.id;
    if (recipientId) getRecipient(recipientId);

    if (activeThread.orderId) {
      const orderData = await getOrder(accessToken, activeThread.orderId);
      setOrder(orderData);
      if (orderData?.status === "paid") {
        const tracking = await getOrderTracking(accessToken, orderData.id);
        setOrderTracking(tracking);
      }
    } else {
      setOrderTracking(null);
    }

    router.replace(`/messagerie?threadId=${activeThread.id}`);
  }, [activeThread, user]);

  const updateMessages = useCallback(
    async (threadId) => {
      const messagesResponse = await getMessages(accessToken, threadId);
      setMessages(messagesResponse);
    },
    [accessToken]
  );

  const getRecipient = useCallback(
    async (userId) => {
      if (userId) {
        const userResponse = await getUser(accessToken, userId);
        setRecipient(userResponse);
      }
    },
    [accessToken]
  );

  const handleGetOrderTracking = useCallback(
    async (order) => {
      if (order?.status === "paid") {
        const tracking = await getOrderTracking(accessToken, order.id);
        setOrderTracking(tracking);
      }
    },
    [accessToken]
  );

  const handleGetProduct = useCallback(async (productId) => {
    const product = await getProducts(productId);
    setProduct(product);
    return product;
  }, []);

  const handleGetProductsFromOrder = useCallback(async (order) => {
    const fetchedProducts = await Promise.all(
      order.items.map((item) => getProducts(item.productId))
    );
    setProducts(fetchedProducts);
  }, []);

  const handleIsSeenThread = useCallback(
    async (threadId, messageId) => {
      await fetchHorseted(
        `/threads/${threadId}/messages/${messageId}`,
        accessToken,
        "PATCH",
        { seen: true },
        true
      );
      handleUnseenMessagesNb();
      await handleGetThreads();
    },
    [accessToken]
  );

  return (
    <ThreadsContext.Provider
      value={{
        threads,
        activeThread,
        setActiveThread,
        messages,
        product,
        setProduct,
        order,
        orderTracking,
        getMessages,
        setMessages,
        isLoading,
        isNewMessageSearch,
        setIsNewMessageSearch,
        user,
        recipient,
        setRecipient,
        accessToken,
        isInfo,
        setIsInfo,
        updateMessages,
        products,
        setProducts,
        setOrder,
        handleGetProduct,
        initThreads,
        handleGetThreads,
        handleGetOrderTracking,
        handleIsSeenThread,
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsContext = () => useContext(ThreadsContext);
