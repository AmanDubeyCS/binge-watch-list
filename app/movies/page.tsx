import React from "react"
import { trendingMoviesFetch } from "@/quries/TMDB/movies/moviesFetch"

import MoviesList from "@/components/movies/MoviesList"

export default async function MoviesPage() {
  try {
    const response = await trendingMoviesFetch()

    if (!response) {
      throw new Error("No data received")
    }

    const moviesData = response
    return <MoviesList moviesData={moviesData} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
