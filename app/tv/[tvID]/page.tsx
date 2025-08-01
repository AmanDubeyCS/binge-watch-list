import { configTMDB } from "@/apiConfig"
import { Icon } from "@/components/icons"
import { Show } from "@/types/tv/singleTvType"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { ImageLoader } from "@/util/ImageLoader"
import React from "react"

export default async function SingleTvPage({
  params,
}: {
  params: { tvID: number }
}) {
  const tvID = params.tvID
  const tvInfo: Show = await fetchFromTMDB(configTMDB.getSingleTv({ tvID }))
  if (!tvInfo) {
    return <div>loading</div>
  }
  return (
    <div className="min-h-screen pb-10">
      <div className="mx-auto">
        <div className="space-y-8 px-2">
          {tvInfo.last_episode_to_air && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Last Episode</h2>
              <div className="flex w-full items-center rounded-lg bg-white shadow-md">
                <div className="h-full w-[150px] p-2 sm:w-[200px] shrink-0">
                  <ImageLoader
                    src={`https://image.tmdb.org/t/p/w500${tvInfo.last_episode_to_air.still_path}`}
                    alt="Last Episode Still"
                    fallback={
                      <div className="flex items-center justify-center bg-[rgba(181,181,181,0.3)] xs:w-full">
                        <Icon.noPreview />
                      </div>
                    }
                    className="size-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 justify-center p-2">
                  <h3 className="font-bold sm:text-lg">
                    {tvInfo.last_episode_to_air.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">
                      S{tvInfo.last_episode_to_air.season_number} E{tvInfo.last_episode_to_air.episode_number}
                    </p>
                    <span className="size-1 rounded-full bg-gray-600"></span>
                    <p className="flex items-center text-sm text-gray-600">
                      {new Date(tvInfo.last_episode_to_air.air_date).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <span className="size-1 rounded-full bg-gray-600"></span>
                    <p className="text-sm text-gray-600">
                      {tvInfo.last_episode_to_air.runtime}m
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{tvInfo.last_episode_to_air.overview}</p>
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Seasons</h2>
            <div className="grid grid-cols-3 gap-1 lg:grid-cols-5 lg:gap-4 xl:grid-cols-7">
              {tvInfo.seasons.map((season) => {
                if (season.episode_count !== 0) {
                  return (
                    <div key={season.id} className="rounded-l">
                      <ImageLoader
                        src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                        alt={`Season ${season.name} Poster`}
                        fallback={
                          <div className="flex h-auto w-full items-center justify-center bg-[rgba(181,181,181,0.3)]">
                            <Icon.noPreview />
                          </div>
                        }
                        className="h-auto w-full"
                      />
                      <div className="py-2">
                        <div className="flex justify-between gap-4">
                          <h3 className="text-sm font-semibold">
                            {season.name}
                          </h3>
                          {/* <p> {season.vote_average}/10</p> */}
                        </div>
                        <div className="flex justify-between gap-2 text-sm font-semibold text-gray-500">
                          {/* <p className="text-gray-600">{season.air_date}</p> */}
                          <p> {season.episode_count} Episodes</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">
              Additional Information
            </h2>
            <div className="">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="font-semibold">Status</p>
                  <p>{tvInfo.status}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Original Language</p>
                  <p>{tvInfo.original_language}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">First Air Date</p>
                  <p>{tvInfo.first_air_date}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Last Air Date</p>
                  <p>{tvInfo.last_air_date || "N/A"}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Number of Seasons</p>
                  <p>{tvInfo.number_of_seasons}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold">Networks</p>{" "}
                  <div className="line-clamp-1 flex">
                    {tvInfo.networks.map((network) => (
                      <p key={network.id}>{network.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
