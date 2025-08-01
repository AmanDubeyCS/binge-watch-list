import { configTMDB } from "@/apiConfig"
import { cn } from "@/lib/utils"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import Link from "next/link"
import React, { ReactElement } from "react"

export default async function layout({
  params,
  children,
}: {
  params: { contentID: number; seasonID: number; episodeID: number }
  children: ReactElement
}) {
  const { contentID, seasonID, episodeID } = params
  const contentData = await fetchFromTMDB(
    configTMDB.getSingleTv({ tvID: contentID })
  )

  if (!contentData) {
    return <div>loading</div>
  }
  const seasons = contentData.seasons

  const data = await fetchFromTMDB(
    configTMDB.getSeasonEpisodes(contentID, seasonID)
  )

  if (!data) {
    return <p>Loading</p>
  }

  const episodeData = data?.episodes?.filter(
    (data: { episode_number: number }) => data.episode_number == episodeID
  )

  return (
    <div className="mx-auto max-w-[1400px] pb-6">
      <div>{children}</div>
      <div className="flex flex-col gap-2 p-4">
        <p className="text-xl font-bold">{episodeData[0].name}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">
            S{seasonID} E{episodeData[0].episode_number}
          </p>
          <span className="size-1 rounded-full bg-gray-600"></span>
          <p className="flex items-center text-sm text-gray-600">
            {new Date(episodeData[0].air_date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <span className="size-1 rounded-full bg-gray-600"></span>
          <p className="text-sm text-gray-600">{episodeData[0].runtime}m</p>
        </div>
        <p className="line-clamp-3 text-base font-normal text-gray-600">
          {episodeData[0].overview}
        </p>
      </div>

      <div className="flex gap-4 border-b-2 border-gray-400 px-2">
        {seasons.map((season: any) => {
          if (season.season_number === 0) return null
          return (
            <div
              key={season.season_number}
              className={cn(
                "py-2 font-semibold",
                season.season_number == seasonID && "border-b-2 border-black"
              )}
            >
              <Link href={`/watch/tv/${contentID}/${season.season_number}/1`}>
                Season {season.season_number}
              </Link>
            </div>
          )
        })}
      </div>
      <div className="p-2">
        {data?.episodes?.map((episode: any) => (
          <Link
            href={`/watch/tv/${contentID}/${seasonID}/${episode.episode_number}`}
            key={episode.id}
            className={cn(
              "mb-4 block overflow-hidden",
              episode.episode_number == episodeID &&
                "rounded-md border bg-gray-300 p-2"
            )}
          >
            <div className="flex items-center">
              <img
                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                alt={`${episode.name}`}
                className="md:h-18 mr-4 h-full w-32 shrink-0 rounded-md object-cover md:w-48"
              />
              <div className="grow">
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="line-clamp-2 text-sm font-semibold sm:text-xl">
                    {episode.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600">
                    S{seasonID} E{episode.episode_number}
                  </p>
                  <span className="size-1 rounded-full bg-gray-600"></span>
                  <p className="flex items-center text-sm text-gray-600">
                    {new Date(episode.air_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <span className="size-1 rounded-full bg-gray-600"></span>
                  <p className="text-sm text-gray-600">{episode.runtime}m</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
