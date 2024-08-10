export default function MessageBlock({ message }) {
  const { id, content, senderId } = message;
  const isFromUser = userId === senderId;
  return (
    <div
      key={id}
      className={`border border-pale-grey rounded-md p-6 max-w-[500px] flex flex-1 ${
        isFromUser ? "self-end" : "align-self-start"
      }`}
    >
      <p key={id}>{content}</p>
    </div>
  );
}
