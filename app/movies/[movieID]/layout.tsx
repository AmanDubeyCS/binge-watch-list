import { configTMDB } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import VideoList from "@/components/common/VideoList"

import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { getIMDBData } from "@/util/fetchIMDBdata"
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
  const movieInfo = await fetchFromTMDB(configTMDB.getSingleMovie({ movieID }))
  const response = await fetchFromTMDB(configTMDB.getMovieVideos(movieID))
  const imdbId = movieInfo.external_ids?.imdb_id || null
  let imdbResponse = null

  if (imdbId) {
    imdbResponse = await getIMDBData(imdbId, movieInfo.release_date)
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
        id={movieID}
        backdropPoster={`https://image.tmdb.org/t/p/w1280${movieInfo.backdrop_path}`}
        poster={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
        title={movieInfo.title}
        date={movieInfo.release_date}
        genres={movieInfo.genres.map((genres: { name: string }) => genres.name)}
        rating={movieInfo.vote_average}
        voteCount={movieInfo.vote_count}
        overview={movieInfo.overview}
        production={movieInfo.production_companies.map(
          (prod: { name: string }) => prod.name
        )}
        imdbData={imdbResponse}
        type={movieInfo.status}
        runTime={movieInfo.runtime}
        budget={movieInfo.budget}
        revenue={movieInfo.revenue}
        watchProvider={movieInfo["watch/providers"].results}
        imdbRating={
          imdbResponse?.imdbRating || imdbResponse?.ratings["imdb"]?.rating
        }
        imdbVotes={
          imdbResponse?.imdbVotes || imdbResponse?.ratings["imdb"]?.votes
        }
        contentType="movie"
        numbers={movieInfo.popularity}
      />

      <div className="mx-auto max-w-[1600px]">
        <VideoList videos={response.results} />
      </div>

      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.9) 100%)",
        }}
        className="pb-14"
      >
        <div className="mx-auto flex max-w-[1600px] gap-4 lg:p-10">
          <div className="flex w-full flex-col gap-4">
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
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
