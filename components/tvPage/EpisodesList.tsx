import { useSeasonEpisodes } from "@/queries/TMDB/TV/tvFetch"
import { Calendar, Star } from "lucide-react"
import React from "react"

export function EpisodesList({
  seriesId,
  seasonId,
}: {
  seriesId: number
  seasonId: number
}) {
  const { data } = useSeasonEpisodes(seriesId, seasonId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {data?.episodes?.map((episode: any) => (
          <div
            key={episode.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="flex items-start p-4">
              <img
                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                alt={`${episode.name}`}
                className="h-18 mr-4 w-48 shrink-0 rounded-md object-cover"
              />
              <div className="grow">
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="text-xl font-semibold">
                    {episode.episode_number}. {episode.name}
                  </h2>
                  <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
                    {episode.runtime} min
                  </span>
                </div>
                <p className="mb-2 flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 size-4" />
                  {new Date(episode.air_date).toLocaleDateString()}
                </p>
                <div className="mb-2 flex items-center">
                  <Star className="mr-1 size-5 text-yellow-400" />
                  <span className="font-semibold">
                    {episode.vote_average.toFixed(1)}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    ({episode.vote_count} votes)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
