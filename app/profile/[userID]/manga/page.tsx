import ContentTab from "@/components/profile/ContentTab"
import { fetchProfileList } from "@/util/fetchProfileList"
import { mergeData } from "@/util/mergeApiData"

import React from "react"
export const revalidate = 300

function getTotalChaptersAcrossAllVolumes(data: any) {
  let totalChapters = 0

  // Get all volume keys
  const volumeKeys = Object.keys(data.volumes)

  // Iterate through each volume
  for (const volumeKey of volumeKeys) {
    const volume = data.volumes[volumeKey]

    // If this volume has chapters, add their count to the total
    if (volume.chapters) {
      const chaptersInThisVolume = Object.keys(volume.chapters).length
      totalChapters += chaptersInThisVolume
    }
  }

  return totalChapters
}

function extractStatusInfo(statusText: string) {
  // Convert to lowercase for case-insensitive matching
  const lowerCaseStatus = statusText.toLowerCase()

  // Check for each status keyword
  if (lowerCaseStatus.includes("complete")) {
    return "completed"
  }

  if (lowerCaseStatus.includes("hiatus")) {
    return "hiatus"
  }

  if (lowerCaseStatus.includes("ongoing")) {
    return "ongoing"
  }

  return null
}

export default async function page({ params }: { params: { userID: string } }) {
  const userId = params.userID
  const manga = await fetchProfileList(userId, "manga")

  const promises = manga.map(async (data) => {
    if (data.mangaUpdatesID && data.mangaUpdatesID !== "false") {
      const response = await fetch(
        `https://api.mangaupdates.com/v1/series/${data?.mangaUpdatesID}`
      )
      const res = await response.json()
      return {
        id: data.id,
        ...res,
        contentStatus: extractStatusInfo(res.status),
      }
    } else {
      const response = await fetch(
        `https://api.mangadex.org/manga/${data.id}/aggregate`
      )
      const res = await response.json()
      return {
        id: data.id,
        latest_chapter: getTotalChaptersAcrossAllVolumes(res),
        contentStatus: data.tag,
      }
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
      filters={["reading", "planning", "on hold", "dropped", "completed"]}
    />
  )
}
