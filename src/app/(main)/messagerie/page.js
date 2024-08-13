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

function ThreadsPage() {
  const searchParams = useSearchParams();
  const { user, accessToken } = useAuthContext();
  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    if (activeThreadId !== null) {
      getMessages(activeThreadId);
    }
  }, [activeThreadId]);

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
  }, [searchParams, threads]);

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

  async function handleSubmit(e) {
    e.preventDefault();
    const message = e.target.content.value;
    if (activeThreadId === null) {
      console.log("creating new thread");
      await postThread(message);
      await getThreads();
    } else {
      await postMessage(message);
      getMessages(activeThreadId);
    }
  }

  async function getThreads() {
    const threads = await fetchHorseted("/threads", accessToken);
    setThreads(threads);
  }

  async function getMessages(id) {
    const messages = await fetchHorseted(
      `/threads/${id}/messages`,
      accessToken
    );
    setMessages(messages);
  }

  async function getProduct(productId) {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
  }

  async function postMessage(message) {
    const body = {
      content: message,
    };
    await fetchHorseted(
      `/threads/${activeThreadId}/messages`,
      accessToken,
      "POST",
      body,
      true
    );
  }

  async function postThread(message) {
    const body = {
      userId: user.id,
      productId: product.id,
      content: message,
      // medias: [0],
    };
    const newThread = await fetchHorseted(
      `/threads`,
      accessToken,
      "POST",
      body,
      true
    );
    setActiveThreadId(newThread.id);
  }

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Mon compte", href: "/account" },
    { label: "Messagerie" },
  ];

  return (
    <div className="container mx-auto pb-10">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="border border-darker-grey rounded-3xl overflow-hidden mt-10 flex h-[580px]">
        <div className="w-1/3 border-e border-darker-grey flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-pale-grey">
            <h1 className="flex-1 flex justify-center text-xl font-mcqueen font-bold">
              Messages
            </h1>
            <button onClick={() => setIsNewMessageSearch(!isNewMessageSearch)}>
              <img src="/icons/new-message.svg" alt="Nouveau message" />
            </button>
          </div>
          {threads.length !== 0 ? (
            <ThreadList
              threads={threads}
              handleThreadClick={handleThreadClick}
              activeThreadId={activeThreadId}
            />
          ) : (
            <p>Pas de convesations</p>
          )}
        </div>
        <div className="w-2/3 bg-white flex flex-col">
          {isNewMessageSearch ? (
            <NewMessageSearch />
          ) : (
            <MessageThread
              product={product}
              messages={messages}
              userId={user.id}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(ThreadsPage);
