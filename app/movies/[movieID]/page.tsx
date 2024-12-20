import React from "react"

import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { configTMDB } from "@/apiConfig"
import VideoList from "@/components/common/VideoList"

export default async function SingleMoviePage({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  try {
    const response = await fetchFromTMDB(configTMDB.getMovieVideos(movieID))

    return <VideoList videos={response.results} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
