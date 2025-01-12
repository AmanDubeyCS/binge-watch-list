import { Overview } from "@/components/profile/Overview"
import { fetchProfileList } from "@/util/fetchProfileList"
import React from "react"

export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID

  const [movieData, animeData, tvData, mangaData] = await Promise.all([
    fetchProfileList(userId, "movie"),
    fetchProfileList(userId, "anime"),
    fetchProfileList(userId, "tv"),
    fetchProfileList(userId, "manga"),
  ])
  return (
    <Overview
      movieData={movieData}
      animeData={animeData}
      tvData={tvData}
      mangaData={mangaData}
    />
  )
}
