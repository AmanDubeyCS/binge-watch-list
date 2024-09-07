import React from "react"
import { useEpisodeDetails } from "@/quries/jikan/animefetch"
import useAnimeStore from "@/store/animeIdStore"

export function EpisodesDetails({animeID}: {animeID: number}) {
  const { data, error, isLoading } = useEpisodeDetails(animeID)
  console.log(data)
  return (
    <div>
        {data && data.map((episode: any) => (
            <p>{episode.title}</p>
        ))}
    </div>
  )
}
