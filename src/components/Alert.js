import classNames from "classnames";

export default function Alert({ type, children }) {
  const textClass = classNames({
    "text-dark-green": type === "success",
    "text-red": type === "error",
    "text-yellow": type === "info",
  });

  const markClass = classNames({
    "bg-dark-green border-dark-green": type === "success",
    "bg-red border-red": type === "error",
    "bg-red border-yellow": type === "info",
  });

  return (
    <div className="fixed inset-x-0 bottom-5 flex justify-center">
      <div
        className={`bg-light-grey mx-5 px-5 py-4 rounded-[20px] absolute bottom-5  lg:bottom-20 flex gap-8 items-center ${textClass}`}
      >
        <span
          className={`border bg-opacity-10 text-xl lg:text-[36px] lg:leading-[48px] font-bold font-mcqueen text-center rounded-full aspect-square h-6 w-6 lg:h-[54px] lg:w-[54px]  flex items-center justify-center ${markClass}`}
        >
          !
        </span>
        <p className="text-center font-bold">{children}</p>
      </div>
    </div>
  );
}