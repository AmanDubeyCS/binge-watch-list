"use client"
import { Calendar, ChevronDown, ChevronUp, Star } from "lucide-react"
import React, { useState } from "react"
import { EpisodesList } from "./EpisodesList"
import { Season } from "@/types/tv/singleTvType"

export function EpisodesDetails({
  seasons,
  seriesId,
}: {
  seasons: Season[]
  seriesId: number
}) {
  const [expandedSeason, setExpandedSeason] = useState<number | null>(null)
  const [seasonId, setSeasonID] = useState<number>()

  const toggleExpand = (seasonNumber: number) => {
    setExpandedSeason(expandedSeason === seasonNumber ? null : seasonNumber)
  }
  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="space-y-6">
        {seasons.map((season) => (
          <div
            key={season.id}
            onClick={() => setSeasonID(season.season_number)}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="flex items-start p-4">
              <img
                src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                alt={`${season.name} Poster`}
                className="mr-4 h-36 w-24 shrink-0 rounded-md object-cover"
              />
              <div className="grow">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{season.name}</h2>
                    <p className="mt-1 flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 size-4" />
                      {season.air_date}
                    </p>
                  </div>
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
                    {season.episode_count} episodes
                  </span>
                </div>
                <div className="mb-2 flex items-center">
                  <Star className="mr-1 size-5 text-yellow-400" />
                  <span className="font-semibold">
                    {season.vote_average.toFixed(1)}
                  </span>
                </div>
                {expandedSeason === season.season_number && (
                  <p className="mb-4 text-sm text-gray-600">
                    {season.overview}
                  </p>
                )}
                <button
                  className="flex items-center text-blue-600 transition-colors duration-200 hover:text-blue-800"
                  onClick={() => toggleExpand(season.season_number)}
                >
                  {expandedSeason === season.season_number ? (
                    <>
                      <ChevronUp className="mr-2 size-4" />
                      Hide Overview
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 size-4" />
                      Show Overview
                    </>
                  )}
                </button>
              </div>
            </div>
            {expandedSeason === season.season_number && (
              <div>
                {seasonId !== undefined && (
                  <EpisodesList seasonId={seasonId} seriesId={seriesId} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
