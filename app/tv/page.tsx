import React from "react"
import { trendingTvFetch } from "@/quries/TMDB/TV/tvFetch"

import { CurrentlyTrending } from "@/components/tvPage/tvHomePage/CurrentlyTrending"
import { configTMDB } from "@/apiConfig"
import { TvProviders } from "@/components/tvPage/tvHomePage/TvProviders"
import { TvGenresList } from "@/components/tvPage/tvHomePage/TvGenresList"

export default async function MoviesPage() {
  const trendingTv = await trendingTvFetch()

  const PopularTV = await fetch(configTMDB.getTvPopular, {
    next: { revalidate: 60 },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTViMTQ1YTcwMDk1N2YwMjFmNjEzYjY3MjU5OTcwYyIsIm5iZiI6MTcyNTAwNTE3MS4yMjkwOTYsInN1YiI6IjY2ZDBhMWE3MDUwODQ5ZmQzMDAxOTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pg36xW8hMzVn3rhMTRptM3bzDeMWVcbr_SPppLNbSWs",
    },
  }).then((res) => res.json())

  const tvProviders = await fetch(configTMDB.getTvProviders, {
    next: { revalidate: 60 },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTViMTQ1YTcwMDk1N2YwMjFmNjEzYjY3MjU5OTcwYyIsIm5iZiI6MTcyNTAwNTE3MS4yMjkwOTYsInN1YiI6IjY2ZDBhMWE3MDUwODQ5ZmQzMDAxOTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pg36xW8hMzVn3rhMTRptM3bzDeMWVcbr_SPppLNbSWs",
    },
  }).then((res) => res.json())

  const tvGenres = await fetch(configTMDB.getTvGenres, {
    next: { revalidate: 60 },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTViMTQ1YTcwMDk1N2YwMjFmNjEzYjY3MjU5OTcwYyIsIm5iZiI6MTcyNTAwNTE3MS4yMjkwOTYsInN1YiI6IjY2ZDBhMWE3MDUwODQ5ZmQzMDAxOTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pg36xW8hMzVn3rhMTRptM3bzDeMWVcbr_SPppLNbSWs",
    },
  }).then((res) => res.json())
  return (
    <main className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 pb-10">
      {trendingTv && (
        <CurrentlyTrending tvData={trendingTv} title="Currently Trending" />
      )}
      {PopularTV && (
        <CurrentlyTrending tvData={PopularTV.results} title="Popular on TV" />
      )}
      {tvProviders && <TvProviders TvProviders={tvProviders.results} />}
      {tvGenres && <TvGenresList categorys={tvGenres.genres} />}
    </main>
  )
}
