export interface Product {
  category: string
}
export interface FetchResponse {
  products: Product[]
}

export interface CardProps {
  id: string
  title: string
  image: string
  price: number
}

export interface FilteredProductProps {
  products: any[]
  searchQuery: string
  selectedCategory: string | null
  minPrice: number | undefined
  maxPrice: number | undefined
  filter: string
}
