import React, { useState, useEffect } from "react";

function SearchPagination({ currentPage, totalPages, onPageSelect }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    console.log("New page!");
    setPages([]);
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      setPages((p) => [...p, i]);
    }
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center w-full gap-4 my-4 text-white text-md">
      <button
        onClick={() => onPageSelect(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <h1>&lt;</h1>
      </button>
      {pages.map((page) => (
        <div
          className={`w-8 h-8 border-[1px] border-white rounded-md flex items-center justify-center cursor-pointer ${
            page === currentPage
              ? "bg-gradient-to-r from-pink to-lightBlue"
              : "bg-regularBlue"
          }`}
          onClick={() => onPageSelect(page)}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => onPageSelect(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <h1>&gt;</h1>
      </button>
    </div>
  );
}

export default SearchPagination;
