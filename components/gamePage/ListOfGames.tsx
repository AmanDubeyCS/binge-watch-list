import React from "react"
import { GameCard } from "./GameCard"
import { useRouter, useSearchParams } from "next/navigation"
import { useFetchGames } from "@/queries/RAWG/gameFetch"
import { Game } from "@/app/games/page"

export function ListOfGames() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentParams = Object.fromEntries(searchParams.entries())
  const page = (currentParams.page || 1).toString()

  const { data, isLoading } = useFetchGames()

  const totalPages = Math.ceil(data?.count / 20)
  const currentPage = parseInt(page) || 1

  const handleNavigation = (newPage: number) => {
    const updatedParams = { ...currentParams, page: newPage.toString() }
    router.push(
      `/games/discover?${new URLSearchParams(updatedParams).toString()}`
    )
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pageNumbers = []
    const delta = 2
    let startPage = Math.max(1, currentPage - delta)
    let endPage = Math.min(totalPages, currentPage + delta)

    pageNumbers.push(1)
    if (startPage > 2) pageNumbers.push("...")
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1) {
        pageNumbers.push(i)
      }
    }
    if (endPage < totalPages - 1) pageNumbers.push("...")
    if (endPage < totalPages) pageNumbers.push(totalPages)

    return pageNumbers
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="-z-10">
      {data && data.results && (
        <div className="grid gap-3 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.results.map((game: Game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.name}
              image={game.background_image}
              rating={game.rating * 2}
              platforms={game.parent_platforms}
              release={game.released}
              genres={game.genres}
              tags={game.tags}
              grade={game.ratings}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between p-6">
        <button
          onClick={() => handleNavigation(parseInt(page) - 1)}
          disabled={!data?.previous}
          className="flex h-[40px] w-[200px] items-center justify-center rounded-md bg-blue-600 font-bold text-white"
        >
          Previous
        </button>
        <div className="flex items-center justify-center space-x-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`rounded px-3 py-1 ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : page === "..."
                    ? "bg-transparent text-gray-500"
                    : "bg-gray-200"
              }`}
              onClick={() => {
                if (page !== "...") {
                  handleNavigation(page as number)
                }
              }}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleNavigation(parseInt(page) + 1)}
          disabled={!data?.next}
          className="flex h-[40px] w-[200px] items-center justify-center rounded-md bg-blue-600 font-bold text-white"
        >
          Next
        </button>
      </div>
    </div>
  )
}
