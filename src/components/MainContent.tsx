import { Tally3 } from "lucide-react"
import { useState } from "react"
import useProduct from "../hooks/useFetchProduct"
import usePagination from "../hooks/usePagination"
import useGetFilteredProduct from "../hooks/useGetFilteredProduct"
import Card from "./Card"

const MainContent = () => {
  const { currentPage, setCurrentPage, itemsPerPage } = useProduct()
  const [filter, setFilter] = useState("all")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const filteredProducts = useGetFilteredProduct(filter)

  const totalProducts = 100
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const paginationRange = usePagination({ currentPage, totalPages })

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
      <div className='mb-5'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='relative mb-5 mt-5'>
            <button
              className='border px-4 py-2 rounded-full flex items-center'
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 className='mr-2' />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>

            {dropdownOpen && (
              <div className='absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40'>
                <button
                  onClick={() => setFilter("cheap")}
                  className='block px-4 py-2 w-full text-left hover:bg-gray-200'
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className='block px-4 py-2 w-full text-left hover:bg-gray-200'
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className='block px-4 py-2 w-full text-left hover:bg-gray-200'
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center mt-5'>
          <button
            className='border px-4 py-2 mx-2 rounded-full'
            type='button'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className='flex flex-wrap justify-center'>
            {/* Pagination button */}
            {paginationRange.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 mx-1 rounded-full ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className='border px-4 py-2 mx-2 rounded-full'
            type='button'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default MainContent
