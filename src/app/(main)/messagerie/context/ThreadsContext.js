"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { getMessages, getThreads } from "@/fetch/threads";
import { getOrder, getOrderTracking } from "@/fetch/orders";
import { getUser } from "@/fetch/users";
import { getProducts } from "@/fetch/products";

const ThreadsContext = createContext();

export const ThreadsProvider = ({ children }) => {
  const { user, accessToken } = useAuthContext();
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
  const [loading, setLoading] = useState(false);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [isInfo, setIsInfo] = useState(false);

  // console.log("order =>", order);

  useEffect(() => {
    handleGetTreads();
  }, []);

  useEffect(() => {
    if (activeThread === null) return;
    updateMessages();
    handleThreadOrderInfo();
    const recipientId = activeThread.authors.find(
      (authors) => authors.id !== user.id
    ).id;
    getRecipient(recipientId);
  }, [activeThread]);

  useEffect(() => {
    if (productIdParam) {
      if (threads.length) {
        findIfThreadAlreadyExist(productIdParam);
      } else {
        initNewThread(productIdParam);
      }
    } else {
      initWithLastThread();
    }
  }, [threads, productIdParam]);

  useEffect(() => {
    if (order) {
      handleGetProductsFromOrder(order);
    }
  }, [order]);

  // Helper Functions
  const handleGetTreads = async () => {
    setLoading(true);
    const threads = await getThreads(accessToken);
    setThreads(threads);
    setLoading(false);
  };

  const handleThreadOrderInfo = async () => {
    if (activeThread?.orderId) {
      const orderResponse = await getOrder(accessToken, activeThread.orderId);
      setOrder(orderResponse);
      await handleGetOrderTracking(orderResponse);
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
    const product = await handleGetProduct(productIdParam);
    await getRecipient(product.userId);
  };

  const initWithLastThread = async () => {
    if (threads.length > 0) {
      setActiveThread(threads[0]);
      setRecipient(threads[0].authors[0]);
      await updateMessages(threads[0].id);
      if (threads[0].productId) {
        handleGetProduct(threads[0].productId);
      }
      if (threads[0].orderId) {
        const orderResponse = await getOrder(accessToken, threads[0].orderId);
        setOrder(orderResponse);
        await handleGetOrderTracking(orderResponse);
      }
    }
  };

  const getRecipient = async (recipientId) => {
    setLoading(true);
    const user = await getUser(accessToken, recipientId);
    setRecipient(user);
    setLoading(false);
  };

  const updateMessages = async (threadId) => {
    const messages = await getMessages(
      accessToken,
      activeThread?.id || threadId
    );
    setMessages(messages);
  };

  const handleGetOrderTracking = async (order) => {
    if (order?.status === "paid") {
      const orderTracking = await getOrderTracking(accessToken, order.id);
      setOrderTracking(orderTracking);
    }
  };

  const handleGetProduct = async (productId) => {
    const product = await getProducts(productId);
    setProduct(product);
    return product;
  };

  const handleGetProductsFromOrder = async (order) => {
    const products = await Promise.all(
      order.items.map(async (item) => await getProducts(item.productId))
    );
    setProducts(products);
  };

  return (
    <ThreadsContext.Provider
      value={{
        handleGetTreads,
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
        loading,
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
        handleGetTreads,
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsContext = () => useContext(ThreadsContext);
