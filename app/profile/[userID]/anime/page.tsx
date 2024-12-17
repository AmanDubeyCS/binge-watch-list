import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"

export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  try {
    const anime = await fetchProfileList(userId, "anime")
    return (
      <ContentTab
        data={anime}
        title="MY ANIME"
        mediaType="anime"
        filters={["watching", "planning", "dropped", "completed"]}
      />
    )
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
