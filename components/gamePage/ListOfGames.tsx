import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useFetchGames } from "@/queries/RAWG/gameFetch"
import { Game } from "@/app/games/page"
import Card from "../common/Card"
import { gameStatuses } from "../common/ListContent"

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
  if (!data) {
    return <div>no data</div>
  }

  return (
    <div className="-z-10 pb-20">
      {data && data.results && (
        <div className="grid grid-cols-2 gap-3 p-2 sm:grid-cols-3 md:p-6 2xl:grid-cols-4">
          {data.results.map((game: Game) => (
            <Card
              key={game.id}
              id={game.id}
              name={game.name}
              coverImage={game.background_image}
              tag={game.released}
              voteAverage={game.rating * 2}
              voteCount={game.ratings_count}
              genre={game.genres.map((g: { name: string }) => g.name)}
              numbers={10}
              platforms={game.parent_platforms}
              mediaType="game"
              status={gameStatuses}
            />
          ))}
        </div>
      )}
      <div className="flex justify-between px-2 md:p-6">
        <button
          onClick={() => handleNavigation(parseInt(page) - 1)}
          disabled={!data?.previous}
          className="flex h-[40px] w-[200px] items-center justify-center rounded-md bg-blue-600 font-bold text-white"
        >
          Previous
        </button>
        <div className="hidden items-center justify-center space-x-2 md:flex">
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
