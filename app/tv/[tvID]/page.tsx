import React from "react"
import { singleTvFetch } from "@/queries/TMDB/TV/tvFetch"

import { TvInfoPage } from "@/components/tvPage/TvInfoPage"
import { configOMDB } from "@/apiConfig"

export default async function SingleTvPage({
  params,
}: {
  params: { tvID: number }
}) {
  const tvID = params.tvID
  try {
    const response = await singleTvFetch({ tvID })
    const imdbId = response.external_ids.imdb_id

    if (!imdbId) {
      throw new Error("IMDB ID not found")
    }

    const imdbResponse = await fetch(configOMDB.getOmdbData(imdbId))
    if (!imdbResponse.ok) {
      throw new Error(`OMDB API error: ${imdbResponse.statusText}`)
    }

    const imdbData = await imdbResponse.json()

    if (!response) {
      throw new Error("No data received")
    }

    const tvData = response

    return <TvInfoPage tvInfo={tvData} tvID={tvID} imdbData={imdbData} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
