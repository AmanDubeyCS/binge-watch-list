import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Card from "../common/Card"
import { useMovieSearch } from "@/queries/TMDB/movies/moviesFetch"
import { genreMap, movieStatuses } from "../common/ListContent"
import axios from "axios"
import { configTMDB } from "@/apiConfig"

async function fetchMovieDetails(movieID: number) {
  const response = await axios.get("/api/proxy", {
    params: {
      url: configTMDB.getSingleMovieProfile(movieID),
    },
  })

  return response.data
}

interface MovieResult {
  id: number
  title: string
  original_title: string
  poster_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  details: any
}

export default function SearchMovie() {
  const searchParams = useSearchParams()
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [results, setResults] = useState<MovieResult[]>([])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchParams.get("q") || "")
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [searchParams])

  const { data: movieData, error, isLoading } = useMovieSearch(debouncedSearch)

  useEffect(() => {
    const fetchMovies = async () => {
      if (movieData && movieData.length > 0) {
        const promises = movieData.map(async (movie: any) => {
          const movieDetails = await fetchMovieDetails(movie.id)
          return { ...movie, details: movieDetails }
        })

        const updatedResults = await Promise.all(promises)
        setResults(updatedResults)
      }
    }

    fetchMovies()
  }, [movieData])

  const filteredData = results.filter((item) => {
    return !item.details.keywords.keywords.some(
      (keyword: { id: number }) => keyword.id === 210024
    )
  })
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2">
        {!isLoading && results && (
          <div className="grid grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredData?.map((movie) => (
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
                statusData={[]}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
