"use client"
import React, { useState } from "react"
import { Card } from "./Card"
import { cn } from "@/lib/utils"

interface WatchListData {
  id: number | string // Unique identifier for the anime
  name: string // Title of the anime
  coverImage: string // URL of the anime's cover image
  genre: string[] // Array of genres associated with the anime
  numbers: number // Some numerical value (e.g., episode count)
  status: string // User's current status with the anime (e.g., "watching")
  tag: string // Additional tag or label (e.g., "Currently Airing")
  voteAverage: number // Average user rating for the anime
  voteCount: number // Total number of votes or ratings
  remarks: string
  progress: string
  episodeCount: number
  showStatus: string
}

export default function ContentTab({
  data,
  title,
  filters,
  mediaType,
}: {
  data: WatchListData[]
  title: string
  filters: string[]
  mediaType: string
}) {
  const [filteredData, setFilteredData] = useState(data)
  const [activeFilter, setActiveFilter] = useState("All")

  const handleClick = (filter: string) => {
    setActiveFilter(filter)
    if (filter === "All") {
      setFilteredData(data)
    } else {
      const filterdData = data.filter(
        (data: { status: string }) => data.status === filter
      )
      setFilteredData(filterdData)
    }
  }
  return (
    <div>
      <div className="mb-10 flex h-[35px] justify-between">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        <div className="flex gap-3">
          <span
            onClick={() => handleClick("All")}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded-full border px-4 text-center leading-4 text-black hover:bg-gray-100",
              activeFilter === "All" && "bg-slate-100"
            )}
          >
            All
          </span>
          {filters.map((filter: string) => (
            <span
              key={filter}
              onClick={() => handleClick(filter)}
              className={cn(
                "flex cursor-pointer items-center justify-center rounded-full border px-4 text-center leading-4 text-black hover:bg-gray-100",
                activeFilter === filter && "bg-slate-100"
              )}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {filteredData.map((data) => (
          <Card
            key={data.id}
            id={data.id}
            name={data.name}
            coverImage={data.coverImage}
            firstAirDate={data.tag}
            voteAverage={data.voteAverage}
            voteCount={data.voteCount}
            genreIds={data.genre}
            popularity={data.numbers}
            mediaType={mediaType}
            status={data.status}
            remarks={data.remarks}
            progress={data.progress}
            episodes={data.episodeCount}
            showStatus={data.showStatus}
          />
        ))}
      </div>
    </div>
  )
}
