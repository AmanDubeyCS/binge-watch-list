"use client"
import React, { useState } from "react"
import ChipTabs from "../ChipTabs"
import { MangaChapters } from "./MangaChapters"
import { Reviews } from "./Reviews"
import { Media } from "./Media"
import { Comments, Volume } from "@/types/manga/singleManga"

export function MainContent({
  volums,
  mangaId,
  reviews,
}: {
  volums: Record<string, Volume>
  mangaId: string
  reviews: Comments
}) {
  const tabs = ["Chapters", "Reviews", "Media"]
  const [activeTab, setActiveTab] = useState("overview")
  // console.log(reviews)
  const renderContent = () => {
    switch (activeTab) {
      case "Chapters":
        return <MangaChapters volumes={volums} mangaId={mangaId} />
      case "Reviews":
        return <Reviews reviews={reviews} />
      case "Media":
        return <Media mangaId={mangaId} />
      //   case "recommendations":
      //     return animeID && <Recommendations animeID={animeID} />
      default:
        return <MangaChapters volumes={volums} mangaId={mangaId} />
    }
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="h-[50px] rounded-lg border">
        <ChipTabs activeTab={(val: string) => setActiveTab(val)} tabs={tabs} />
      </div>
      <div className="size-full rounded-lg">{renderContent()}</div>
    </div>
  )
}
