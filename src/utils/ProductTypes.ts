export interface Product {
  category: string
}
export interface FetchResponse {
  products: Product[]
}

export interface CardProps {
  id: string,
  title: string,
  image: string,
  price: number
}