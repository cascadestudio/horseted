export default function SearchBar({ className }) {
  return (
    <input
      className={
        className +
        " grow border border-black rounded-full h-11 w-full lg:w-auto"
      }
      type="text"
    />
  );
}
