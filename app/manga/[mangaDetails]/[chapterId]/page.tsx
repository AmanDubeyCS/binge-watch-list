import React from "react"
import { getChapterData } from "@/queries/mangaDex/mangaFetch"

import { MangaReadPage } from "@/components/mangaPage/MangaReadPage"

export default async function ChapterPage({
  params,
}: {
  params: { chapterId: string }
}) {
  const chapterID = params.chapterId

  try {
    const response = await getChapterData(chapterID)

    if (!response) {
      throw new Error("No data received")
    }

    const chapterData = response

    return <MangaReadPage data={chapterData} />
  } catch (error) {
    console.error("Error fetching chapter pages:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
