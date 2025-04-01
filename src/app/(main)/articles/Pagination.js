import NextArrow from "@/assets/icons/NextArrow";
import { useEffect, useState } from "react";

export default function Pagination({ products, setFromId }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (products.items && products.items.length > 0) {
      if (!pages[currentPageIndex]) {
        setPages((prev) => [
          ...prev,
          {
            firstProductId: products.items[0].id,
            lastProductId: products.items[products.items.length - 1].id,
          },
        ]);
      }
    }
  }, [products]);

  const handleClick = (pageIndex) => {
    setCurrentPageIndex(pageIndex);
    if (pageIndex > currentPageIndex) {
      setFromId(pages[pageIndex - 1].lastProductId);
    } else {
      const firstProductIdFromPageIndex = pages[pageIndex].firstProductId;
      setFromId(firstProductIdFromPageIndex);
    }
  };

  const isNextButton = products.total > pages.length * 32;

  if (products.total > 32)
    return (
      <nav className="py-12">
        <ul className="flex gap-x-7 justify-center items-center text-xl text-medium-grey font-poppins">
          {pages.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={` ${
                  index === currentPageIndex
                    ? "bg-pale-grey border border-grey rounded-full w-14 h-14 "
                    : ""
                }`}
              >
                {index + 1}
              </button>
            );
          })}
          {isNextButton && (
            <>
              <button onClick={() => handleClick(pages.length)}>
                {pages.length + 1}
              </button>
              <span>...</span>
              <button onClick={() => handleClick(currentPageIndex + 1)}>
                <NextArrow className={"stroke-medium-grey"} />
              </button>
            </>
          )}
        </ul>
      </nav>
    );
}
