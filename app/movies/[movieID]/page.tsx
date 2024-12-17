import React from "react"

import MovieInfoPage from "@/components/movies/MovieInfoPage"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { configOMDB, configTMDB } from "@/apiConfig"

export default async function SingleMoviePage({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  try {
    const response = await fetchFromTMDB(configTMDB.getSingleMovie({ movieID }))
    const imdbId = response.external_ids.imdb_id

    if (!imdbId) {
      throw new Error("IMDB ID not found")
    }

    const imdbResponse = await fetch(configOMDB.getOmdbData(imdbId))
    if (!imdbResponse.ok) {
      throw new Error(`OMDB API error: ${imdbResponse.statusText}`)
    }

    const imdbData = await imdbResponse.json()
    if (!response) {
      throw new Error("No data received")
    }

    return (
      <MovieInfoPage
        movieInfo={response}
        movieId={movieID}
        imdbData={imdbData}
      />
    )
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
