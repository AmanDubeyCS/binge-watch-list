import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"

export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  try {
    const movies = await fetchProfileList(userId, "movie")
    return (
      <ContentTab
        data={movies}
        title="MY MOVIES"
        filters={["planning", "dropped", "completed"]}
        mediaType="movie"
      />
    )
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
