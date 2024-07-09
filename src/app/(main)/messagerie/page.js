"use client";

import withAuth from "@/hoc/withAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import fetchHorseted from "@/utils/fetchHorseted";

function ThreadsPage() {
  const { accessToken } = useAuthContext();
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getThreads();
  }, []);

  useEffect(() => {
    if (threads.length !== 0) {
      getMessages(threads[0].id);
      getProduct(threads[0].productId);
    }
  }, [threads]);

  function handleThreadClick(id, productId) {
    getMessages(id);
    getProduct(productId);
  }

  return (
    <div className="container mx-auto">
      <div className="flex">
        <h1>messages</h1>
        {threads.length !== 0 ? (
          <ul>
            {threads.map((thread) => {
              const { id, productId, authors } = thread;
              return (
                <li key={id}>
                  <button onClick={() => handleThreadClick(id, productId)}>
                    {authors[0].username}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No threads found</p>
        )}
        {product && messages.length !== 0 ? (
          <div>
            <h2>{product.title}</h2>
            {messages.map((message) => {
              const { id, content, createdAt } = message;
              return (
                <p key={id}>
                  {content} {createdAt}
                </p>
              );
            })}
          </div>
        ) : (
          <p>Pas de messages</p>
        )}
      </div>
    </div>
  );

  async function getThreads() {
    const threads = await fetchHorseted("/threads", accessToken);
    setThreads(threads);
    // console.log(threads);
  }

  async function getMessages(id) {
    const messages = await fetchHorseted(
      `/threads/${id}/messages`,
      accessToken
    );
    setMessages(messages);
    console.log("messages =>", messages);
  }

  async function getProduct(productId) {
    const product = await fetchHorseted(`/products/${productId}`);
    setProduct(product);
    console.log("product =>", product);
  }
}

export default withAuth(ThreadsPage);
