import { useState, useEffect } from "react"
import axios from "axios"
import { FetchResponse } from "../utils/ProductTypes"

const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<FetchResponse>(
          "https://dummyjson.com/products"
        )

        // Check if `products` exists
        if (!response.data.products) {
          throw new Error("`products` property is missing in the API response.")
        }

        const uniqueCategories = Array.from(
          new Set(response.data.products.map((product) => product.category))
        )
        setCategories(uniqueCategories)
      } catch (error: any) {
        console.error("Error fetching categories:", error.message || error)
      }
    }

    fetchCategories()
  }, [])

  return [categories] as const
}

export default useFetchCategories
