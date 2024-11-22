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
import { useSearchParams } from "next/navigation";
import { getMessages, getThreads } from "@/fetch/threads";
import { getOrder, getOrderTracking } from "@/fetch/orders";
import { getUser } from "@/fetch/users";
import { getProducts } from "@/fetch/products";
import fetchHorseted from "@/utils/fetchHorseted";
import { useRouter, usePathname } from "next/navigation";

const ThreadsContext = createContext();

export const ThreadsProvider = ({ children, orderId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, accessToken } = useAuthContext();
  const { handleUnseenMessagesNb } = useNotificationsContext();
  const searchParams = useSearchParams();
  const productIdParam = searchParams.get("productId");

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
    initThreads(orderId);
  }, [orderId]);

  // Effect to handle thread change and get recipient, messages, and order info
  useEffect(() => {
    if (!activeThread) return;

    updateMessages();
    getRecipient(activeThread);
    handleThreadOrderInfo();
    handleIsSeenThread(activeThread.id, activeThread.lastMessage.id);
    const newUrl = `${pathname}?orderId=${encodeURIComponent(activeThread.orderId)}`;
    router.replace(newUrl);
  }, [activeThread]);

  // Effect to check for productId in the URL params and set active thread or initiate new thread
  useEffect(() => {
    if (productIdParam) {
      if (threads.length) {
        findIfThreadAlreadyExists(productIdParam);
      } else {
        initNewThread(productIdParam);
      }
    }
  }, [threads, productIdParam]);

  // Effect to handle fetching products from the order
  useEffect(() => {
    if (order) {
      handleGetProductsFromOrder(order);
    }
  }, [order]);

  // Helper Functions
  const handleGetThreads = useCallback(async () => {
    setisLoading(true);
    const threads = await getThreads(accessToken);
    setisLoading(false);
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

  const findIfThreadAlreadyExists = (productIdParam) => {
    const threadAlreadyExists = threads.find((thread) =>
      String(thread.productId).includes(productIdParam)
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
    async (orderId) => {
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
    async (activeThread) => {
      const recipientId = activeThread.authors.find(
        (author) => author.id !== user.id
      )?.id;
      if (!recipientId) return;
      setisLoading(true);
      const recipient = await getUser(accessToken, recipientId);
      setRecipient(recipient);
      setisLoading(false);
    },
    [accessToken, user]
  );

  const updateMessages = useCallback(
    async (threadId) => {
      const messages = await getMessages(
        accessToken,
        activeThread?.id || threadId
      );
      setMessages(messages);
    },
    [accessToken, activeThread]
  );

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
