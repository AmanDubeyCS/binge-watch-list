import React from "react"

import { AnimeInfoPage } from "@/components/animePage/AnimeInfoPage"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { config } from "@/apiConfig"

export default async function Page({ params }: any) {
  const animeID = params.animeDetails
  const data = await fetchFromJikan(config.getSingleAnime(animeID), 0)

  return (
    <>{data && <AnimeInfoPage animaInfo={data.data} animeID={animeID} />}</>
  )
}
