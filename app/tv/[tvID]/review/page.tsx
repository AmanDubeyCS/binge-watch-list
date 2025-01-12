import { configTMDB } from "@/apiConfig"
import { Reviews } from "@/components/movies/Reviews"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({ params }: { params: { tvID: number } }) {
  const seriesId = params.tvID
  const data = await fetchFromTMDB(configTMDB.getTvReviews(seriesId))
  return <Reviews data={data.results} />
}
