import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"

export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  try {
    const game = await fetchProfileList(userId, "game")
    return (
      <ContentTab
        data={game}
        title="MY GAMES"
        mediaType="game"
        filters={["playing", "planning", "dropped", "beaten"]}
      />
    )
  } catch (error) {
    console.error("Error fetching movies:", error)
  }
}
