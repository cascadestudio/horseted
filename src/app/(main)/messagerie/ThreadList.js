export default function ThreadList({ threads, handleThreadClick }) {
  return (
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
  );
}
