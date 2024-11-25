import { config } from "@/apiConfig"
import { AnimeDiscoverPage } from "@/components/animePage/AnimeDiscoverPage"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import React, { Suspense } from "react"

export default async function page() {
  const genres = await fetchFromJikan(config.getAnimeGenres, 0)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimeDiscoverPage animeGenres={genres.data} />
    </Suspense>
  )
}
