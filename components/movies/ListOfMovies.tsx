"use client"
import { useFetchMedia } from "@/queries/TMDB/movies/moviesFetch"
import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TvShow } from "@/types/tv/tvListType"
import Card from "../common/Card"
import { movieStatuses, tvStatuses } from "../common/ListContent"
import { LoadingCard } from "../LoadingCard"
import { ErrorImage } from "../ErrorImage"

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const genreMap = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
  28: "Action",
  12: "Adventure",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
}

export function ListOfMovies() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const type = pathname.includes("tv") ? "tv" : "movie"

  const currentParams = Object.fromEntries(searchParams.entries())

  const { data, isLoading, isError } = useFetchMedia(type, currentParams)

  const page = (data?.page || 1).toString()
  const totalPages = data?.total_pages > 500 ? 500 : data?.total_pages
  const currentPage = parseInt(page) || 1

  const handleNavigation = (newPage: number) => {
    const updatedParams = { ...currentParams, page: newPage.toString() }
    router.push(
      `/${type === "movie" ? "movies" : "tv"}/discover?${new URLSearchParams(updatedParams).toString()}`
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
      {data && data.results && (
        <>
          <div className="grid grid-cols-2 place-items-center gap-3 p-3 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {type === "movie"
              ? data.results.map((movie: Movie) => (
                  <Card
                    key={movie.id}
                    id={movie.id}
                    name={movie.title || movie.original_title}
                    coverImage={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                    tag={movie.release_date}
                    voteAverage={movie.vote_average}
                    voteCount={movie.vote_count}
                    genre={movie.genre_ids.map(
                      (genres) => genreMap[genres as keyof typeof genreMap]
                    )}
                    numbers={movie.popularity}
                    mediaType="movie"
                    status={movieStatuses}
                  />
                ))
              : data.results.map((tv: TvShow) => (
                  <Card
                    key={tv.id}
                    id={tv.id}
                    name={tv.name}
                    coverImage={`https://image.tmdb.org/t/p/w300/${tv.poster_path}.webp`}
                    tag={tv.first_air_date}
                    voteAverage={tv.vote_average}
                    voteCount={tv.vote_count}
                    genre={tv.genre_ids.map(
                      (genres) => genreMap[genres as keyof typeof genreMap]
                    )}
                    numbers={tv.popularity}
                    mediaType="tv"
                    status={tvStatuses}
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
              disabled={!(page >= 1)}
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
