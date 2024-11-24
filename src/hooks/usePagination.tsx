import { useMemo } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const usePagination = ({
  currentPage,
  totalPages,
}: PaginationProps): number[] => {
  const buttons = useMemo(() => {
    const result: number[] = []
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - (currentPage - 1)))
    }

    if (currentPage + 2 > totalPages) {
      startPage = Math.max(1, startPage - (2 - (totalPages - currentPage)))
    }

    for (let page = startPage; page <= endPage; page++) {
      result.push(page)
    }

    return result
  }, [currentPage, totalPages]) // Recalculate only if currentPage or totalPages changes

  return buttons
}

export default usePagination
