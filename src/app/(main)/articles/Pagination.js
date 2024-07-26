import { useState } from "react";

export default function Pagination({ products, setFromId }) {
  console.log("first products", products.items[0].id);

  const totalProduct = products.total;
  const itemsPerPage = 50;
  const totalPages = Math.ceil(totalProduct / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [prevPageFirstProductId, setPrevPageFirstProductId] = useState();

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(totalPages, 3);
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - 2);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handleClick = (page) => {
    const lastProductId = products.items[products.items.length - 1].id;
    setPrevPageFirstProductId(products.items[0].id);
    if (page === currentPage - 1) {
      setFromId(prevPageFirstProductId);
    }
    if (page === currentPage + 1) {
      setFromId(lastProductId);
    }

    setCurrentPage(page);
  };

  return (
    <nav className="py-10">
      <ul className=" flex gap-x-4  justify-center ">
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handleClick(page)}
              className={currentPage === page ? "text-dark-green" : ""}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
