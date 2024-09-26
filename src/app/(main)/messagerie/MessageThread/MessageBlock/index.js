import DisplayMedia from "@/components/DisplayMedia";
import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";

import OrderInfoMessage from "./OrderInfoMessage";

export default function MessageBlock({ message }) {
  const { products, user, totalPrice } = useThreadsContext();
  const { content, type, medias } = message;

  const isMessageFromRecipient = user.id === message.senderId;

  console.log("type =>", type);

  // switch (type) {
  //   case "newOrder":
  //     if (!products.length) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "orderDeliveredConfirmationRequired":
  //     if (!products.length) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "orderSent":
  //     if (!products.length) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "orderDelivered":
  //     if (!products.length) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "newOffer":
  //     if (!products.length || !totalPrice) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         totalPrice={totalPrice}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "offerAccepted":
  //     if (!products.length) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         totalPrice={totalPrice}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "offerDeclined":
  //     if (!products.length) break;
  //     return (
  //       <OrderInfoMessage
  //         products={products}
  //         type={type}
  //         totalPrice={totalPrice}
  //         isMessageFromRecipient={isMessageFromRecipient}
  //       />
  //     );
  //   case "message":
  //     return (
  //       <li
  //         className={`message-container ${
  //           isMessageFromRecipient ? "self-end" : "self-start"
  //         }`}
  //       >
  //         <p>{content}</p>
  //         {medias?.length > 0 && <DisplayMedia medias={medias} />}
  //       </li>
  //     );
  //   default:
  //     return null;
  // }
  if (type === "message") {
    return (
      <li
        className={`message-container ${
          isMessageFromRecipient ? "self-end" : "self-start"
        }`}
      >
        <p>{content}</p>
        {medias?.length > 0 && <DisplayMedia medias={medias} />}
      </li>
    );
  } else {
    return (
      <OrderInfoMessage
        products={products}
        type={type}
        totalPrice={totalPrice}
        isMessageFromRecipient={isMessageFromRecipient}
      />
    );
  }
}
