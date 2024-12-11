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
import { useRouter, usePathname } from "next/navigation";

const ThreadsContext = createContext();

export const ThreadsProvider = ({ children, orderId, productIdParam }) => {
  const router = useRouter();
  const pathname = usePathname();

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
  const [isLoading, setisLoading] = useState(false);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [isInfo, setIsInfo] = useState(false);

  // useEffect to fetch threads initially
  useEffect(() => {
    initThreads(orderId, productIdParam);
  }, [orderId, productIdParam]);

  // Effect to handle thread change and get recipient, messages, and order info
  useEffect(() => {
    if (!activeThread) return;

    updateMessages(activeThread.id);
    const recipientId = activeThread.authors.find(
      (author) => author.id !== user.id
    )?.id;
    getRecipient(recipientId);
    handleThreadOrderInfo();

    handleIsSeenThread(activeThread.id, activeThread.lastMessage.id);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(
      activeThread.orderId ? "orderId" : "productId",
      activeThread.orderId || activeThread.productId
    );

    router.replace(newUrl.toString());
  }, [activeThread]);

  // Effect to handle fetching products from the order
  useEffect(() => {
    if (order) {
      handleGetProductsFromOrder(order);
    }
  }, [order]);

  // Helper Functions
  const handleGetThreads = useCallback(async () => {
    const threads = await getThreads(accessToken);
    setThreads(threads);
    return threads;
  }, [accessToken]);

  const handleThreadOrderInfo = useCallback(async () => {
    if (activeThread?.orderId) {
      const orderResponse = await getOrder(accessToken, activeThread.orderId);
      setOrder(orderResponse);
      await handleGetOrderTracking(orderResponse);
    } else {
      setOrderTracking(null);
    }
  }, [accessToken, activeThread]);

  const findIfThreadAlreadyExists = (productIdParam, threadsResponse) => {
    const threadAlreadyExists = threadsResponse.find(
      (thread) => thread.productId === productIdParam
    );
    if (threadAlreadyExists) {
      setActiveThread(threadAlreadyExists);
    } else {
      initNewThread(productIdParam);
    }
  };

  const initNewThread = useCallback(
    async (productIdParam) => {
      setActiveThread(null);
      setMessages([]);
      const product = await handleGetProduct(productIdParam);
      await getRecipient(product.userId);
    },
    [accessToken]
  );

  const initThreads = useCallback(
    async (orderId, productIdParam) => {
      const treadsResponse = await handleGetThreads();
      if (treadsResponse.length > 0) {
        const threadsNotDeletedByUser = treadsResponse.filter((thread) =>
          thread.authors.some(
            (author) => author.id === user.id && !author.deleted
          )
        );
        setThreads(threadsNotDeletedByUser);
        if (threadsNotDeletedByUser.length === 0) return;
        let activeThread;
        if (orderId) {
          activeThread = threadsNotDeletedByUser.find(
            (thread) => thread.orderId === orderId
          );
        }
        if (productIdParam) {
          return findIfThreadAlreadyExists(productIdParam, treadsResponse);
        } else {
          activeThread = threadsNotDeletedByUser[0];
        }

        setActiveThread(activeThread);
        setRecipient(activeThread.authors[0]);
        await updateMessages(activeThread.id);
        if (activeThread.productId) {
          handleGetProduct(activeThread.productId);
        }
        if (activeThread.orderId) {
          const orderResponse = await getOrder(
            accessToken,
            activeThread.orderId
          );
          setOrder(orderResponse);
          await handleGetOrderTracking(orderResponse);
        }
      }
    },
    [threads, accessToken]
  );

  const getRecipient = useCallback(
    async (userId) => {
      if (!userId) return;
      const recipient = await getUser(accessToken, userId);
      setRecipient(recipient);
    },
    [accessToken, user]
  );

  const updateMessages = async (threadId) => {
    const messages = await getMessages(
      accessToken,
      threadId || activeThread?.id
    );
    setMessages(messages);
  };

  const handleGetOrderTracking = useCallback(
    async (order) => {
      if (order?.status === "paid") {
        const orderTracking = await getOrderTracking(accessToken, order.id);
        setOrderTracking(orderTracking);
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
    const products = await Promise.all(
      order.items.map(async (item) => await getProducts(item.productId))
    );
    setProducts(products);
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
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsContext = () => useContext(ThreadsContext);
