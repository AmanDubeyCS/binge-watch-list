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
    name: "Collection",
    link: "collection",
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

export default async function Layout({
  params,
  children,
}: {
  params: { movieID: number; segment?: string }
  children: ReactElement
}) {
  const { movieID } = params
  try {
    const movieInfo = await fetchFromTMDB(
      configTMDB.getSingleMovie({ movieID })
    )
    const imdbId = movieInfo.external_ids.imdb_id

    if (!imdbId) {
      throw new Error("IMDB ID not found")
    }

    const imdbResponse = await fetch(configOMDB.getOmdbData(imdbId))
    if (!imdbResponse.ok) {
      throw new Error(`OMDB API error: ${imdbResponse.statusText}`)
    }

    const imdbData = await imdbResponse.json()
    if (!movieInfo) {
      throw new Error("No data received")
    }

    const navLinks = links.filter((t) => {
      if (!movieInfo.belongs_to_collection && t.name === "Collection") {
        return false
      }
      return true
    })
    return (
      <section>
        <ContentDetails
          backdropPoster={`https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path}`}
          poster={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
          title={movieInfo.title}
          date={movieInfo.release_date}
          genres={movieInfo.genres.map(
            (genres: { name: string }) => genres.name
          )}
          rating={movieInfo.vote_average}
          voteCount={movieInfo.vote_count}
          overview={movieInfo.overview}
          production={movieInfo.production_companies.map(
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
              rating={movieInfo.vote_average}
              imdbRatings={imdbData}
              voteCount={movieInfo.vote_count}
              popularity={movieInfo.popularity}
              type={movieInfo.status}
              budget={movieInfo.budget}
              revenue={movieInfo.revenue}
              runTime={movieInfo.runtime}
              language={movieInfo.original_language}
              externalIds={movieInfo.external_ids}
              watchProvider={movieInfo["watch/providers"].results}
            />
            <div className="flex w-full max-w-[1290px] flex-col gap-4">
              <div className="">
                <NavLinks
                  id={movieID}
                  links={navLinks}
                  collectionId={
                    movieInfo.belongs_to_collection
                      ? movieInfo.belongs_to_collection.id
                      : ""
                  }
                />
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
