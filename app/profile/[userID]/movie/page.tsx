import { configTMDB } from "@/apiConfig"
import ContentTab from "@/components/profile/ContentTab"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { fetchProfileList } from "@/util/fetchProfileList"
import { mergeData } from "@/util/mergeApiData"

import React from "react"
export const revalidate = 300
export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  try {
    const movies = await fetchProfileList(userId, "movie")

    const promises = movies.map((data) =>
      fetchFromTMDB(configTMDB.getSingleMovieProfile(Number(data.id)))
    )
    const results = await Promise.all(promises)
    const mergedData = mergeData(movies, results)
    return (
      <ContentTab
        data={mergedData}
        title="MY MOVIES"
        filters={["planning", "dropped", "completed"]}
        mediaType="movie"
      />
    )
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
