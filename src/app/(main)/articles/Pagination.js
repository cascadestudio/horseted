import { useEffect, useState } from "react";

export default function Pagination({ products, setFromId }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  console.log("currentPageIndex", currentPageIndex);
  const [pages, setPages] = useState([
    {
      firstProductId: products.items[0].id,
      lastProductId: products.items[products.items.length - 1].id,
    },
  ]);
  console.log("pages", pages);

  useEffect(() => {
    if (!pages[currentPageIndex]) {
      setPages((prev) => [
        ...prev,
        {
          firstProductId: products.items[0].id,
          lastProductId: products.items[products.items.length - 1].id,
        },
      ]);
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

  const isNextButton = products.total > pages.length * 50;

  return (
    <nav className="py-10">
      <ul className=" flex gap-x-4  justify-center ">
        {pages.length > 0 &&
          pages.map((page, index) => {
            return (
              <>
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`px-4 py-2 border rounded ${
                    index === currentPageIndex ? "bg-gray-200" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </>
            );
          })}
        {isNextButton && (
          <button
            onClick={() => handleClick(pages.length)}
            className={`px-4 py-2 border rounded`}
          >
            {pages.length + 1}
          </button>
        )}
      </ul>
    </nav>
  );
}
