import React from "react"
import { useSearchParams } from "next/navigation"
import Card from "../common/Card"
import { genreMap, tvStatuses } from "../common/ListContent"
import axios from "axios"
import { configTMDB } from "@/apiConfig"
import { useDebounce } from "@/util/debouncing"
import { useSearchData } from "@/queries/search"
import { LoadingCard } from "../LoadingCard"

async function fetchTvDetails(tvID: number) {
  const response = await axios.get("/api/proxy", {
    params: {
      url: configTMDB.getSingleTvProfile(tvID),
    },
  })

  return response.data
}

interface ShowResult {
  id: number
  name: string
  original_title: string
  poster_path: string
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  details: any
}

export default function SearchTv() {
  const searchParams = useSearchParams()

  const debouncedQuery = useDebounce(searchParams.get("q") || "")

  const {
    data: showData,
    isLoading,
    error,
  } = useSearchData("show", debouncedQuery)

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(searchParams.get("q") || "")
  //   }, 300)

  //   return () => {
  //     clearTimeout(handler)
  //   }
  // }, [searchParams])

  // const { data: movieData, error, isLoading } = useTvSearch(debouncedSearch)

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     if (movieData && movieData.length > 0) {
  //       const promises = movieData.map(async (movie: any) => {
  //         const movieDetails = await fetchTvDetails(movie.id)
  //         return { ...movie, details: movieDetails }
  //       })

  //       const updatedResults = await Promise.all(promises)
  //       setResults(updatedResults)
  //     }
  //   }

  //   fetchMovies()
  // }, [movieData])

  // console.log(results)
  // const filteredData = results.filter((item) => {
  //   return !item.details.keywords.results.some(
  //     (keyword: { id: number }) => keyword.id === 210024
  //   )
  // })
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      {isLoading && (
        <div className="mx-auto flex max-w-[1600px] flex-wrap gap-4">
          {Array.from({ length: 16 }, (_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      )}
      <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-2">
        {!isLoading && (
          <div className="grid grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {showData?.map((tv: ShowResult) => (
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
        )}
      </div>
    </>
  )
}
