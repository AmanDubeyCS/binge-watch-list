import React from "react"
import { useEpisodeDetails } from "@/quries/jikan/animefetch"

export function EpisodesDetails({ animeID }: { animeID: number }) {
  const { data } = useEpisodeDetails(animeID)
  console.log(data)
  return <div>{data && data.map((episode: any) => <p>{episode.title}</p>)}</div>
}
