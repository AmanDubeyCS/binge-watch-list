"use client"

import React, { useState, useEffect, useMemo } from "react"

interface Season {
  season_number: number
  episode_count: number
}

interface SeasonEpisodeCounterProps {
  seasons: Season[]
  initialValue?: string
  setProgress: (_progress: string) => void
}

export function SeasonEpisodeCounter({
  seasons,
  initialValue = "S01 E01",
  setProgress,
}: SeasonEpisodeCounterProps) {
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)

  const maxSeasons = seasons.length

  const formatProgress = (s: number, e: number) =>
    `S${s.toString().padStart(2, "0")} E${e.toString().padStart(2, "0")}`

  const currentSeasonData = useMemo(
    () => seasons.find((s) => s.season_number === season),
    [seasons, season]
  )
  const currentSeasonEpisodes = currentSeasonData?.episode_count || 0

  useEffect(() => {
    const match = initialValue.match(/S(\d{2})\s*E(\d{2})/)
    if (match) {
      const initialSeason = parseInt(match[1], 10)
      const initialEpisode = parseInt(match[2], 10)
      if (isValidSeasonEpisode(initialSeason, initialEpisode)) {
        setSeason(initialSeason)
        setEpisode(initialEpisode)
      }
    }
  }, [])

  useEffect(() => {
    setProgress(formatProgress(season, episode))
  }, [season, episode, setProgress])

  const isValidSeasonEpisode = (s: number, e: number) => {
    const seasonData = seasons.find((season) => season.season_number === s)
    return (
      s >= 1 &&
      s <= maxSeasons &&
      e >= 1 &&
      e <= (seasonData?.episode_count || 0)
    )
  }

  const navigate = (direction: "increment" | "decrement") => {
    if (direction === "increment") {
      if (episode < currentSeasonEpisodes) {
        setEpisode(episode + 1)
      } else if (season < maxSeasons) {
        const nextSeason = season + 1
        const nextSeasonEpisodes =
          seasons.find((s) => s.season_number === nextSeason)?.episode_count ||
          0
        if (nextSeasonEpisodes > 0) {
          setSeason(nextSeason)
          setEpisode(1)
        }
      }
    } else {
      if (episode > 1) {
        setEpisode(episode - 1)
      } else if (season > 1) {
        const prevSeason = season - 1
        const prevSeasonEpisodes =
          seasons.find((s) => s.season_number === prevSeason)?.episode_count ||
          0
        setSeason(prevSeason)
        setEpisode(prevSeasonEpisodes)
      }
    }
  }

  const isIncrementDisabled =
    season === maxSeasons && episode === currentSeasonEpisodes
  const isDecrementDisabled = season === 1 && episode === 1

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 space-x-2">
      <p className="w-24 text-center font-bold">
        {formatProgress(season, episode)}
      </p>
      <div className="flex w-full gap-3">
        <button
          onClick={() => navigate("decrement")}
          disabled={isDecrementDisabled}
          aria-label="Decrease episode"
          className="flex size-10 w-1/2 shrink-0 items-center justify-center rounded-md bg-gray-400 p-2 text-2xl disabled:bg-slate-100"
        >
          -
        </button>
        <button
          onClick={() => navigate("increment")}
          disabled={isIncrementDisabled}
          aria-label="Increase episode"
          className="flex size-10 w-1/2 shrink-0 items-center justify-center rounded-md bg-green-500 p-2 text-2xl disabled:bg-slate-100"
        >
          +
        </button>
      </div>
    </div>
  )
}
