export default function Spinner({ isFullScreen, className }) {
  return (
    <div
      className={`flex items-center justify-center ${isFullScreen && "h-[calc(100vh_-_var(--header-height)-120px)]"} ${className}`}
    >
      <div className="w-8 h-8 border-4 border-dark-green border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
}
