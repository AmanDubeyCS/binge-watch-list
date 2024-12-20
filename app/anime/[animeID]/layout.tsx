import { config, configOMDB, configTMDB } from "@/apiConfig"
import SideBarDetails from "@/components/animePage/SideBarDetails"
import { ContentDetails } from "@/components/common/ContentDetails"
import NavLinks from "@/components/common/NavLinks"
import { fetchFromJikan } from "@/util/fetchFromJikan"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import React, { ReactElement } from "react"

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
  try {
    const animeID = params.animeID
    const animeData = await fetchFromJikan(config.getSingleAnime(animeID), 0)

    const cleanNames = extractAnimeName(
      animeData?.data.title_english || animeData?.data.title,
      animeData?.data.type
    )
    const imdbResponse = await fetch(configOMDB.getOmdbSearchData(cleanNames))
    if (!imdbResponse.ok) {
      throw new Error(`OMDB API error: ${imdbResponse.statusText}`)
    }

    const animeDataFromTMDB = await dataTMDB(cleanNames, animeData?.data.type)
    // console.log(animeDataFromTMDB)
    const imdbData = await imdbResponse.json()
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
          <ContentDetails
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
              <SideBarDetails animeInfo={animeInfo} imdbData={imdbData} />
              <div className="flex w-full max-w-[1290px] flex-col gap-4">
                <div className="">
                  <NavLinks id={animeID} links={navLinks} />
                </div>
                <div className="rounded-lg bg-white p-4 shadow-md">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  } catch (error) {
    console.error("Error fetching movies data:", error)
    return <div>Error: Failed to fetch movies data.</div>
  }
}
