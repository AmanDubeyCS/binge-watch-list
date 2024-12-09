import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"

export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  try {
    const tv = await fetchProfileList(userId, "tv")
    return (
      <ContentTab
        data={tv}
        title="MY TV SHOWS"
        mediaType="tv"
        filters={["watching", "planning", "dropped", "completed"]}
      />
    )
  } catch (error) {
    console.error("Error fetching tv shows:", error)
  }
}
