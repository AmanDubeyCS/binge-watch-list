"use client"
import React, { useState } from "react"
import { ProfileCard } from "./Card"
import { cn } from "@/lib/utils"

interface WatchListData {
  id: number | string
  name: string
  coverImage: string
  genre: string[]
  numbers: number
  status: string
  watchStatus?: string
  readStatus?: string
  gameStatus?: string
  tag: string
  voteAverage: number
  voteCount: number
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
  mangaUpdatesID: number | string
  latest_chapter?: number
  last_updated?: any
  videos?: any
  overview?: string
  last_episode_to_air?: any
  next_episode_to_air?: any
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
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="hide-scrollbar flex h-[35px] gap-3 overflow-scroll">
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
                "flex cursor-pointer items-center justify-center text-nowrap rounded-full border px-4 text-center leading-4 text-black hover:bg-gray-100",
                activeFilter === filter && "bg-slate-100"
              )}
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto grid w-fit grid-cols-1 gap-1 pb-20 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 2xl:grid-cols-4">
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
              Array.isArray(data.genres) && mediaType !== "manga"
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
            chapters={data.latest_chapter}
            mangaProgress={data.mangaProgress}
            lastUpdated={data.last_updated?.as_string}
            video={data.videos?.results}
            overview={data.overview}
            lastToAir={`S${String(data?.last_episode_to_air?.season_number).padStart(2, "0")} E${String(data?.last_episode_to_air?.episode_number).padStart(2, "0")}`}
            nextToAir={String(
              data.next_episode_to_air?.episode_number
            ).padStart(2, "0")}
          />
        ))}
      </div>
    </div>
  )
}
