import { useTvRecommendations } from "@/queries/TMDB/TV/tvFetch"
import { Calendar, Star } from "lucide-react"
import React from "react"

interface Show {
  id: number
  name: string
  overview: string
  poster_path: string
  vote_average: number
  vote_count: number
  first_air_date: string
  genre_ids: number[]
}

const genreMap: { [key: number]: string } = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
}

export function Recommendations({ seriesId }: { seriesId: number }) {
  const { data } = useTvRecommendations(seriesId)
  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="flex flex-wrap justify-center gap-6">
        {data?.results?.map((show: Show) => (
          <div
            key={show.id}
            className="w-[260px] overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={`${show.name} Poster`}
              className="h-64 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 flex h-[56px] items-center text-xl font-semibold">
                {show.name}
              </h2>
              <p className="mb-2 line-clamp-3 text-sm text-gray-600">
                {show.overview}
              </p>
              <div className="mb-2 flex items-center">
                <Star className="mr-1 size-5 text-yellow-400" />
                <span className="font-semibold">
                  {show.vote_average.toFixed(1)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({show.vote_count} votes)
                  </span>
                </span>
              </div>
              <div className="mb-2 flex items-center">
                <Calendar className="mr-1 size-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {show.first_air_date}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {show.genre_ids.slice(0, 3).map((genreId) => (
                  <span
                    key={genreId}
                    className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700"
                  >
                    {genreMap[genreId] || "Unknown"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
