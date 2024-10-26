import { configTMDB } from "@/apiConfig"
import { TvProviders } from "@/components/tvPage/tvHomePage/TvProviders"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React from "react"

export default async function layout({ children }: any) {
  const movieProviders = await fetchFromTMDB(configTMDB.getMovieProviders)
  return (
    <div className="mx-auto max-w-[1600px]">
      {movieProviders && <TvProviders TvProviders={movieProviders.results} />}
      {children}
    </div>
  )
}
