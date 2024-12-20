import { configTMDB } from "@/apiConfig"
import { Pictures } from "@/components/movies/Pictures"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  const data = await fetchFromTMDB(configTMDB.getMovieImages(movieID))
  return (
    <div>
      <Pictures data={data} />
    </div>
  )
}
