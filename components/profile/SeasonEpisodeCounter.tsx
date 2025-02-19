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
  lastToAir: string
}

export function SeasonEpisodeCounter({
  seasons,
  initialValue = "S01 E01",
  setProgress,
  lastToAir,
}: SeasonEpisodeCounterProps) {
  const [season, setSeason] = useState(1)
  const [episode, setEpisode] = useState(1)
  const [lastAirseason, setLastAirSeason] = useState(1)
  const [lastAirepisode, setLastAirEpisode] = useState(1)

  const filteredSeasons = seasons.filter((s) => s.season_number !== 0)

  const formatProgress = (s: number, e: number) =>
    `S${s.toString().padStart(2, "0")} E${e.toString().padStart(2, "0")}`

  const currentSeasonData = useMemo(
    () => filteredSeasons.find((s) => s.season_number === season),
    [filteredSeasons, season]
  )
  const currentSeasonEpisodes =
    lastAirseason === season
      ? lastAirepisode
      : currentSeasonData?.episode_count || 0

  useEffect(() => {
    const match = initialValue.match(/S(\d{2})\s*E(\d{2})/)
    const lastAirMAtch = lastToAir.match(/S(\d{2})\s*E(\d{2})/)
    if (match) {
      const initialSeason = parseInt(match[1], 10)
      const initialEpisode = parseInt(match[2], 10)
      setSeason(initialSeason)
      setEpisode(initialEpisode)
    }
    if (lastAirMAtch) {
      const initialSeason = parseInt(lastAirMAtch[1], 10)
      const initialEpisode = parseInt(lastAirMAtch[2], 10)
      setLastAirSeason(initialSeason)
      setLastAirEpisode(initialEpisode)
    }
  }, [])

  useEffect(() => {
    setProgress(formatProgress(season, episode))
  }, [season, episode, setProgress])

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <p className="w-24 text-center font-bold">
        {formatProgress(season, episode)}
      </p>
      <div className="flex w-full justify-between gap-3">
        <select
          className="w-1/2 rounded-md border p-2"
          value={season}
          onChange={(e) => {
            setSeason(Number(e.target.value)), setEpisode(1)
          }}
        >
          {filteredSeasons.map((s) => (
            <option key={s.season_number} value={s.season_number}>
              Season {s.season_number}
            </option>
          ))}
        </select>

        <select
          className="w-1/2 rounded-md border p-2"
          value={episode}
          onChange={(e) => setEpisode(Number(e.target.value))}
        >
          {Array.from({ length: currentSeasonEpisodes }, (_, i) => i + 1).map(
            (ep) => (
              <option key={ep} value={ep}>
                Episode {ep}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  )
}
