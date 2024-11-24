import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface Product {
  id: string
  title: string
  description: string
  price: number
  rating: number
  images: string[]
}

const useProduct = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          setProduct(res.data)
        })
        .catch((err) => {
          console.error("Error fetching product data: ", err)
        })
    }
  }, [id])

  return [product] as const
}

const Product = () => {
  const [product] = useProduct()
  const navigate = useNavigate()

  if (!product) {
    return (
      <div className='w-[60%] flex justify-center items-center'>
        <h1 className='text-2xl'>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='p-5 w-[60%]'>
      <button
        onClick={() => navigate(-1)}
        className='mb-5 px-4 py-2 bg-black text-white rounded'
      >
        Back
      </button>

      <div className='flex items-center justify-center mx-auto'>
        <img
          src={product.images[0]}
          alt={product.title}
          className='w-[50%] h-auto mb-5'
        />
      </div>

      <h1 className='text-2xl mb-4 font-bold'>{product.title}</h1>
      <p className='mb-4 text-gray-700 w-[70%]'>{product.description}</p>
      <div className='flex justify-between items-center'>
        <p>Price: ${product.price}</p>
        <p className='ml-10'>Rating: {product.rating}</p>
      </div>
    </div>
  )
}

export default Product
