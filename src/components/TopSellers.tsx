import useAuthors from "../hooks/useFetchAuthors"

const TopSellers = () => {
  const { authors, setAuthors } = useAuthors()

  const handleFollowAuthor = (index: number) => {
    setAuthors((prevAuthor) =>
      prevAuthor.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    )
  }

  return (
    <div className='bg-white p-5 mr-5 mt-[5rem] border w-[23rem] rounded'>
      <h2 className='text-xl font-bold mb-5'>Top Sellers</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index} className='flex items-center justify-between mb-4'>
            <section className='flex justify-center items-center'>
              <img
                src={author.image}
                alt={author.name}
                className='w-[25%] h-[25%] justify-center items-center rounded-full'
              />
              <span className='ml-4'>{author.name}</span>
            </section>
            <button
              onClick={() => handleFollowAuthor(index)}
              type='button'
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopSellers
