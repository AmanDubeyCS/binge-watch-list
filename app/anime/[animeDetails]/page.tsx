import React from "react"

import { AnimeInfoPage } from "@/components/animePage/AnimeInfoPage"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { config, configOMDB } from "@/apiConfig"

function extractAnimeName(animeName: string) {
  return animeName
    .replace(/ -Season\s*\d+/i, "")
    .replace(/\s*Season\s*\d+/i, "")
    .replace(/-.*/, "")
    .trim()
}

export default async function Page({
  params,
}: {
  params: { animeDetails: number }
}) {
  const animeID = params.animeDetails
  const data = await fetchFromJikan(config.getSingleAnime(animeID), 0)

  const cleanNames = extractAnimeName(
    data?.data.title_english || data?.data.title
  )
  const imdbResponse = await fetch(configOMDB.getOmdbSearchData(cleanNames))
  if (!imdbResponse.ok) {
    throw new Error(`OMDB API error: ${imdbResponse.statusText}`)
  }

  const imdbData = await imdbResponse.json()

  return (
    <>
      {data && (
        <AnimeInfoPage
          animaInfo={data.data}
          animeID={animeID}
          imdbData={imdbData}
        />
      )}
    </>
  )
}
