import { useMemo } from "react"
import { useFilter } from "../context/FilterContext"
import useProduct from "./useFetchProduct"

const useGetFilteredProduct = (filter: string) => {
  const { searchQuery, selectedCategory, minPrice, maxPrice } = useFilter()
  const { products } = useProduct()

  // Use useMemo to recalculate filtered products only when dependencies change
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      )
    }

    // Filter by minimum price
    if (minPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= minPrice)
    }

    // Filter by maximum price
    if (maxPrice !== undefined) {
      filtered = filtered.filter((product) => product.price <= maxPrice)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort based on the filter value
    switch (filter) {
      case "expensive":
        return filtered.sort((a, b) => b.price - a.price)
      case "cheap":
        return filtered.sort((a, b) => a.price - b.price)
      case "popular":
        return filtered.sort((a, b) => b.rating - a.rating)
      default:
        return filtered
    }
  }, [products, selectedCategory, minPrice, maxPrice, searchQuery, filter]) // Dependencies

  return filteredProducts
}

export default useGetFilteredProduct
