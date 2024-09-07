"use client"

import React from "react"
import { useMangaData } from "@/quries/mangaDex/mangaFetch"

import { MangaInfoPage } from "@/components/mangaPage/MangaInfoPage"

export default function Page({ params }: any) {
  const mangaID = params.mangaDetails

  const { mangaInfo, chapter, statistics, isLoading, error } =
    useMangaData(mangaID)

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {chapter && mangaInfo && statistics && (
        <MangaInfoPage
          mangaInfo={mangaInfo.data}
          chapters={chapter}
          statistics={statistics}
        />
      )}
    </>
  )
}
