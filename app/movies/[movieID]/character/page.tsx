import { configTMDB } from "@/apiConfig"
import { CastAndCrew } from "@/components/common/CastAndCrew"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function page({
  params,
}: {
  params: { movieID: number }
}) {
  const movieID = params.movieID
  const data = await fetchFromTMDB(configTMDB.getSingleMovieCast(movieID))

  return <>{data && <CastAndCrew data={data} />}</>
}
