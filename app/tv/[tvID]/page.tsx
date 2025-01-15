import { configTMDB } from "@/apiConfig"
import { Show } from "@/types/tv/singleTvType"
import { fetchFromTMDB } from "@/util/fetchFromTMDB"
import { Calendar, Clock, Star } from "lucide-react"
import Image from "next/image"
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
              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md xs:flex-row">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${tvInfo.last_episode_to_air.still_path}`}
                  alt="Last Episode Still"
                  width={500}
                  height={281}
                  className="h-auto object-cover xs:w-[150px]"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {tvInfo.last_episode_to_air.name}
                  </h3>
                  <p className="text-gray-600">
                    Season {tvInfo.last_episode_to_air.season_number}, Episode{" "}
                    {tvInfo.last_episode_to_air.episode_number} (
                    {tvInfo.last_episode_to_air.episode_type})
                  </p>
                  <p className="my-2 hidden md:flex">
                    {tvInfo.last_episode_to_air.overview}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="size-4" />
                    <span>Aired: {tvInfo.last_episode_to_air.air_date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="size-4" />
                    <span>
                      Runtime: {tvInfo.last_episode_to_air.runtime} minutes
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="size-4 text-yellow-400" />
                    <span>
                      Rating: {tvInfo.last_episode_to_air.vote_average}/10
                    </span>
                  </div>
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
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                        alt={`Season ${season.name} Poster`}
                        width={300}
                        height={450}
                        className="h-auto w-full rounded-lg"
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
