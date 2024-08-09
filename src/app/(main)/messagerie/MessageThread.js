export default function MessageThread({ product, messages }) {
  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-pale-grey">
        <h2 className="text-xl font-mcqueen font-bold">{product.title}</h2>
      </div>
      <div>
        {messages.map((message) => {
          const { id, content, createdAt } = message;
          return (
            <p key={id}>
              {content} {createdAt}
            </p>
          );
        })}
      </div>
    </>
  );
}
