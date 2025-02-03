import { config } from "@/apiConfig"
import { AnimeDiscoverPage } from "@/components/animePage/AnimeDiscoverPage"
import Loading from "@/components/Loading"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import React, { Suspense } from "react"

export default async function page() {
  const genres = await fetchFromJikan(config.getAnimeGenres, 0)
  return (
    <Suspense fallback={<Loading />}>
      <AnimeDiscoverPage animeGenres={genres.data} />
    </Suspense>
  )
}
