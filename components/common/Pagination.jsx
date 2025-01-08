"use client";

import { useState } from "react";

const Pagination = ({ data = 100 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data / itemsPerPage);

  //   const currentData = data.slice(
  //     (currentPage - 1) * itemsPerPage,
  //     currentPage * itemsPerPage
  //   );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="flex flex-wrap mt-6 bg-background">
      <button
        className="px-4 border hover:bg-gray-100"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`size-10 border shrink-0 hover:bg-gray-100 ${
            currentPage === index + 1 ? "bg-primary/[0.2]" : ""
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="border px-4 hover:bg-gray-100"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
