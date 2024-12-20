import { configTMDB } from "@/apiConfig"
import VideoList from "@/components/common/VideoList"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function SingleTvPage({
  params,
}: {
  params: { tvID: number }
}) {
  const tvId = params.tvID
  try {
    const response = await fetchFromTMDB(configTMDB.getTvVideos(tvId))

    return <VideoList videos={response.results} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
