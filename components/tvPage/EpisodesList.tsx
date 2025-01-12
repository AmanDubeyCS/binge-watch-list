import { useSeasonEpisodes } from "@/queries/TMDB/TV/tvFetch"
import { Calendar, Star } from "lucide-react"
import React from "react"

interface Episode {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: CrewMember[]
  guest_stars: GuestStar[]
}

interface CrewMember {
  job: string
  department: string
  credit_id: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

interface GuestStar {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

export function EpisodesList({
  seriesId,
  seasonId,
}: {
  seriesId: number
  seasonId: number
}) {
  const { data } = useSeasonEpisodes(seriesId, seasonId)

  return (
    <div className="px-4 py-8">
      <div className="space-y-6">
        {data?.episodes?.map((episode: Episode) => (
          <div
            key={episode.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <div className="flex items-start md:p-4">
              <img
                src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                alt={`${episode.name}`}
                className="md:h-18 mr-4 h-full w-48 shrink-0 rounded-md object-cover"
              />
              <div className="grow">
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="line-clamp-2 text-xl font-semibold">
                    {episode.name}
                  </h2>
                  <span className="hidden rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700 md:flex">
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
