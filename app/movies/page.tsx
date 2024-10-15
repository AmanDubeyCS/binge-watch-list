import React from "react"
import { trendingMoviesFetch } from "@/quries/TMDB/movies/moviesFetch"

import { CurrentlyTrending } from "@/components/tvPage/tvHomePage/CurrentlyTrending"

export default async function MoviesPage() {
  const trendingMovies = await trendingMoviesFetch()

  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
      {trendingMovies && (
        <CurrentlyTrending
          movieData={trendingMovies}
          title="Currently Trending"
        />
      )}
    </main>
  )
}
