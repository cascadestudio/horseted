"use client";

import { useSearchParams } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Breadcrumbs from "@/components/Breadcrumbs";
import MessageThread from "./MessageThread";
import ThreadList from "./ThreadList";
import NewMessageSearch from "./NewMessageSearch";
import Spinner from "@/components/Spinner";

function ThreadsPage() {
  const searchParams = useSearchParams();
  const { user, accessToken } = useAuthContext();
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  const [newMessageSeller, setNewMessageSeller] = useState(null);
  const [order, setOrder] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    if (activeThreadId !== null) {
      getMessages(activeThreadId);
      const activeThread = threads.find(
        (thread) => thread.id === activeThreadId
      );

      if (activeThread && activeThread.orderId !== null) {
        getOrder(activeThread.orderId);
      } else {
        setOrder(null);
      }
    } else {
      initWithLastThread();
    }
  }, [activeThreadId, threads]);

  useEffect(() => {
    const productIdParam = searchParams.get("productId");

    if (productIdParam && threads.length > 0) {
      const thread = threads.find((thread) =>
        String(thread.productId).includes(productIdParam)
      );

      if (thread) {
        setActiveThreadId(thread.id);
      }
      getProduct(productIdParam);
    } else {
      initWithLastThread();
    }
  }, [searchParams]);

  const initWithLastThread = () => {
    if (threads.length !== 0) {
      setActiveThreadId(threads[0].id);
      getMessages(threads[0].id);
      getProduct(threads[0].productId);
    }
  };

  function handleThreadClick(id, productId) {
    setActiveThreadId(id);
    getMessages(id);
    getProduct(productId);
  }

  const handleNewMessageSearchClick = () => {
    setIsNewMessageSearch(!isNewMessageSearch);
    setActiveThreadId(null);
  };

  const handleNewMessageClick = (user) => {
    setNewMessageSeller(user);
    setIsNewMessageSearch(false);
    setMessages([]);
    setProduct(null);
  };

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Mon compte", href: "/account" },
    { label: "Messagerie" },
  ];

  async function getOrder(orderId) {
    try {
      setLoading(true);
      const order = await fetchHorseted(
        `/orders/${orderId}/tracking`,
        accessToken
      );
      setOrder(order);
    } catch (err) {
      setError(err.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const message = e.target.content.value;
    if (activeThreadId === null) {
      await postThread(message);
      await getThreads();
    } else {
      await postMessage(message);
      getMessages(activeThreadId);
    }
  }

  async function getThreads() {
    try {
      setLoading(true);
      const threads = await fetchHorseted("/threads", accessToken);
      setThreads(threads);
    } catch (err) {
      setError(err.message || "Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  }

  async function getMessages(id) {
    try {
      setLoading(true);
      const messages = await fetchHorseted(
        `/threads/${id}/messages`,
        accessToken
      );
      setMessages(messages);
    } catch (err) {
      setError(err.message || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }

  async function getProduct(productId) {
    try {
      setLoading(true);
      const product = await fetchHorseted(`/products/${productId}`);
      setProduct(product);
    } catch (err) {
      setError(err.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  }

  async function postMessage(message) {
    const body = {
      content: message,
    };
    try {
      setLoading(true);
      await fetchHorseted(
        `/threads/${activeThreadId}/messages`,
        accessToken,
        "POST",
        body,
        true
      );
    } catch (err) {
      setError(err.message || "Failed to post message");
    } finally {
      setLoading(false);
    }
  }

  async function postThread(message) {
    const body = {
      userId: seller?.id,
      productId: product ? product.id : null,
      content: message,
    };
    try {
      setLoading(true);
      const newThread = await fetchHorseted(
        `/threads`,
        accessToken,
        "POST",
        body,
        true
      );
      setActiveThreadId(newThread.id);
    } catch (err) {
      setError(err.message || "Failed to create new thread");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto pb-10">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="border border-darker-grey rounded-3xl overflow-hidden mt-10 flex h-[580px]">
        <div className="w-1/3 border-e border-darker-grey flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-pale-grey">
            <h1 className="flex-1 flex justify-center text-xl font-mcqueen font-bold">
              Messages
            </h1>
            <button onClick={handleNewMessageSearchClick}>
              <img src="/icons/new-message.svg" alt="Nouveau message" />
            </button>
          </div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : threads.length !== 0 ? (
            <ThreadList
              threads={threads}
              handleThreadClick={handleThreadClick}
              activeThreadId={activeThreadId}
            />
          ) : (
            <p>Pas de conversations</p>
          )}
        </div>
        <div className="w-2/3 bg-white flex flex-col">
          {isNewMessageSearch ? (
            <NewMessageSearch
              threads={threads}
              handleClick={handleNewMessageClick}
            />
          ) : (
            <MessageThread
              product={product}
              messages={messages}
              userId={user.id}
              handleSubmit={handleSubmit}
              newMessageSeller={newMessageSeller}
              order={order}
              seller={seller}
              setSeller={setSeller}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(ThreadsPage);
