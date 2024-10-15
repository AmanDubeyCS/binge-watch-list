import { configTMDB } from "@/apiConfig"
import { TvProviders } from "@/components/tvPage/tvHomePage/TvProviders"
import React from "react"

export default async function layout({ children }: any) {
  const tvProviders = await fetch(configTMDB.getTvProviders, {
    next: { revalidate: 60 },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTViMTQ1YTcwMDk1N2YwMjFmNjEzYjY3MjU5OTcwYyIsIm5iZiI6MTcyNTAwNTE3MS4yMjkwOTYsInN1YiI6IjY2ZDBhMWE3MDUwODQ5ZmQzMDAxOTdkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pg36xW8hMzVn3rhMTRptM3bzDeMWVcbr_SPppLNbSWs",
    },
  }).then((res) => res.json())
  return (
    <div className="mx-auto max-w-[1600px]">
      {tvProviders && <TvProviders TvProviders={tvProviders.results} />}
      {children}
    </div>
  )
}
