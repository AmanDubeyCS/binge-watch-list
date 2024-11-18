"use client"
import React, { useState } from "react"
import ChipTabs from "../ChipTabs"
import { GameDLC } from "./GameDLC"
import { GameAchievements } from "./GameAchievements"
import { WhereToBuy } from "./WhereToBuy"

interface MainProps {
  gameId: number
  children: React.ReactNode
}

export function MainContent({ gameId, children }: MainProps) {
  const tabs = ["Overview", "BUY", "DLC", "Achievements"]
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return children
      case "DLC":
        return <GameDLC gameId={gameId} />
      case "Achievements":
        return <GameAchievements gameId={gameId} />
      case "BUY":
        return <WhereToBuy gameId={gameId} />
      default:
        return
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
