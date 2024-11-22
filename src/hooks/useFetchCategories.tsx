import { useState, useEffect } from "react"
import { FetchResponse } from "../types/Product"

const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data: FetchResponse = await response.json()

        // Check if `products` exists
        if (!data.products) {
          throw new Error("`products` property is missing in the API response.")
        }

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        )
        setCategories(uniqueCategories)
      } catch (error: any) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  return [categories] as const
}

export default useFetchCategories
