"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "@/context/AuthContext";
import fetchHorseted from "@/utils/fetchHorseted";
import { useSearchParams } from "next/navigation";

const ThreadsContext = createContext();

export const ThreadsProvider = ({ children }) => {
  const { user, accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const productIdParam = searchParams.get("productId");

  // States
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderTracking, setOrderTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [seller, setSeller] = useState(null);
  const [isInfo, setIsInfo] = useState(false);

  // console.log("threads =>", threads);

  // Effects
  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    if (activeThread === null) return;
    updateMessages();
    handleThreadOrderInfo();
  }, [activeThread]);

  useEffect(() => {
    if (productIdParam) {
      if (threads.length > 0) {
        findIfThreadAlreadyExist(productIdParam);
      } else {
        initNewThread(productIdParam);
      }
    } else {
      initWithLastThread();
    }
  }, [threads, productIdParam]);

  // Helper Functions
  const handleThreadOrderInfo = async () => {
    if (activeThread?.orderId) {
      await getOrder(activeThread.orderId);
      await getOrderTracking(activeThread.orderId);
    } else {
      setOrderTracking(null);
    }
  };

  const findIfThreadAlreadyExist = (productIdParam) => {
    const threadAlreadyExist = threads.find((thread) =>
      String(thread.productId).includes(productIdParam)
    );
    if (threadAlreadyExist) {
      setActiveThread(threadAlreadyExist);
    } else {
      initNewThread(productIdParam);
    }
  };

  const initNewThread = async (productIdParam) => {
    setActiveThread(null);
    setMessages([]);
    const product = await getProduct(productIdParam);
    setRecipient({ id: product.userId });
  };

  const initWithLastThread = () => {
    if (threads.length > 0) {
      setActiveThread(threads[0]);
      getMessages(threads[0].id);
      setRecipient(threads[0].authors[0]);
      if (threads[0].productId) {
        getProduct(threads[0].productId);
      }
      if (threads[0].orderId) {
        getOrder(threads[0].orderId);
        getOrderTracking(threads[0].orderId);
      }
    }
  };

  // API Calls
  const getThreads = async () => {
    setLoading(true);
    const threads = await fetchHorseted("/threads", accessToken);
    setThreads(threads);
    setLoading(false);
  };

  const getMessages = async (id) => {
    const messages = await fetchHorseted(
      `/threads/${id}/messages`,
      accessToken
    );
    setMessages(messages);
  };

  const updateMessages = async () => {
    await getMessages(activeThread.id);
  };

  const getOrder = async (orderId) => {
    const order = await fetchHorseted(`/orders/${orderId}`, accessToken, "GET");
    setOrder(order);
  };

  const getOrderTracking = async (orderId) => {
    const order = await fetchHorseted(
      `/orders/${orderId}/tracking`,
      accessToken,
      "GET"
    );
    setOrderTracking(order);
  };

  const getProduct = async (productId) => {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
    return product;
  };

  const onDeleteThread = async () => {
    await fetchHorseted(`/threads/${activeThread?.id}`, accessToken, "DELETE");
    await getThreads();
    setIsInfo(false);
  };

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
        getThreads,
        getMessages,
        setMessages,
        loading,
        getProduct,
        onDeleteThread,
        isNewMessageSearch,
        setIsNewMessageSearch,
        user,
        seller,
        setSeller,
        recipient,
        setRecipient,
        accessToken,
        isInfo,
        setIsInfo,
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsContext = () => useContext(ThreadsContext);
