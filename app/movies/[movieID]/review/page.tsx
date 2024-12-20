import { configTMDB } from "@/apiConfig"
import { Reviews } from "@/components/movies/Reviews"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({
  params,
}: {
  params: { movieID: number }
}) {
  const movieId = params.movieID
  const data = await fetchFromTMDB(configTMDB.getMovieReviews(movieId))
  return (
    <div>
      <Reviews data={data.results} />
    </div>
  )
}
