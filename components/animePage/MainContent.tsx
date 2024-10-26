"use client"
import React, { useState } from "react"
import ChipTabs from "../ChipTabs"
import { EpisodesDetails } from "./EpisodesDetails"
import AnimeStatsGraph from "./Statistics"

import { CharacterDetails } from "./CharacterDetails"

import Overview from "./Overview"
import { Pictures } from "./Pictures"
import { Recommendations } from "./Recommendations"
import { Anime } from "@/types/anime/singleAnime"

export function MainContent({animaInfo, animeID}: { animaInfo: Anime, animeID: number }) {
  const tabs = [
    "overview",
    "characters",
    "episodes",
    "statistics",
    "recommendations",
    "pictures",
  ]
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview animeInfo={animaInfo} />
      case "characters":
        return animeID && <CharacterDetails animeID={animeID} />
      case "episodes":
        return animeID && <EpisodesDetails animeID={animeID} />
      case "statistics":
        return animeID && <AnimeStatsGraph animeID={animeID} />
      case "pictures":
        return animeID && <Pictures animeID={animeID} />
      case "recommendations":
        return animeID && <Recommendations animeID={animeID} />
      default:
        return <Overview animeInfo={animaInfo} />
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
