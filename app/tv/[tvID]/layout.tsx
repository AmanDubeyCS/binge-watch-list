import { configOMDB, configTMDB } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import { ContentSidebar } from "@/components/common/ContentSidebar"
import NavLinks from "@/components/common/NavLinks"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React, { ReactElement } from "react"

const links = [
  {
    name: "Overview",
    link: "/",
  },
  {
    name: "Characters",
    link: "character",
  },
  {
    name: "Seasons",
    link: "season",
  },
  {
    name: "Reviews",
    link: "review",
  },
  {
    name: "Recommendations",
    link: "recommendations",
  },
  {
    name: "Media",
    link: "media",
  },
]

export default async function layout({
  params,
  children,
}: {
  params: { tvID: number }
  children: ReactElement
}) {
  const tvID = params.tvID
  try {
    const tvInfo = await fetchFromTMDB(configTMDB.getSingleTv({ tvID }))
    const imdbId = tvInfo.external_ids.imdb_id

    if (!imdbId) {
      throw new Error("IMDB ID not found")
    }

    const imdbResponse = await fetch(configOMDB.getOmdbData(imdbId))
    if (!imdbResponse.ok) {
      throw new Error(`OMDB API error: ${imdbResponse.statusText}`)
    }

    const imdbData = await imdbResponse.json()
    if (!tvInfo) {
      throw new Error("No data received")
    }

    return (
      <section>
        <ContentDetails
          backdropPoster={`https://image.tmdb.org/t/p/w1280${tvInfo.backdrop_path}`}
          poster={`https://image.tmdb.org/t/p/w500${tvInfo.poster_path}`}
          title={tvInfo.name}
          date={tvInfo.first_air_date}
          genres={tvInfo.genres.map((genres: { name: string }) => genres.name)}
          rating={tvInfo.vote_average}
          voteCount={tvInfo.vote_count}
          overview={tvInfo.overview}
          production={tvInfo.production_companies.map(
            (prod: { name: string }) => prod.name
          )}
          imdbData={imdbData}
        />

        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
          }}
          className=""
        >
          <div className="mx-auto flex max-w-[1600px] gap-4 p-10">
            <ContentSidebar
              rating={tvInfo.vote_average}
              imdbRatings={imdbData}
              voteCount={tvInfo.vote_count}
              popularity={tvInfo.popularity}
              type={tvInfo.type}
              numberOfSeasons={tvInfo.number_of_seasons}
              numberOfEpisodes={tvInfo.number_of_episodes}
              language={tvInfo.original_language}
              network={tvInfo.networks}
              externalIds={tvInfo.external_ids}
              watchProvider={tvInfo["watch/providers"].results}
            />
            <div className="flex w-full max-w-[1290px] flex-col gap-4">
              <div className="">
                <NavLinks id={tvID} links={links} />
              </div>
              <div className="rounded-lg bg-white p-4 shadow-md">
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
