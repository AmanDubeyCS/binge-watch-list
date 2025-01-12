import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"
import { mergeData } from "@/util/mergeApiData"

import React from "react"
export const revalidate = 300
export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  const manga = await fetchProfileList(userId, "manga")

  const promises = manga.map(async (data) => {
    if (data.mangaUpdatesID) {
      const response = await fetch(
        `https://api.mangaupdates.com/v1/series/${data?.mangaUpdatesID}`
      )
      const res = await response.json()
      return { id: data.id, ...res }
    } else {
      return { id: data.id }
    }
  })
  const results = await Promise.all(promises)
  const mergedData = mergeData(manga, results)
  // console.log(results)
  // console.log(mergedData)
  return (
    <ContentTab
      data={mergedData}
      title="MY MANGA"
      mediaType="manga"
      filters={["reading", "planning", "dropped", "completed"]}
    />
  )
}
