import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"
export const revalidate = 300
export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  try {
    const manga = await fetchProfileList(userId, "manga")
    return (
      <ContentTab
        data={manga}
        title="MY MANGA"
        mediaType="manga"
        filters={["reading", "planning", "dropped", "completed"]}
      />
    )
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
