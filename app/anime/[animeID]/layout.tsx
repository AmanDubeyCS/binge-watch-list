import { config, configTMDB } from "@/apiConfig"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import { ScrollToTop } from "@/components/ScorllTop"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { getIMDBData } from "@/util/fetchIMDBdata"
import React, { ReactElement } from "react"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { animeID: number }
}): Promise<Metadata> {
  try {
    const { animeID } = params
    const animeData = await fetchFromJikan(config.getSingleAnime(animeID), 0)

    if (!animeData?.data) {
      return {
        title: "Anime Not Found",
        description: "The anime details could not be retrieved.",
      }
    }

    const animeInfo = animeData.data

    return {
      title: `${animeInfo.title_english || animeInfo.title} (${animeInfo.year})`,
      description: animeInfo.synopsis,
      openGraph: {
        title: `${animeInfo.title_english || animeInfo.title} (${animeInfo.year})`,
        description: animeInfo.synopsis,
        images: [
          {
            url: animeInfo.images.webp.large_image_url,
            width: 800,
            height: 1200,
            alt: `${animeInfo.title} Poster`,
          },
        ],
        type: "video.tv_show",
      },
      twitter: {
        card: "summary_large_image",
        title: `${animeInfo.title_english || animeInfo.title} (${animeInfo.year})`,
        description: animeInfo.synopsis,
        images: [animeInfo.images.webp.large_image_url],
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

function extractAnimeName(animeName: string, type: string) {
  if (type === "Movie") {
    return animeName
  } else {
    return animeName
      .replace(/ -Season\s*\d+/i, "")
      .replace(/\s*Season\s*\d+/i, "")
      .replace(/-.*/, "")
      .trim()
  }
}

async function dataTMDB(name: string, type: string) {
  if (type === "Movie") {
    const tmdbData = await fetchFromTMDB(configTMDB.searchMovie(name))
    if (tmdbData?.results[0]?.id) {
      const animeInfoTMDB = await fetchFromTMDB(
        configTMDB.getSingleMovie({ movieID: tmdbData.results[0].id })
      )
      return animeInfoTMDB
    }
  } else {
    const tmdbData = await fetchFromTMDB(configTMDB.searchTvShow(name))
    if (tmdbData?.results[0]?.id) {
      const animeInfoTMDB = await fetchFromTMDB(
        configTMDB.getSingleTv({ tvID: tmdbData.results[0].id })
      )
      return animeInfoTMDB
    }
  }

  return null
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
    name: "Episodes",
    link: "episodes",
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
  params: { animeID: number }
  children: ReactElement
}) {
  const animeID = params.animeID
  const animeData = await fetchFromJikan(config.getSingleAnime(animeID), 0)

  const cleanNames = extractAnimeName(
    animeData?.data.title_english || animeData?.data.title,
    animeData?.data.type
  )

  let animeDataFromTMDB = null
  let imdbResponse = null

  if (cleanNames) {
    animeDataFromTMDB = await dataTMDB(cleanNames, animeData?.data.type)
    const imdbId = animeDataFromTMDB?.external_ids?.imdb_id

    if (imdbId) {
      imdbResponse = await getIMDBData(imdbId, animeDataFromTMDB.first_air_date)
    }
  }

  const animeInfo = animeData.data

  const navLinks = links.filter((t) => {
    if (animeData?.data.type === "Movie" && t.name === "Episodes") {
      return false
    }
    return true
  })

  return (
    <>
      <section>
        <ScrollToTop />
        <ContentDetails
          id={animeID}
          backdropPoster={
            `https://image.tmdb.org/t/p/w1280${animeDataFromTMDB?.backdrop_path}` ||
            animeInfo.images.webp.large_image_url
          }
          poster={animeInfo.images.webp.large_image_url}
          title={animeInfo.title_english || animeInfo.title}
          date={animeInfo.year}
          genres={animeInfo.genres.map(
            (genres: { name: string }) => genres.name
          )}
          rating={animeInfo.score}
          voteCount={animeInfo.scored_by}
          overview={animeInfo.synopsis}
          production={animeInfo.studios.map(
            (studio: { name: string }) => studio.name
          )}
          producer={animeInfo.producers.map(
            (prod: { name: string }) => prod.name
          )}
          imdbData={imdbResponse || null}
          type={animeInfo.type}
          episodes={animeInfo.episodes}
          imdbRating={
            imdbResponse?.imdbRating || imdbResponse?.ratings["imdb"]?.rating
          }
          imdbVotes={
            imdbResponse?.imdbVotes || imdbResponse?.ratings["imdb"]?.votes
          }
          contentType="anime"
          numbers={animeInfo.rank}
        />

        {animeInfo.trailer.embed_url && (
          <section className="mx-auto max-w-[1600px] p-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={animeInfo.trailer.embed_url}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video size-full rounded-lg"
              ></iframe>
            </div>
          </section>
        )}

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
                  id={animeID}
                  links={navLinks}
                  tmdbID={animeDataFromTMDB?.id}
                />
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
