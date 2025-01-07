import { configTMDB } from "@/apiConfig"
import { Pictures } from "@/components/movies/Pictures"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({ params }: { params: { tvID: number } }) {
  const seriesId = params.tvID
  const data = await fetchFromTMDB(configTMDB.getTvImages(seriesId))
  return <Pictures data={data} />
}
