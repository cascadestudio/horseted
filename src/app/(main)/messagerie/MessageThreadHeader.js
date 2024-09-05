import { useThreadsContext } from "@/app/(main)/messagerie/context/ThreadsContext";
import CloseButtonIcon from "@/assets/icons/CloseButton";

export default function MessageThreadHeader() {
  const { products, recipient, isInfo, setIsInfo } = useThreadsContext();

  // console.log("products =>", products);

  return (
    <div className="flex justify-between items-center p-6 border-b border-pale-grey">
      {products ? (
        <h2 className="text-xl font-mcqueen font-bold capitalize">
          {products.map((product) => product.title).join(", ")}
        </h2>
      ) : recipient ? (
        <h2>Nouvelle discussion</h2>
      ) : null}
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
