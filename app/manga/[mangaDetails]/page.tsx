import React from "react"

import { config } from "@/apiConfig"
import { fetchCanonicalAndEncode } from "@/util/fetchFromMangaUpdates"
import { fetchFromMangaDex } from "@/util/fetchFromTMDB"
import { redirect } from "next/navigation"

const checkdata = async (mangaID: string) => {
  try {
    const manga = await fetchFromMangaDex(config.getSingleManga({ mangaID }))
    const mangaInfo = await manga.data

    if (Number(mangaInfo.attributes.links.mu)) {
      const muID = await fetchCanonicalAndEncode(
        `https://www.mangaupdates.com/series.html?id=${mangaInfo.attributes.links.mu}`
      )
      return muID
    } else if (!mangaInfo.attributes.links.mu) {
      return 1
    } else {
      return parseInt(mangaInfo.attributes.links.mu, 36)
    }
  } catch (error) {
    console.error("Error fetching manga data:", error)
    return <div>Error fetching manga data.</div>
  }
}
export default async function page({
  params,
}: {
  params: { mangaDetails: string }
}) {
  const mangaID = params.mangaDetails
  const ID = await checkdata(mangaID)
  if (ID) {
    redirect(`/manga/${mangaID}/${ID}`)
  } else {
    redirect(`/manga/${mangaID}/1`)
  }
}
