import { configTMDB } from "@/apiConfig"
import { EpisodesDetails } from "@/components/tvPage/EpisodesDetails"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({ params }: { params: { tvID: number } }) {
  const tvID = params.tvID
  const data = await fetchFromTMDB(configTMDB.getSingleTv({ tvID }))
  return <EpisodesDetails seasons={data.seasons} seriesId={tvID} />
}
