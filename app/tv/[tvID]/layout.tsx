import { configTMDB } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import VideoList from "@/components/common/VideoList"
import { ScrollToTop } from "@/components/ScorllTop"
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
  const tvInfo = await fetchFromTMDB(configTMDB.getSingleTv({ tvID }))
  const response = await fetchFromTMDB(configTMDB.getTvVideos(tvID))

  const imdbId = tvInfo.external_ids?.imdb_id || null
  let imdbResponse = null

  if (imdbId) {
    imdbResponse = await getIMDBData(imdbId, tvInfo.first_air_date)
  }

  return (
    <section>
      <ScrollToTop />
      <ContentDetails
        id={tvID}
        backdropPoster={`https://image.tmdb.org/t/p/w1280${tvInfo.backdrop_path}`}
        poster={`https://image.tmdb.org/t/p/w300${tvInfo.poster_path}`}
        title={tvInfo.name}
        date={tvInfo.first_air_date}
        genres={tvInfo.genres.map((genres: { name: string }) => genres.name)}
        rating={tvInfo.vote_average}
        voteCount={tvInfo.vote_count}
        overview={tvInfo.overview}
        production={tvInfo.production_companies.map(
          (prod: { name: string }) => prod.name
        )}
        imdbData={imdbResponse}
        type={tvInfo.type}
        seasons={tvInfo.number_of_seasons}
        episodes={tvInfo.number_of_episodes}
        watchProvider={tvInfo["watch/providers"].results}
        imdbRating={
          imdbResponse?.imdbRating || imdbResponse?.ratings["imdb"]?.rating
        }
        imdbVotes={
          imdbResponse?.imdbVotes || imdbResponse?.ratings["imdb"]?.votes
        }
        contentType="tv"
        numbers={tvInfo.popularity}
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
              <NavLinks id={tvID} links={links} />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
