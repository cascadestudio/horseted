"use client";

import { useSearchParams } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";
import Breadcrumbs from "@/components/Breadcrumbs";
import MessageThread from "./MessageThread";
import ThreadList from "./ThreadList";

function ThreadsPage() {
  const searchParams = useSearchParams();
  const { user, accessToken } = useAuthContext();
  const [threads, setThreads] = useState([]);
  const [threadId, setThreadId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(null);
  // console.log("user id =>", user.id);
  // console.log("productId =>", productId);

  // TODO start new threads from product Id

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    const productIdParam = searchParams.get("productId");
    if (productIdParam) {
      setProductId(productIdParam);
    }
  }, [searchParams]);

  useEffect(() => {
    if (threads.length !== 0) {
      setThreadId(threads[0].id);
      getMessages(threads[0].id);
      getProduct(threads[0].productId);
    }
  }, [threads]);

  function handleThreadClick(id, productId) {
    setThreadId(id);
    getMessages(id);
    getProduct(productId);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const message = e.target.content.value;
    await postMessage(message);
    getMessages(threadId);
  }

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Mon compte", href: "/account" },
    { label: "Messagerie" },
  ];

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
    const response = await fetchHorseted(
      `/threads/${threadId}/messages`,
      accessToken,
      "POST",
      body,
      true
    );
    console.log("postMessageresponse =>", response);
  }

  return (
    <div className="container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="border border-darker-grey rounded-3xl my-10 overflow-hidden">
        <div className="flex">
          <div className="w-1/3 border-e border-darker-grey">
            <div className="flex justify-between items-center p-6 border-b border-pale-grey">
              <h1 className="flex-1 flex justify-center text-xl font-mcqueen font-bold">
                Messages
              </h1>
              <button>
                <img src="/icons/new-message.svg" alt="Nouveau message" />
              </button>
            </div>
            {threads.length !== 0 ? (
              <ThreadList
                threads={threads}
                handleThreadClick={handleThreadClick}
              />
            ) : (
              <p>Pas de convesations</p>
            )}
          </div>
          <div className="w-2/3 bg-white">
            {product && messages.length !== 0 ? (
              <MessageThread
                product={product}
                messages={messages}
                userId={user.id}
              />
            ) : (
              <p>Pas de messages</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex gap-4 p-4 border-t border-darker-grey"
            >
              <button>
                <img src="/icons/media-message.svg" alt="" />
              </button>
              <textarea
                placeholder="Aa"
                id="content"
                name="content"
                className="flex-1 border border-pale-grey rounded-full resize-none ps-4 pt-[5px] h-[38px]"
                rows="1"
              />
              <button
                type="submit"
                className="flex bg-dark-green text-white rounded-full p-1 ps-6 font-bold items-center"
              >
                Envoyer
                <span className="ml-2 bg-white rounded-full h-7 w-7 flex items-center justify-center">
                  <img src="/icons/send-message.svg" alt="" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ThreadsPage);
