import { configTMDB } from "@/apiConfig"
import ContentTab from "@/components/profile/ContentTab"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { fetchProfileList } from "@/util/fetchProfileList"

import React from "react"

function mergeData(api1: any[], api2: any[]) {
  return api1.map((item1) => {
    const matchingItem = api2.find((item2) => item2.id === item1.id)
    return {
      ...item1, // Spread API 1 data
      ...matchingItem, // Override/add data from API 2
      id: item1.id, // Ensure the id stays consistent
    }
  })
}

export const revalidate = 300
export default async function page({ params }: { params: { userID: string } }) {
  console.log("Page generated at:", new Date().toISOString())
  const userId = params.userID
  try {
    const tv = await fetchProfileList(userId, "tv")

    const promises = tv.map((data) =>
      fetchFromTMDB(configTMDB.getSingleTvProfile(Number(data.id)))
    )
    const results = await Promise.all(promises)

    // console.log(tv)
    const mergedData = mergeData(tv, results)
    console.log(mergedData)
    return (
      <ContentTab
        data={mergedData}
        title="MY TV SHOWS"
        mediaType="tv"
        filters={["watching", "planning", "dropped", "completed"]}
      />
    )
  } catch (error) {
    console.error("Error fetching tv shows:", error)
  }
}
