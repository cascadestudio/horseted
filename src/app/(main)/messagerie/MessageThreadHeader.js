import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import CloseButtonIcon from "@/assets/icons/CloseButton";

export default function MessageThreadHeader() {
  const { product, products, recipient, isInfo, setIsInfo } =
    useThreadsContext();

  return (
    <div className="flex justify-between items-center p-6 border-b border-pale-grey">
      <h2 className="text-xl font-mcqueen font-bold capitalize">
        {products.length
          ? products.map((product) => product.title).join(", ")
          : product
            ? product.title
            : "Nouvelle discussion"}
      </h2>
      <button onClick={() => setIsInfo(!isInfo)}>
        {isInfo ? (
          <CloseButtonIcon />
        ) : recipient ? (
          <img src="/icons/thread-info.svg" alt="Thread Info" />
        ) : null}
      </button>
    </div>
  );
}
