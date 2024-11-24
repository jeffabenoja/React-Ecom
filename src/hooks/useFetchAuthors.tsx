import { useEffect, useState } from "react"

interface Author {
  name: string
  isFollowing: boolean
  image: string
}
const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=12")

        const data = await response.json()

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }))

        setAuthors(authorsData)
      } catch (error) {
        console.error("Error fetching authors: ", error)
      }
    }

    fetchData()
  }, [])
  return { authors, setAuthors }
}

export default useAuthors
