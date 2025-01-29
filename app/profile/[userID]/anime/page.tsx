import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"
export const revalidate = 300
export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  const anime = await fetchProfileList(userId, "anime")
  return (
    <ContentTab
      data={anime}
      title="MY ANIME"
      mediaType="anime"
      filters={["watching", "planning", "on hold", "dropped", "completed"]}
    />
  )
}
