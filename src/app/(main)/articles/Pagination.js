import { useEffect, useState } from "react";

export default function Pagination({ products, setFromId, activeBrands }) {
  console.log("products total", products.total);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  console.log("currentPageIndex", currentPageIndex);
  const [pages, setPages] = useState(() => {
    if (products.items && products.items.length > 0) {
      return [
        {
          firstProductId: products.items[0].id,
          lastProductId: products.items[products.items.length - 1].id,
        },
      ];
    }
    return [];
  });
  console.log("pages", pages);

  // Test reset on activebrands
  useEffect(() => {
    if (activeBrands.length > 0) {
      setPages([
        {
          firstProductId: products.items[0].id,
          lastProductId: products.items[products.items.length - 1].id,
        },
        setCurrentPageIndex(0),
      ]);
    }
  }, [activeBrands]);

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

  const isNextButton = products.total > pages.length * 50;

  if (products.total > 50)
    return (
      <nav className="py-10">
        <ul className=" flex gap-x-4  justify-center ">
          {pages.map((_, index) => {
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
