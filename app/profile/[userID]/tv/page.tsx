import { configTMDB } from "@/apiConfig"
import ContentTab from "@/components/profile/ContentTab"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { fetchProfileList } from "@/util/fetchProfileList"
import { mergeData } from "@/util/mergeApiData"

import React from "react"

export const revalidate = 300
export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  const tv = await fetchProfileList(userId, "tv")

  const promises = tv.map((data) =>
    fetchFromTMDB(configTMDB.getSingleTvProfile(Number(data.id)))
  )
  const results = await Promise.all(promises)

  // console.log(tv)
  const mergedData = mergeData(tv, results)
  // console.log(mergedData)
  return (
    <ContentTab
      data={mergedData}
      title="MY TV SHOWS"
      mediaType="tv"
      filters={["watching", "planning", "dropped", "completed"]}
    />
  )
}
