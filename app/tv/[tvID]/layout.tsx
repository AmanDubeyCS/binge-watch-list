import { configTMDB } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import VideoList from "@/components/common/VideoList"
import { ScrollToTop } from "@/components/ScorllTop"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { getIMDBData } from "@/util/fetchIMDBdata"
import React, { ReactElement } from "react"
import { Metadata } from "next"
import { PageTracker } from "@/components/PageTracker"

export async function generateMetadata({
  params,
}: {
  params: { tvID: number }
}): Promise<Metadata> {
  try {
    const { tvID } = params
    const tvInfo = await fetchFromTMDB(configTMDB.getSingleTvProfile(tvID))

    if (!tvInfo) {
      return {
        title: "TV Show Not Found",
        description: "The TV show details could not be retrieved.",
      }
    }

    const keywords = tvInfo.keywords?.results?.map(
      (keyword: { name: string }) => keyword.name
    )

    return {
      title: `${tvInfo.name} (${new Date(tvInfo.first_air_date).getFullYear()})`,
      description: tvInfo.overview,
      keywords: keywords,
      openGraph: {
        title: `${tvInfo.name} (${new Date(tvInfo.first_air_date).getFullYear()})`,
        description: tvInfo.overview,
        images: [
          {
            url: `https://image.tmdb.org/t/p/w1280${tvInfo.backdrop_path}`,
            width: 1280,
            height: 720,
            alt: `${tvInfo.name} Backdrop`,
          },
        ],
        type: "video.tv_show",
      },
      twitter: {
        card: "summary_large_image",
        title: `${tvInfo.name} (${new Date(tvInfo.first_air_date).getFullYear()})`,
        description: tvInfo.overview,
        images: [`https://image.tmdb.org/t/p/w500${tvInfo.poster_path}`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": 200,
        },
      },
    }
  } catch (error) {
    return {
      title: "My Binge List",
      description: "My Binge List - Track, Discover, and Share Your Watchlists",
    }
  }
}

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
      <PageTracker title={`Tv Show ${tvInfo.name}  - Viewed`} />
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
          imdbResponse?.imdbRating || imdbResponse?.ratings?.["imdb"]?.rating || null
        }
        imdbVotes={
          imdbResponse?.imdbVotes || imdbResponse?.ratings?.["imdb"]?.votes || null
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
