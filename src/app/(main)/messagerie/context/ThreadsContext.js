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
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderTracking, setOrderTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [isInfo, setIsInfo] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);

  // console.log("product =>", product);

  // Effects
  useEffect(() => {
    getThreads();
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
      getProducts();
    }
  }, [order]);

  // Helper Functions
  const handleThreadOrderInfo = async () => {
    if (activeThread?.orderId) {
      const order = await getOrder(activeThread.orderId);
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
    getRecipient(product.userId);
  };

  const initWithLastThread = async () => {
    if (threads.length > 0) {
      setActiveThread(threads[0]);
      setRecipient(threads[0].authors[0]);
      await getMessages(threads[0].id);
      if (threads[0].productId) {
        // console.log("productId =>", threads[0].productId);
        getProduct(threads[0].productId);
      }
      if (threads[0].orderId) {
        await getOrder(threads[0].orderId);
        await getOrderTracking(threads[0].orderId);
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

  const getRecipient = async (recipientId) => {
    setLoading(true);
    const response = await fetchHorseted(`/users/${recipientId}`);
    setRecipient(response);
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
    if (order.status === "paid") {
      const order = await fetchHorseted(
        `/orders/${orderId}/tracking`,
        accessToken,
        "GET"
      );
      setOrderTracking(order);
    }
  };

  const getProduct = async (productId) => {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
    return product;
  };

  const getProducts = async () => {
    const products = await Promise.all(
      order.items.map(
        async (item) => await fetchHorseted(`/products/${item.productId}`)
      )
    );

    const totalPrice = products.reduce(
      (sum, product) => sum + product.price,
      0
    );
    setTotalPrice(totalPrice);
    setProducts(products);
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
        recipient,
        setRecipient,
        accessToken,
        isInfo,
        setIsInfo,
        updateMessages,
        totalPrice,
        setTotalPrice,
        products,
        setProducts,
      }}
    >
      {children}
    </ThreadsContext.Provider>
  );
};

export const useThreadsContext = () => useContext(ThreadsContext);
