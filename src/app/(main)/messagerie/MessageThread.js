export default function MessageThread({ product, messages, userId }) {
  const reversedMessages = [...messages].reverse();
  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-pale-grey">
        <h2 className="text-xl font-mcqueen font-bold">{product.title}</h2>
        <button>
          <img src="/icons/thread-info.svg" alt="" />
        </button>
      </div>
      <div className="p-10 flex flex-col gap-y-4 max-h-[500px] overflow-y-scroll">
        {reversedMessages.map((message) => {
          const { id, content, senderId } = message;
          const isFromUser = userId === senderId;
          return (
            <div
              className={`border border-pale-grey rounded-md p-6 max-w-[500px] flex flex-1 ${
                isFromUser ? "self-end" : "align-self-start"
              }`}
            >
              <p key={id}>{content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
