"use client"
import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useFetchAnime } from "@/queries/jikan/animefetch"
import { AnimeData } from "@/types/anime/animeTypes"
import Card from "../common/Card"
import { tvStatuses } from "../common/ListContent"
import { LoadingCard } from "../LoadingCard"
import { ErrorImage } from "../ErrorImage"

export function ListOfAnimes() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentParams = Object.fromEntries(searchParams.entries())

  const { data, isLoading, isError } = useFetchAnime(currentParams)

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
  if (isError) return <ErrorImage error={isError} />
  return (
    <div className="pb-20">
      {isLoading && (
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-4">
          {Array.from({ length: 16 }, (_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}
      {data && data.data && (
        <>
          <div className="grid grid-cols-2 gap-3 p-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data.data.map((anime: AnimeData) => (
              <Card
                key={anime.mal_id}
                id={anime.mal_id}
                name={anime.title_english || anime.title}
                coverImage={anime.images.webp.image_url}
                tag={anime.type}
                voteAverage={anime.score}
                voteCount={anime.scored_by}
                genre={anime.genres.map((genres) => genres.name)}
                numbers={anime.rank}
                mediaType="anime"
                status={tvStatuses}
                episodes={anime.episodes}
                showStatus={anime.status}
              />
            ))}
          </div>
          <div className="flex justify-between px-2 md:p-6">
            <button
              onClick={() => handleNavigation(parseInt(page) - 1)}
              disabled={page === "1"}
              className="flex h-[40px] w-[200px] cursor-pointer items-center justify-center rounded-md bg-blue-600 font-bold text-white"
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
