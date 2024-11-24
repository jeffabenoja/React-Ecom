import { Link } from "react-router-dom"
import { CardProps } from "../utils/ProductTypes"

const Card: React.FC<CardProps> = ({ id, title, image, price }) => {
  return (
    <div className='border p-4 rounded'>
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className='w-full h-32 object-cover mb-2'
        />

        <h2 className='font-bold'>{title}</h2>
        <p>$ {price}</p>
      </Link>
    </div>
  )
}

export default Card
