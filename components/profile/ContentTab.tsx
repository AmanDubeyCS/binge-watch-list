"use client"
import React, { useState } from "react"
import { ProfileCard } from "./Card"
import { cn } from "@/lib/utils"

interface WatchListData {
  id: number | string // Unique identifier for the anime
  name: string // Title of the anime
  coverImage: string // URL of the anime's cover image
  genre: string[] // Array of genres associated with the anime
  numbers: number // Some numerical value (e.g., episode count)
  status: string // User's current status with the anime (e.g., "watching")
  watchStatus?: string
  readStatus?: string
  gameStatus?: string
  tag: string // Additional tag or label (e.g., "Currently Airing")
  voteAverage: number // Average user rating for the anime
  voteCount: number // Total number of votes or ratings
  remarks: string
  progress: string
  episodeCount: number
  showStatus: string
  WatchStatus: any
  poster_path: string
  vote_average: number
  vote_count: number
  genres: string[]
  popularity: number
  tvProgress: string
  seasons: any
  platforms: any
  animeProgress: number
  episodes: number
  mangaProgress: number
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
      const filteredData = data.filter(
        (item: WatchListData) =>
          item.watchStatus === filter ||
          item.readStatus === filter ||
          item.gameStatus === filter
      )
      setFilteredData(filteredData)
    }
  }

  return (
    <div>
      <div className="mb-10 gap-6 flex flex-col md:flex-row justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-3 h-[35px] overflow-scroll hide-scrollbar">
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
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:flex flex-wrap">
        {filteredData.map((data) => (
          <ProfileCard
            key={data.id}
            id={data.id}
            name={data.name}
            coverImage={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w300/${data.poster_path}.webp`
                : data.coverImage
            }
            tag={data.tag}
            voteAverage={data.vote_average || data.voteAverage}
            voteCount={data.vote_count || data.voteCount}
            genre={
              Array.isArray(data.genres)
                ? data.genres.map((genre: any) =>
                    typeof genre === "string" ? genre : genre.name
                  )
                : data.genre
            }
            numbers={data.popularity || data.numbers}
            mediaType={mediaType}
            status={
              data.watchStatus || data.readStatus || data.gameStatus || ""
            }
            remark={data.remarks}
            showProgress={data.tvProgress}
            seasons={data.seasons}
            platforms={data.platforms}
            animeprogress={data.animeProgress}
            episodes={data.episodes}
            mangaProgress={data.mangaProgress}
          />
        ))}
      </div>
    </div>
  )
}
