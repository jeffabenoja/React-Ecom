import axios from "axios"
import { useEffect, useState } from "react"
import { useFilter } from "../context/FilterContext"

const useProduct = () => {
  const { keyword } = useFilter()
  const [products, setProducts] = useState<any[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`

      if (keyword) {
        url = `https://dummyjson.com/products/search?q=${keyword}`
      }

      try {
        const response = await axios.get(url)
        setProducts(response.data.products)
        setTotalProducts(response.data.total || 100)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [currentPage, keyword])

  return {
    products,
    totalProducts,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  }
}

export default useProduct
