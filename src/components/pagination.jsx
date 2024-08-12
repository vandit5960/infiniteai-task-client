import React from 'react'

const Pagination = ({totalRecords,currentPage,handlePageChange,totalPages}) => {
  return (
    <div>
        <div className="flex justify-between items-center p-4 rounded-md shadow-sm mt-4 ml-auto ">
          <div className="flex justify-end  p-4 rounded-md shadow-sm mt-4 ml-auto ">
            Total Records {totalRecords}
          </div>
          <div className="flex justify-end items-center p-4 rounded-md shadow-sm mt-4 ml-auto ">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200  "
            >
              Previous
            </button>
            <div className="text-lg ml-5 mr-5">{` ${currentPage} `}</div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 "
            >
              Next
            </button>
          </div>
        </div>
      </div>
  )
}

export default Pagination