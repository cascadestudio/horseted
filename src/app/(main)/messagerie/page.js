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
  console.log("user id =>", user.id);
  console.log("productId =>", productId);

  // TODO start new threads from recipientId and product Id

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    const productIdParam = searchParams.get("productId");
    if (productIdParam) {
      // getProduct(productIdParam)
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
    const formData = new FormData(e.target);
    // for (let [key, value] of formData.entries()) {
    //   console.log(`formData => ${key}: ${value}`);
    // }
    await postMessage(formData);
    getMessages(threadId);
  }

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: "Mon compte", href: "/account" },
    { label: "Messagerie" },
  ];

  return (
    <div className="container mx-auto">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="border border-darker-grey rounded-3xl my-10 overflow-hidden">
        <div className="flex">
          <div className="w-1/3">
            <div className="flex justify-between items-center p-6">
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
              <p>Pas de messages</p>
            )}
          </div>
          <div className="w-2/3 bg-white">
            {product && messages.length !== 0 ? (
              <MessageThread product={product} messages={messages} />
            ) : (
              <p>Pas de messages</p>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 p-4 border border-gray-300 rounded-md"
            >
              <textarea
                id="content"
                name="content"
                className="p-2 border border-gray-300 rounded-md"
                rows="4"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  async function getThreads() {
    const threads = await fetchHorseted("/threads", accessToken);
    console.log("threads =>", threads);
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

  async function postMessage(formData) {
    const response = await fetchHorseted(
      `/threads/${threadId}/messages`,
      accessToken,
      "POST",
      formData
    );
    console.log("postMessageresponse =>", response);
  }
}

export default withAuth(ThreadsPage);
