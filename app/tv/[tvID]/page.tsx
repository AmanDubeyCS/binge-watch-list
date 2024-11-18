import React from "react"
import { singleTvFetch } from "@/queries/TMDB/TV/tvFetch"

import { TvInfoPage } from "@/components/tvPage/TvInfoPage"

export default async function SingleTvPage({ params }: any) {
  const tvID = params.tvID
  try {
    const response = await singleTvFetch({ tvID })

    if (!response) {
      throw new Error("No data received")
    }

    const tvData = response

    return <TvInfoPage tvInfo={tvData} tvID={tvID} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
