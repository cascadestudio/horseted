export default function MessageHeader({ product, seller, setIsInfo, isInfo }) {
  return (
    <div className="flex justify-between items-center p-6 border-b border-pale-grey">
      {product ? (
        <h2 className="text-xl font-mcqueen font-bold capitalize">
          {product.title}
        </h2>
      ) : seller ? (
        <h2>Nouvelle discussion</h2>
      ) : null}
      <button onClick={() => setIsInfo(!isInfo)}>
        {isInfo ? (
          <CloseButton />
        ) : seller ? (
          <img src="/icons/thread-info.svg" alt="Thread Info" />
        ) : null}
      </button>
    </div>
  );
}
