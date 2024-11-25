"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useFetchAnime } from "@/queries/jikan/animefetch"
import Animecard from "./animeHomePage/AnimeCard"
import { AnimeData } from "@/types/anime/animeTypes"

export function ListOfAnimes() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentParams = Object.fromEntries(searchParams.entries())

  const { data } = useFetchAnime(currentParams)

  const page = (data?.pagination.current_page || 1).toString()
  const totalPages = data?.pagination.last_visible_page
  const currentPage = parseInt(page) || 1

  const handleNavigation = (newPage: number) => {
    const updatedParams = { ...currentParams, page: newPage.toString() }
    router.push(
      `/anime/discover?${new URLSearchParams(updatedParams).toString()}`
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

  return (
    <div>
      {data && data.data && (
        <>
          <div className="grid gap-3 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {data.data.map((anime: AnimeData) => (
              <Animecard
                key={anime.mal_id}
                animeID={anime.mal_id}
                title_en={anime.title_english || anime.title}
                image={anime.images.webp.image_url}
                rating={anime.score}
                genres={anime.genres}
                ranking={anime.rank}
                scoredBy={anime.scored_by}
                status={anime.status}
              />
            ))}
          </div>
          <div className="flex justify-between p-6">
            <button
              onClick={() => handleNavigation(parseInt(page) - 1)}
              disabled={page === "1"}
              className="flex h-[40px] w-[200px] cursor-pointer items-center justify-center rounded-md bg-blue-600 font-bold text-white"
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
              disabled={!data.pagination.has_next_page}
              className="flex h-[40px] w-[200px] cursor-pointer items-center justify-center rounded-md bg-blue-600 font-bold text-white"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
