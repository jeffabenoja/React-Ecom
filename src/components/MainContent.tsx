import { Tally3 } from "lucide-react"
import { useFilter } from "../context/FilterContext"
import { useState } from "react"
import useProduct from "../hooks/useFetchProduct"
import Card from "./Card"

const MainContent = () => {
  const { products, currentPage, setCurrentPage, itemsPerPage } = useProduct()
  const { searchQuery, selectedCategory, minPrice, maxPrice } = useFilter()
  const [filter, setFilter] = useState("all")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const getFilteredProducts = () => {
    let filteredProducts = products

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      )
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      )
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      )
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price)
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price)
      case "popular":
        return filteredProducts.sort((a, b) => b.rating - a.rating)
      default:
        return filteredProducts
    }
  }

  const totalProducts = 100
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const filteredProducts = getFilteredProducts()

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const getPaginationButtons = () => {
    const buttons: number[] = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1))
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.min(1, startPage - (2 - totalPages - currentPage))
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page)
    }

    return buttons
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
            {getPaginationButtons().map((page) => (
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
