import React from "react"
import { MangaInfoPage } from "@/components/mangaPage/MangaInfoPage"
import axios from "axios"
import { config } from "@/apiConfig"

export default async function Page({
  params,
}: {
  params: { mangaDetails: string }
}) {
  const mangaID = params.mangaDetails

  try {
    const mangaInfo = await axios.get(config.getSingleManga({ mangaID }))
    const chapter = await axios.get(config.getMangaChapters({ mangaID }))
    const statistics = await axios.get(config.getMangaStatistics({ mangaID }))

    return (
      <div>
        {mangaInfo.data && chapter.data && statistics.data && (
          <MangaInfoPage
            mangaInfo={mangaInfo.data.data}
            chapters={chapter.data}
            statistics={statistics.data}
          />
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching manga data:", error)
    return <div>Error fetching manga data.</div>
  }
}
