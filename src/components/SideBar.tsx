import { useState } from "react"
import useFetchCategories from "../hooks/useFetchCategories"
import { useFilter } from "../context/FilterContext"

const SideBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter()
  const [categories] = useFetchCategories()
  const [keywords] = useState<string[]>([
    "Apple",
    "Watch",
    "Fashion",
    "Trend",
    "Shoes",
    "Shirt",
  ])

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPrice(value ? parseFloat(value) : undefined)
  }
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value ? parseFloat(value) : undefined)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategory("")
    setMinPrice(undefined)
    setMaxPrice(undefined)
    setKeyword("")
  }

  return (
    <div className='w-64 p-5 h-screen'>
      <h1 className='text-2xl font-bold mb-10 mt-4'>React Store</h1>

      <section>
        <input
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='border-2 rounded px-2 sm:mb-3 mb-2'
        />

        <div className='flex justify-center items-center'>
          <input
            type='text'
            className='w-full border-2 mr-2 px-5 py-3 mb-3'
            placeholder='Min'
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type='text'
            className='w-full border-2 mr-2 px-5 py-3 mb-3'
            placeholder='Max'
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        <div className='mb-5'>
          <h2 className='text-xl font-semibold mb-3'>Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => (
            <label key={index} className='block mb-2'>
              <input
                type='radio'
                name='category'
                value={category}
                className='mr-2 w-[16px] h-[16px]'
                onChange={() => handleCategoryChange(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        <div className='mb-5 mt-4'>
          <h2 className='text-xl font-semibold mb-3'>Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                className='block mb-2 px-4 py-2 border-2 rounded w-full text-left hover:bg-gray-200'
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          className='w-full mb-[4rem] py-2 bg-black text-white rounded mt-5'
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </section>
    </div>
  )
}

export default SideBar
