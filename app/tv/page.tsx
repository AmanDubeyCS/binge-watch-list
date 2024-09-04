import React from "react"
import { trendingTvFetch } from "@/quries/TMDB/TV/tvFetch"

import TvList from "@/components/tvPage/TvList"

export default async function MoviesPage() {
  try {
    const response = await trendingTvFetch()

    if (!response) {
      throw new Error("No data received")
    }

    const tvData = response

    return <TvList tvData={tvData} />
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
