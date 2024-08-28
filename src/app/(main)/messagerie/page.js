"use client";

import { useSearchParams } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Breadcrumbs from "@/components/Breadcrumbs";
import Spinner from "@/components/Spinner";
// Local Components
import MessageThread from "./MessageThread";
import ThreadList from "./ThreadList";
import NewMessageSearch from "./NewMessageSearch";
import NewMessageForm from "./NewMessageForm";
import MessageHeader from "./MessageHeader";
import ThreadInfo from "./ThreadInfo";

function ThreadsPage() {
  const { user, accessToken } = useAuthContext();
  const searchParams = useSearchParams();
  const productIdParam = searchParams.get("productId");

  const [threads, setThreads] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);
  const [isNewMessageSearch, setIsNewMessageSearch] = useState(false);
  // const [newMessageSeller, setNewMessageSeller] = useState(null);
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [seller, setSeller] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInfo, setIsInfo] = useState(false);

  console.log("messages =>", messages);

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    if (activeThreadId === null) return;
    getMessages(activeThreadId);
    handleThreadOrderInfo();
  }, [activeThreadId]);

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

  const handleThreadOrderInfo = () => {
    const activeThread = threads.find((thread) => thread.id === activeThreadId);
    if (activeThread && activeThread.orderId !== null) {
      getOrder(activeThread.orderId);
      setOrderId(activeThread.orderId);
    } else {
      setOrder(null);
    }
  };

  const findIfThreadAlreadyExist = (productIdParam) => {
    const threadAlreadyExist = threads.find((thread) =>
      String(thread.productId).includes(productIdParam)
    );
    if (threadAlreadyExist) {
      setActiveThreadId(threadAlreadyExist.id);
    } else {
      initNewThread(productIdParam);
    }
  };

  const initNewThread = (productIdParam) => {
    setActiveThreadId(null);
    setMessages([]);
    getProduct(productIdParam);
  };

  const initWithLastThread = () => {
    if (threads.length > 0) {
      setActiveThreadId(threads[0].id);
      getMessages(threads[0].id);
      setRecipient(threads[0].authors[0]);
      if (threads[0].productId) {
        getProduct(threads[0].productId);
      }
    }
  };

  function handleThreadClick(id, productId) {
    setActiveThreadId(id);
    getMessages(id);
    if (productId) {
      getProduct(productId);
    }
  }

  const handleNewMessageSearchClick = () => {
    setIsNewMessageSearch(!isNewMessageSearch);
    setActiveThreadId(null);
  };

  const handleNewMessageClick = (user) => {
    // setNewMessageSeller(user);
    setSeller(user);
    setIsNewMessageSearch(false);
    setMessages([]);
    setProduct(null);
  };

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Mon compte", href: "/mon-compte" },
    { label: "Messagerie" },
  ];

  async function getOrder(orderId) {
    const order = await fetchHorseted(
      `/orders/${orderId}/tracking`,
      accessToken,
      "GET",
      null,
      false,
      false
    );
    setOrder(order);
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

  async function onDeleteThread() {
    await fetchHorseted(
      `/threads/${activeThreadId}`,
      accessToken,
      "DELETE",
      null,
      false,
      true
    );
    await getThreads();
    setIsInfo(false);
  }

  return (
    <div className="container mx-auto pb-10">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="border border-darker-grey rounded-3xl overflow-hidden mt-10 flex flex-col sm:flex-row h-screen sm:h-[580px]">
        <div className="max-h-[calc(50vh-120px)] sm:max-h-none sm:w-1/3 sm:border-e border-darker-grey flex flex-col">
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
        <div className="h-full max-h-[520px] sm:max-h-none sm:w-2/3 bg-white flex flex-col flex-1">
          {isNewMessageSearch ? (
            <NewMessageSearch
              threads={threads}
              handleClick={handleNewMessageClick}
            />
          ) : (
            <>
              <MessageHeader
                product={product}
                seller={seller}
                setIsInfo={setIsInfo}
                isInfo={isInfo}
              />
              {isInfo && seller && product ? (
                <ThreadInfo
                  seller={seller}
                  product={product}
                  orderId={orderId}
                  order={order}
                  activeThreadId={activeThreadId}
                  onDeleteThread={onDeleteThread}
                />
              ) : (
                <>
                  <MessageThread
                    product={product}
                    messages={messages}
                    // newMessageSeller={newMessageSeller}
                    userId={user.id}
                    order={order}
                    seller={seller}
                    setSeller={setSeller}
                    accessToken={accessToken}
                    recipient={recipient}
                  />
                  <NewMessageForm
                    getThreads={getThreads}
                    activeThreadId={activeThreadId}
                    setActiveThreadId={setActiveThreadId}
                    getMessages={getMessages}
                    sellerId={seller?.id}
                    productId={product?.id}
                    accessToken={accessToken}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(ThreadsPage);
