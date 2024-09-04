import React from "react"
import { singleMovieFetch } from "@/quries/TMDB/movies/moviesFetch"

import MovieInfoPage from "@/components/movies/MovieInfoPage"

export default async function SingleMoviePage({ params }: any) {
  const movieID = params.movieID
  try {
    const response = await singleMovieFetch({ movieID })

    if (!response) {
      throw new Error("No data received")
    }

    const moviesData = response

    return <MovieInfoPage movieInfo={moviesData} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
